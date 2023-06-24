import { MarkdownNodeArray } from './MarkdownNodeArray'
import { MarkdownNode, MarkdownNodeType } from './MarkdownNode'

export class MarkdownNodeParagraph extends MarkdownNode {
    public readonly type = MarkdownNodeType.Paragraph
    public body = ''
    public children = new MarkdownNodeArray()

    public toHtml() {
        let childrenHTML = this.children.map((node) => node.toHtml()).join('')

        if (!childrenHTML) {
            childrenHTML = this.body
        }

        return `<p>${childrenHTML}</p>`
    }
}
