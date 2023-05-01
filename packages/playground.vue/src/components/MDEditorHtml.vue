<script setup lang="ts">
import { usePageContext } from '@/composables/page-context'
import { onClickOutside } from '@vueuse/core'
import { debounce } from 'lodash'
import { computed, ref, watch } from 'vue'

// content

const context = usePageContext()

const modelValue = defineProp<string>('modelValue')
const modifiers = defineProp<any>('modelModifiers', {
    default: () => ({}),
})
const updateValue = defineEmit('update:modelValue')

const el = ref<HTMLElement>()
const textUseVariable = computed(() => modelValue.value.includes('{{'))
const innerModel = ref('')

function onInput() {
    if (modifiers.value.lazy) return

    const text = el.value?.innerHTML || ''

    updateValue(text)
}

function onChange() {
    if (!modifiers.value.lazy) return

    const text = el.value?.innerHTML || ''

    updateValue(text)
}

function onClick() {
    if (!textUseVariable.value) {
        return
    }

    alert('You can not edit this text because it contains a variable.')
}

function setInnerModel() {
    let text = modelValue.value

    Object.keys(context.variables).forEach((key) => {
        text = text.replace(`{{ ${key} }}`, context.get(key))
    })

    if (text === innerModel.value) return

    if (text === el.value?.innerHTML) return

    innerModel.value = text
}

watch(modelValue, setInnerModel, {
    immediate: true,
})

// selection actions

const showToolbar = ref(false)
const toolbarRef = ref<HTMLElement>()
const position = ref({ x: 0, y: 0 })

const style = computed(() => ({
    top: `${position.value.y}px`,
    left: `${position.value.x}px`,
}))

const onMouseUp = debounce((event: MouseEvent) => {
    showToolbar.value = false

    const selection = window.getSelection()

    const text = selection?.toString()

    if (!selection || !text) return

    position.value.x = event.clientX
    position.value.y = event.clientY - 48 - 15

    showToolbar.value = true
}, 100)

function getSelectionElement() {
    const selection = window.getSelection()

    if (!selection) return

    const range = selection.getRangeAt(0)

    let element = range.startContainer.parentElement

    if (element?.classList.contains('editor-html-container')) {
        element = document.createElement('span')

        range.surroundContents(element)

        range.setStart(element.firstChild!, 0)
    }

    return element
}

function toggleBold() {
    const element = getSelectionElement()

    if (!element) return

    const isBold = element?.style.fontWeight === 'bold'

    if (isBold) {
        element?.style.removeProperty('font-weight')
    } else {
        element?.style.setProperty('font-weight', 'bold')
    }

    return onInput()
}

function toggleItalic() {
    const element = getSelectionElement()

    if (!element) return

    const isItalic = element?.style.fontStyle === 'italic'

    if (isItalic) {
        element?.style.removeProperty('font-style')
    } else {
        element?.style.setProperty('font-style', 'italic')
    }

    return onInput()
}

function setColor(color?: string) {
    const element = getSelectionElement()

    if (!element) return

    if (!color) {
        element.style.removeProperty('color')

        return onInput()
    }

    element.style.color = color

    return onInput()
}

onClickOutside(el, () => (showToolbar.value = false), {
    ignore: [toolbarRef],
})

// focus

const isFocus = ref(false)

watch(isFocus, (value) => {
    if (!value) {
        onChange()
    }
})
</script>
<template>
    <div
        ref="el"
        class="w-full focus:outline-none editor-html-container"
        :contenteditable="!textUseVariable"
        @input="onInput"
        @change="onChange"
        @click="onClick"
        @mouseup="onMouseUp"
        @keydown.enter.prevent="onChange"
        @focus="isFocus = true"
        @blur="isFocus = false"
        v-html="innerModel"
    />

    <div
        v-if="showToolbar && !textUseVariable"
        ref="toolbarRef"
        class="fixed bg-white text-black p-2 rounded flex items-center text-sm"
        :style="style"
    >
        <v-btn class="bg-gray-600 mr-2 text-white px-2" @click="toggleBold"> Bold </v-btn>
        <v-btn class="bg-gray-600 text-white px-2" @click="toggleItalic"> Italic </v-btn>

        <button
            v-for="color in ['red', 'green', 'blue']"
            :key="color"
            class="w-6 h-6 ml-2 rounded-full cursor-pointer"
            :style="`background-color: ${color};`"
            @click="setColor(color)"
        />
    </div>
</template>
