import { MarkdownNodeArray } from './MarkdownNodeArray'
import { MarkdownNode, MarkdownNodeNodeType } from './MarkdownNode'

export class MarkdownNodeParagraph extends MarkdownNode {
    public readonly type = MarkdownNodeNodeType.Paragraph
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
