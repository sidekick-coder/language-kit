<script setup lang="ts">
import { useEditor } from '@/composables/editor'
import { computed, ref } from 'vue'

const editor = useEditor()

const text = computed({
    get: () => editor.toText(),
    set: (value) => editor.updateFromText(value),
})

const textareRef = ref<HTMLTextAreaElement | null>(null)

function onEnter() {
    if (textareRef.value) {
        text.value = textareRef.value.value
    }
}

function onTab() {
    // add 4 spaces
    if (!textareRef.value) {
        return
    }

    const start = textareRef.value.selectionStart
    const end = textareRef.value.selectionEnd

    const value = textareRef.value.value

    textareRef.value.value = value.substring(0, start) + '    ' + value.substring(end)

    textareRef.value.selectionStart = start + 4

    textareRef.value.selectionEnd = start + 4
}
</script>
<template>
    <textarea
        ref="textareRef"
        v-model.lazy="text"
        class="w-full h-full p-4 bg-gray-950 text-white focus:outline-none"
        @keydown.ctrl.enter="onEnter"
        @keydown.prevent.tab="onTab"
    />
</template>
