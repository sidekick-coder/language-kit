<script setup lang="ts">
import type { Node } from '@language-kit/markdown'
import { TokenType } from '@language-kit/lexer'
import { computed, onMounted, ref, watch } from 'vue'

import { useEditor } from '@/composables/editor'

import MDEditorHtml from './MDEditorHtml.vue'

const modelValue = defineProp<Node>('modelValue', {
    required: true,
})

const updateModel = defineEmit('update:modelValue')

const model = computed({
    get: () => modelValue.value,
    set: (value) => updateModel(value),
})

// Text
const editor = useEditor()
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

function update(newText: string) {
    const level = model.value.tokens.findIndex((token) => token.value !== '#')

    let content = '#'.repeat(level) + ' '

    content += newText || ''

    const tokens = editor.toTokens(content.trim())

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
    <component :is="tag" class="w-full">
        <MDEditorHtml :model-value="text" @update:model-value="update" />
    </component>
</template>
