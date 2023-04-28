<script setup lang="ts">
import type { Node } from '@language-kit/markdown'
import { MarkdownTokenType } from '@language-kit/markdown'
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
const el = ref<HTMLElement>()
const text = ref('')

function load() {
    const mdTokens = editor.parser.toMarkdownTokens(model.value.tokens)

    const content = mdTokens.map((token) => {
        if (token.type === MarkdownTokenType.BoldText) {
            return `<span style="font-weight: bold">${token.data.text}</span>`
        }

        if (token.type === MarkdownTokenType.ItalicText) {
            return `<span style="font-style: italic">${token.data.text}</span>`
        }

        if (token.type === MarkdownTokenType.ItalicAndBoldText) {
            return `<span style="font-weight: bold; font-style: italic">${token.data.text}</span>`
        }

        return token.value
    })

    text.value = content.join('')
}

function update(htmlText: string) {
    let content = htmlText

    content = content.replace(/&nbsp;/g, ' ')

    // replace all <span> element in strings an transform style to markdown bold/italic

    content = content.replace(/<span(.*?)>(.*?)<\/span>/g, (match, p1, p2) => {
        if (p1.includes('color')) {
            return match
        }

        if (p1.includes('font-weight: bold') && p1.includes('font-style: italic')) {
            return `***${p2}***`
        }

        if (p1.includes('font-weight: bold')) {
            return `**${p2}**`
        }

        if (p1.includes('font-style: italic')) {
            return `*${p2}*`
        }

        return p2
    })

    const tokens = editor.toTokens(content.trim() + '\n')

    const last = model.value.tokens[model.value.tokens.length - 1]

    if (last.type === TokenType.EndOfFile) {
        tokens.push(last)
    }

    model.value.tokens = tokens
}

watch(model, load)

onMounted(load)
</script>
<template>
    <p>
        <MDEditorHtml :model-value="text" @update:model-value="update" />
    </p>
    <!-- <div class="h-full w-full relative">
        <div
            v-if="showActions"
            class="border p-2 text-xs rounded absolute top-0 left-0 bg-gray-500 mt-[-42px]"
        >
            <v-btn class="bg-gray-600" @click="toggleBold"> Bold </v-btn>
            <v-btn class="bg-gray-600" @click="toggleItalic"> Italic </v-btn>
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
    </div> -->
</template>
