<script setup lang="ts">
import { useEditor } from '@/composables/editor'
import { computed } from 'vue'

const editor = useEditor()

const text = computed({
  get: () => editor.toText(),
  set: (value) => editor.updateFromText(value)
})
</script>
<template>
  <textarea class="w-full h-full p-4 bg-black text-white focus:outline-none" v-model="text" />
</template>
