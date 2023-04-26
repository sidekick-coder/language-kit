<script setup lang="ts">
import { usePageContext } from '@/composables/page-context'
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: Object,
        required: true,
    },
})

const pageContext = usePageContext()

const innerLabel = computed(() => {
    if (props.modelValue.attrs.label) {
        return props.modelValue.attrs.label
    }

    return ''
})

const innerColor = computed(() => {
    if (props.modelValue.attrs.color) {
        return props.modelValue.attrs.color
    }

    return 'white'
})

const innerTextColor = computed(() => {
    if (props.modelValue.attrs.textColor) {
        return props.modelValue.attrs.textColor
    }

    return 'black'
})

const style = computed(() => {
    return {
        backgroundColor: innerColor.value,
        color: innerTextColor.value,
    }
})

function onClick() {
    const onclickFnName = props.modelValue.events.click

    if (!onclickFnName) {
        return
    }

    pageContext.emit(onclickFnName)
}
</script>
<template>
    <button :style="style" class="p-2 rounded" @click="onClick">
        {{ innerLabel }}
    </button>
</template>
