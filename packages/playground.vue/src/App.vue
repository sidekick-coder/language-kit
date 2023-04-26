<script setup lang="ts">
import { watch } from 'vue'

// Components
import EditorText from './components/EditorText.vue'
import MDEditor from './components/MDEditor.vue'

import { provideEditor } from './composables/editor'
import { useLocalStorage } from '@vueuse/core'
import { useSampleFiles } from './composables/samples'

const editor = provideEditor()

const options = useSampleFiles()

const selected = useLocalStorage('selected', options[0].name)

watch(
    selected,
    (value) => {
        const file = options.find((o) => o.name === value)

        if (file) {
            editor.updateFromText(file.content)
        }
    },
    { immediate: true }
)
</script>
<template>
    <div class="h-screen w-screen flex overflow-hidden">
        <div class="w-6/12 bg-gray-800 text-white">
            <div class="text-2xl font-bold px-8 py-4 flex bg-gray-900">
                Text <small class="text-xs mt-2 ml-4">(ctrl + enter to render)</small>

                <select v-model="selected" class="ml-auto text-gray-500 text-xs">
                    <option v-for="option in options" :key="option.name" :value="option.name">
                        {{ option.name }}
                    </option>
                </select>
            </div>

            <div class="h-[calc(100%_-_64px)]">
                <EditorText />
            </div>
        </div>

        <div class="w-6/12 bg-gray-800 text-white border-l">
            <div class="text-2xl font-bold px-8 py-4 bg-gray-900">Vue components</div>

            <div class="h-[calc(100%_-_64px)]">
                <MDEditor />
            </div>
        </div>
    </div>
</template>
