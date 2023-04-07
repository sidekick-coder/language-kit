import { Token } from '@language-kit/lexer'

export enum NodeType {
    Paragraph = 'paragraph',
    Heading = 'heading',
    Component = 'component',
    Blockquote = 'blockquote',
}

export class Node {
    public type: NodeType
    public tokens: Token[] = []

    constructor(props: Partial<Node> = {}) {
        Object.assign(this, props)
    }

    public toText() {
        return this.tokens.map((t) => t.value).join('')
    }
}
