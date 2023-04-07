<script setup lang="ts">
import type { Node } from '@language-kit/markdown'
import { TokenType } from '@language-kit/lexer'
import { computed, onMounted, ref, watch } from 'vue'

import { useEditor } from '@/composables/editor'

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
const el = ref<HTMLElement>()
const text = ref('')

function load() {
    const content = model.value.tokens
        .map((token) => token.value)
        .join('')
        .split('\n')
        .map((line) => line.replace('>', '').trim())
        .join('\n')
        .trim()

    text.value = content

    if (el.value && content !== el.value.innerText) {
        el.value.innerText = content
    }
}

function update() {
    let content = el.value?.innerText || ''

    const lines: string[] = []

    content
        .trim()
        .split('\n')
        .forEach((line) => {
            lines.push(`> ${line.trim()}`)
        })

    const value = lines.join('\n') + '\n'

    const tokens = editor.toTokens(value)

    const last = model.value.tokens[model.value.tokens.length - 1]

    if (last.type === TokenType.EndOfFile) {
        tokens.push(last)
    }

    model.value.tokens = tokens
}

watch(model, load)

onMounted(load)

// level
</script>
<template>
    <blockquote
        ref="el"
        class="w-full focus:outline-none border-l-4 py-2 px-4 bg-gray-900/50 whitespace-pre-line"
        contenteditable
        @input="update"
    >
        {{ text }}
    </blockquote>
</template>
