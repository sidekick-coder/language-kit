<script setup lang="ts">
import type { Node } from '@language-kit/markdown'
import { Token, TokenType } from '@language-kit/lexer'
import { computed, onMounted, ref, watch } from 'vue'

import { useEditor } from '@/composables/editor'

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
const tag = ref('h1')
const text = ref('')

function load() {
  const level = model.value.tokens.findIndex((token) => token.value !== '#')

  const content = model.value.tokens
    .slice(level)
    .map((token) => token.value)
    .join('')

  tag.value = `h${level}`
  text.value = content
}

function update() {
  const level = model.value.tokens.findIndex((token) => token.value !== '#')

  let content = '#'.repeat(level) + ' '

  content += el.value?.innerText || ''

  const tokens = editor.toTokens(content)

  const last = model.value.tokens[model.value.tokens.length - 1]

  if (last.type === TokenType.BreakLine || last.type === TokenType.EndOfFile) {
    tokens.push(last)
  }

  model.value.tokens = tokens
}

watch(model, load)

onMounted(load)

// level
</script>
<template>
  <component
    :is="tag"
    ref="el"
    class="w-full focus:outline-none"
    contenteditable
    @input="update"
    @keydown.enter.prevent
  >
    {{ text }}
  </component>
</template>
