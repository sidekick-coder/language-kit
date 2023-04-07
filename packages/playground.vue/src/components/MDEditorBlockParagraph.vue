<script setup lang="ts">
import type { Node } from '@language-kit/markdown'
import { MarkdownTokenType } from '@language-kit/markdown'
import { TokenType } from '@language-kit/lexer'
import { computed, onMounted, ref, watch } from 'vue'
import { useEditor } from '@/composables/editor'
import debounce from 'lodash/debounce'
import { onClickOutside } from '@vueuse/core'

const modelValue = defineProp<Node>('modelValue', {
  required: true
})

const updateModel = defineEmit('update:modelValue')

const model = computed({
  get: () => modelValue.value,
  set: (value) => updateModel(value)
})

// Text
const editor = useEditor()
const el = ref<HTMLElement>()
const text = ref('')

function load() {
  const mdTokens = editor.parser.toMarkdownTokens(model.value.tokens)

  const content = mdTokens.map((token) => {
    if (token.type === MarkdownTokenType.BoldText) {
      console.log(token)
      return `<b>${token.data.text}</b>`
    }

    return token.value
  })

  text.value = content.join('')
}

function update() {
  if (!el.value) return

  let content = el.value?.innerHTML || ''

  content = content
    .replace(/<b>/g, '**')
    .replace(/&nbsp;<\/b>/g, '** ')
    .replace(/<\/b>/g, '**')

  const tokens = editor.toTokens(content)

  const last = model.value.tokens[model.value.tokens.length - 1]

  if (last.type === TokenType.BreakLine || last.type === TokenType.EndOfFile) {
    tokens.push(last)
  }

  model.value.tokens = tokens
}

watch(model, load)

onMounted(load)

// actions

const showActions = ref(false)

const onMouseUp = debounce(() => {
  showActions.value = false

  const selection = window.getSelection()

  const text = selection?.toString()

  if (!selection || !text) return

  showActions.value = true
}, 100)

function toggleBold() {
  const selection = window.getSelection()

  const text = selection?.toString()

  if (!selection || !text) return

  const range = selection.getRangeAt(0)

  const isBold = range.startContainer.parentElement?.tagName === 'B'

  if (isBold) {
    const bold = range.startContainer.parentElement

    bold.remove()

    range.deleteContents()
    range.insertNode(document.createTextNode(bold.innerText))
  }

  if (!isBold) {
    const bold = document.createElement('b')

    bold.innerHTML = text

    range.deleteContents()
    range.insertNode(bold)
  }

  update()
}

onClickOutside(el, () => {
  showActions.value = false
})
</script>
<template>
  <div class="h-full w-full relative">
    <div
      v-if="showActions"
      class="border p-2 text-xs rounded absolute top-0 left-0 bg-gray-500 mt-[-42px]"
    >
      <v-btn class="bg-gray-600" @click="toggleBold"> Bold </v-btn>
    </div>

    <p
      ref="el"
      class="w-full focus:outline-none"
      contenteditable
      @input="update"
      @keydown.enter.prevent
      @mouseup="onMouseUp"
      v-html="text"
    />
  </div>
</template>
