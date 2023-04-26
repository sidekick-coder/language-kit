<script setup lang="ts">
import { TokenType } from '@language-kit/lexer'
import type { Node } from '@language-kit/markdown'

import { useEditor } from '@/composables/editor'
import { computed, ref, watch } from 'vue'

import MDButton from './MDButton.vue'
import { useHelper } from '@/composables/helpers'

const modelValue = defineProp<Node>('modelValue', {
    required: true,
})

const updateModel = defineEmit('update:modelValue')

const model = computed({
    get: () => modelValue.value,
    set: (value) => updateModel(value),
})

const editor = useEditor()
const helper = useHelper()

const loading = ref(false)
const name = ref('')
const content = ref('')

function setName() {
    name.value = helper.findNodeComponentName(model.value)
}

function setContent() {
    content.value = helper.findNodeComponentContent(model.value)
}

function update() {
    const lines = [`:: ${name.value}`]

    content.value.split('\n').forEach((line) => {
        lines.push(`    ${line}`)
    })

    const value = lines.join('\n').trim() + '\n\n'

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

// component data

const componentData = ref({
    attrs: {},
    events: {},
})

function setComponentData() {
    componentData.value.attrs = helper.findNodeComponentProps(model.value)
    componentData.value.events = helper.findNodeComponentEvents(model.value)
}

watch(content, setComponentData, { immediate: true })

// edit mode

const edit = ref(false)
</script>
<template>
    <div class="border w-full my-2">
        <div class="p-2 border-b">
            <v-btn class="mr-2" @click="edit = false"> view </v-btn>
            <v-btn @click="edit = true"> edit </v-btn>
        </div>

        <template v-if="edit">
            <input
                v-model="name"
                class="bg-transparent w-full border-b text-white focus:outline-none py-2 px-4"
            />

            <textarea
                v-model="content"
                class="bg-transparent w-full text-white focus:outline-none py-2 px-4 h-[calc(100%_-_41px)]"
            />
        </template>

        <div v-else class="p-4">
            <MDButton v-if="name === 'button'" v-model="componentData" />

            <div v-else>No preview for {{ name }}</div>
        </div>
    </div>
</template>
