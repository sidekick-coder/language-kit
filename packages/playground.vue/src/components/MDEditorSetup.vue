<script setup lang="ts">
import { useHelper } from '@/composables/helpers'
import { usePageContext } from '@/composables/page-context'
import type { Node } from '@language-kit/markdown'

import { computed, onMounted, ref, watch } from 'vue'

import * as _VUE_ from 'vue'

const modelValue = defineProp<Node>('modelValue', {
    required: true,
})

const updateModel = defineEmit('update:modelValue')

const model = computed({
    get: () => modelValue.value,
    set: (value) => updateModel(value),
})

const helper = useHelper()
const pageContext = usePageContext()

let content = helper.findNodeComponentContent(model.value)
const methods = helper.findNodeComponentMethods(model.value)
const variables = helper.findNodeComponentVariables(model.value)

content += `\n\n return { ${[...methods, ...variables].join(', ')} }`
;(window as any)._VUE_ = _VUE_

content = content
    .replace(/import { (.*?) } from 'vue'/g, `const { $1 } = window._VUE_`)
    .replace(/import { (.*?) } from "vue"/g, `const { $1 } = window._VUE_`)

const componentRef = ref<any>(null)
const component = {
    name: 'MDEditorSetupContext',
    template: '<div class="hidden">setup</div>',
    setup: new Function('context', content),
}

function callMethod(name: string, ...args: any) {
    componentRef.value[name](...args)
}

function load() {
    const callMethods: any = {}
    const getVariables: any = {}

    methods.forEach((method) => {
        callMethods[method] = (...args: any) => callMethod(method, ...args)
    })

    variables.forEach((variable) => {
        getVariables[variable] = () => componentRef.value[variable]
    })

    pageContext.setMethods(callMethods)
    pageContext.setVariables(getVariables)
}

onMounted(load)

watch(model, load)
</script>
<template>
    <component :is="component" ref="componentRef" />
</template>
