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
    let label = ''

    if (props.modelValue.attrs.label) {
        label = props.modelValue.attrs.label
    }

    if (label.includes('${')) {
        label = label.replace(/\${(.*?)}/g, (match, p1) => {
            return pageContext.get(p1)
        })
    }

    return label
        .replace(/^"(.*)"$/, '$1')
        .replace(/^'(.*)'$/, '$1')
        .replace(/^`(.*)`$/, '$1')
})

const innerColor = computed(() => {
    let color = 'white'
    if (props.modelValue.attrs.color) {
        color = props.modelValue.attrs.color
    }

    return color
        .replace(/^"(.*)"$/, '$1')
        .replace(/^'(.*)'$/, '$1')
        .replace(/^`(.*)`$/, '$1')
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

    if (!onclickFnName) return

    const fnArgs = onclickFnName.match(/\((.*?)\)/)?.[0] ?? ''
    const fnName = onclickFnName.replace(fnArgs, '')

    const args: string[] = []

    if (onclickFnName.includes('(')) {
        fnArgs
            .replace('(', '')
            .replace(')', '')
            .split(',')
            .forEach((arg: string) => {
                // replace quotes if it's a string
                if (arg.startsWith('"') && arg.endsWith('"')) {
                    return args.push(arg.replace(/"/g, ''))
                }

                return args.push(arg)
            })
    }

    pageContext.emit(fnName, ...args)
}
</script>
<template>
    <button :style="style" class="p-2 rounded" @click="onClick">
        {{ innerLabel }}
    </button>
</template>
