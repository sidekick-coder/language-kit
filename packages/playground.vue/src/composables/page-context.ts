import { inject, provide, reactive, ref } from 'vue'

export function createContext() {
    const variables = ref<any>({})
    const methods = ref<any>({})

    function setVariables(payload: Record<string, unknown>) {
        variables.value = payload
    }

    function setMethods(payload: Record<string, Function>) {
        methods.value = payload
    }

    function emit(event: string, ...args: unknown[]) {
        if (!methods.value[event]) {
            console.error(`Event ${event} is not defined`)
            return
        }

        methods.value[event](...args)
    }

    function get(key: string) {
        if (!variables.value[key]) {
            return undefined
        }

        return variables.value[key]()
    }

    return reactive({
        emit,
        get,
        methods,
        variables,
        setVariables,
        setMethods,
    })
}

export function providePageContext() {
    const context = createContext()

    provide('page-context', context)

    return context
}

export function usePageContext() {
    const context = inject('page-context')

    if (!context) throw new Error('Page context is not provided')

    return context as ReturnType<typeof createContext>
}
