<script setup lang="ts">
import { useEditor } from '@/composables/editor'
import { computed } from 'vue'

import MDEditorBlock from './MDEditorBlock.vue'

const editor = useEditor()

const nodes = computed({
    get: () => editor.nodes,
    set: (value) => editor.updateFromNodes(value),
})
</script>
<template>
    <div class="w-full h-full p-4 bg-gray-950 text-white focus:outline-none overflow-auto">
        <MDEditorBlock v-for="(node, index) in nodes" :key="index" :model-value="node" />
    </div>
</template>
