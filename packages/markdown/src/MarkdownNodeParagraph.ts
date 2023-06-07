import { MarkdownNode, MarkdownNodeNodeType } from './MarkdownNode'
import { NodeArray } from '@language-kit/core'

export class MarkdownNodeParagraph extends MarkdownNode {
    public readonly type = MarkdownNodeNodeType.Paragraph
    public body = ''
    public children = new NodeArray<MarkdownNode>()

    public toHtml() {
        let childrenHTML = this.children.map((node) => node.toHtml()).join('')

        if (!childrenHTML) {
            childrenHTML = this.body
        }

        return `<p>${childrenHTML}</p>`
    }
}
