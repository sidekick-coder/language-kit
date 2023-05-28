import { Token } from '@language-kit/lexer'

export enum NodeType {
    Paragraph = 'paragraph',
    Heading = 'heading',
    Component = 'component',
    Blockquote = 'blockquote',
    List = 'list',
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

    public isComponent(): this is NodeComponent {
        return this.type === NodeType.Component
    }
}

export class NodeComponent extends Node {
    public readonly type = NodeType.Component
    public name = ''
    public attrs: Record<string, string> = {}
    public props: Record<string, string> = {}
    public events: Record<string, string> = {}
    public body = ''

    constructor(data: Partial<NodeComponent> = {}) {
        super(data)

        this.name = data.name || ''
        this.body = data.body || ''
        this.attrs = data.attrs || {}
        this.props = data.props || {}
        this.events = data.events || {}
    }
}
