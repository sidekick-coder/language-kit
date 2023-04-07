import type { Token } from '@language-kit/lexer'
import { Parser } from '@language-kit/markdown'
import type { Node } from '@language-kit/markdown'
import { inject, provide, reactive, ref } from 'vue'

interface Editor {
    nodes: Node[]
    parser: Parser
    toTokens(payload: string): Token[]
    toText(): string
    updateFromText(payload: string): void
    updateFromNodes(payload: Node[]): void
}

export function createEditor(): Editor {
    const nodes = ref<Node[]>([])
    const parser = new Parser()

    function toTokens(payload: string) {
        const tokens = parser.toTokens(payload)

        // remove eof
        tokens.pop()

        return tokens
    }

    function toText() {
        return nodes.value.map((n) => n.toText()).join('')
    }

    function updateFromText(payload: string) {
        nodes.value = parser.toNodes(payload)
    }

    function updateFromNodes(payload: Node[]) {
        nodes.value = payload
    }

    return reactive({
        nodes,
        parser,

        toText,
        toTokens,
        updateFromText,
        updateFromNodes,
    }) as Editor
}

export function useEditor() {
    return inject('editor', createEditor())
}

export function provideEditor() {
    const editor = createEditor()

    provide('editor', editor)

    return editor
}
