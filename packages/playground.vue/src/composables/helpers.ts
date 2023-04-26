import { TokenType } from '@language-kit/lexer'
import type { Node } from '@language-kit/markdown'

export function findNodeComponentName(node: Node) {
    const endIndex = node.tokens.findIndex((token) => token.type === TokenType.BreakLine)

    const nameTokens = node.tokens.slice(0, endIndex)

    return nameTokens
        .map((token) => token.value)
        .join('')
        .replace('::', '')
        .trim()
}

export function findNodeComponentProps(node: Node) {
    const endNameIndex = node.tokens.findIndex((token) => token.type === TokenType.BreakLine)
    const startContentIndex = endNameIndex + 1

    const contentTokens = node.tokens.slice(startContentIndex)

    const props: any = {}

    for (let i = 0; i < contentTokens.length; i++) {
        const prev = contentTokens[i - 1]
        const current = contentTokens[i]
        const next = contentTokens[i + 1]

        const isValid = [prev?.value === ':', prev?.value === '#']

        if (!isValid.includes(true)) continue
        if (next?.value !== '=') continue

        const tokens = contentTokens.slice(i + 2)
        const end = tokens.findIndex(
            (t) => t.type === TokenType.BreakLine || t.type === TokenType.EndOfFile
        )

        const value = tokens
            .slice(0, end)
            .map((t) => t.value)
            .join('')

        props[current.value] = value
    }

    return props
}

export function findNodeComponentEvents(node: Node) {
    const endNameIndex = node.tokens.findIndex((token) => token.type === TokenType.BreakLine)
    const startContentIndex = endNameIndex + 1

    const contentTokens = node.tokens.slice(startContentIndex)

    const props: any = {}

    for (let i = 0; i < contentTokens.length; i++) {
        const prev = contentTokens[i - 1]
        const current = contentTokens[i]
        const next = contentTokens[i + 1]

        const isValid = [prev?.value === '@', prev?.value === '#']

        if (!isValid.includes(true)) continue
        if (next?.value !== '=') continue

        const tokens = contentTokens.slice(i + 2)
        const end = tokens.findIndex(
            (t) => t.type === TokenType.BreakLine || t.type === TokenType.EndOfFile
        )

        const value = tokens
            .slice(0, end)
            .map((t) => t.value)
            .join('')
            .replace(/^"(.*)"$/, '$1')

        props[current.value] = value
    }

    return props
}

export function findNodeComponentMethods(node: Node) {
    const endNameIndex = node.tokens.findIndex((token) => token.type === TokenType.BreakLine)
    const startContentIndex = endNameIndex + 1

    const contentTokens = node.tokens.slice(startContentIndex)

    const methods: string[] = []

    for (let i = 0; i < contentTokens.length; i++) {
        const prev = contentTokens[i - 1]
        const next = contentTokens[i + 1]

        if (prev?.value !== 'function') continue

        methods.push(next?.value)
    }

    return methods
}

export function findNodeComponentVariables(node: Node) {
    const endNameIndex = node.tokens.findIndex((token) => token.type === TokenType.BreakLine)
    const startContentIndex = endNameIndex + 1

    const contentTokens = node.tokens.slice(startContentIndex)

    const result: string[] = []

    for (let i = 0; i < contentTokens.length; i++) {
        const prev = contentTokens[i - 1]
        const next = contentTokens[i + 1]

        const isValid = [prev?.value === 'let', prev?.value === 'const', prev?.value === 'var']

        if (!isValid.includes(true)) continue

        result.push(next?.value)
    }

    return result
}

export function findNodeComponentContent(node: Node) {
    const endNameIndex = node.tokens.findIndex((token) => token.type === TokenType.BreakLine)
    const startContentIndex = endNameIndex + 1

    const contentTokens = node.tokens.slice(startContentIndex)

    return contentTokens
        .map((token) => token.value)
        .join('')
        .split('\n')
        .map((line) => line.replace(/^ {4}/, '')) // remove 4 spaces
        .join('\n')
}

export function useHelper() {
    return {
        findNodeComponentName,
        findNodeComponentProps,
        findNodeComponentEvents,
        findNodeComponentContent,
        findNodeComponentMethods,
        findNodeComponentVariables,
    }
}
