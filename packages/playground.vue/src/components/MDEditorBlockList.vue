<script setup lang="ts">
import type { Node } from '@language-kit/markdown'
import { TokenType } from '@language-kit/lexer'
import { computed, onMounted, ref, watch } from 'vue'
import isEqual from 'lodash/isEqual'

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
interface Item {
    text: string
    level: number
}

const editor = useEditor()
const items = ref<Item[]>([])

function load() {
    const lines = []
    let current = 0

    for (const token of model.value.tokens) {
        if (token.type === TokenType.BreakLine) {
            current++
            continue
        }

        if (!lines[current]) {
            lines[current] = ''
        }

        lines[current] += token.value
    }

    const result = lines.map((line) => line.trim().replace(/^- /, ''))

    if (items.value.length) return

    items.value = result.map((item) => ({
        text: item,
        level: 1,
    }))
}

function update() {
    const content = items.value.map((item) => `- ${item.text}`).join('\n')

    const tokens = editor.toTokens(content)

    model.value.tokens = tokens
}

function updateItem(index: number, value: string) {
    // items.value[index] = value
    // update()

    console.log(index, value, items.value[index])
}

watch(model, load)

watch(items, update, {
    deep: true,
})

onMounted(load)

// level
</script>
<template>
    <ul class="w-full">
        <li v-for="(item, index) in items" :key="index" class="py-1 list-disc">
            <MDEditorHtml v-model="item.text" />
        </li>
    </ul>
</template>
