<script setup lang="ts">
import type { Node } from '@language-kit/markdown'
import { NodeType } from '@language-kit/markdown'
import { computed } from 'vue'

import MDEditorBlockHeading from './MDEditorBlockHeading.vue'
import MDEditorComponent from './MDEditorComponent.vue'
import MDEditorBlockParagraph from './MDEditorBlockParagraph.vue'
import MDEditorBlockQuote from './MDEditorBlockQuote.vue'
import { providePageContext } from '@/composables/page-context'

const modelValue = defineProp<Node>('modelValue', {
    required: true,
})

const updateModel = defineEmit('update:modelValue')

const model = computed({
    get: () => modelValue.value,
    set: (value) => updateModel(value),
})

const context = providePageContext()
</script>
<template>
    <div v-if="model" class="relative w-full flex items-center group first:pt-0">
        <v-btn class="mr-2 ml-0.5 opacity-0 group-hover:opacity-100">
            <i-drag size="20" />
        </v-btn>

        <MDEditorBlockHeading v-if="model.type === NodeType.Heading" v-model="model" />

        <MDEditorComponent v-else-if="model.type === NodeType.Component" v-model="model" />

        <MDEditorBlockParagraph v-else-if="model.type === NodeType.Paragraph" v-model="model" />

        <MDEditorBlockQuote v-else-if="model.type === NodeType.Blockquote" v-model="model" />

        <div v-else>Unknown block type: {{ model.type }}</div>
    </div>
</template>