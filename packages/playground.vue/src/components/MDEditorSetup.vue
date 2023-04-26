<script setup lang="ts">
import { useHelper } from '@/composables/helpers'
import { usePageContext } from '@/composables/page-context'
import type { Node } from '@language-kit/markdown'
import { computed, onMounted, ref, watch } from 'vue'

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

content += `\n\n return { ${methods.join(', ')} }`

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

    methods.forEach((method) => {
        callMethods[method] = (...args: any) => callMethod(method, ...args)
    })

    pageContext.setMethods(callMethods)
}

onMounted(load)

watch(model, load)
</script>
<template>
    <component :is="component" ref="componentRef" />
</template>
