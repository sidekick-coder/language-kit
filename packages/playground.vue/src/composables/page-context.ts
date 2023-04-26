import { inject, provide, reactive } from 'vue'

export function createContext() {
    const variables = reactive<any>({})
    const methods = reactive<any>({})

    function setVariables(payload: Record<string, unknown>) {
        Object.assign(variables, payload)
    }

    function setMethods(payload: Record<string, Function>) {
        Object.assign(methods, payload)
    }

    function emit(event: string, ...args: unknown[]) {
        if (!methods[event]) {
            throw new Error(`Event ${event} is not defined`)
        }

        methods[event](...args)
    }

    function get(key: string) {
        if (!variables[key]) {
            throw new Error(`Variable ${key} is not defined`)
        }

        return variables[key]
    }

    return {
        emit,
        get,
        setVariables,
        setMethods,
    }
}

export function providePageContext() {
    const context = createContext()

    provide('page-context', context)

    return context
}

export function usePageContext() {
    return inject('page-context') as ReturnType<typeof createContext>
}
