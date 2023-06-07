import { NodeArray } from '@language-kit/core'
import { MarkdownNode } from './MarkdownNode'

export class MarkdownNodeArray extends NodeArray<MarkdownNode> {
    public toHtml() {
        return this.map((node) => node.toHtml()).join('')
    }
}
