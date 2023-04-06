<script setup lang="ts">
import { TokenType } from '@language-kit/lexer'
import type { Node } from '@language-kit/markdown'

import { useEditor } from '@/composables/editor'
import { computed, ref, watch } from 'vue'

const modelValue = defineProp<Node>('modelValue', {
  required: true
})

const updateModel = defineEmit('update:modelValue')

const model = computed({
  get: () => modelValue.value,
  set: (value) => updateModel(value)
})

const editor = useEditor()

const loading = ref(false)
const name = ref('')
const content = ref('')

function setName() {
  const endIndex = model.value.tokens.findIndex((token) => token.type === TokenType.BreakLine)

  const nameTokens = model.value.tokens.slice(0, endIndex)

  name.value = nameTokens
    .map((token) => token.value)
    .join('')
    .replace('::', '')
    .trim()
}

function setContent() {
  const endNameIndex = model.value.tokens.findIndex((token) => token.type === TokenType.BreakLine)
  const startContentIndex = endNameIndex + 1

  const contentTokens = model.value.tokens.slice(startContentIndex)

  content.value = contentTokens
    .map((token) => token.value)
    .join('')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
}
function update() {
  const lines = [`:: ${name.value}`]

  content.value.split('\n').forEach((line) => {
    lines.push(`    ${line}`)
  })

  const value = lines.join('\n').trim() + '\n\n\n'

  const tokens = editor.toTokens(value)

  model.value.tokens = tokens
}

function load() {
  loading.value = true
  setName()
  setContent()
  loading.value = false
}

watch(model, load, { immediate: true })

watch(name, update)
watch(content, update)
</script>
<template>
  <div class="border w-full h-[400px] my-2">
    <input
      v-model="name"
      class="bg-transparent w-full border-b text-white focus:outline-none py-2 px-4"
    />

    <textarea
      v-model="content"
      class="bg-transparent w-full text-white focus:outline-none py-2 px-4 h-[calc(100%_-_41px)]"
    />
  </div>
</template>
