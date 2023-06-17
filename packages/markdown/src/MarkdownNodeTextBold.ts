import { MarkdownNode, MarkdownNodeNodeType } from './MarkdownNode'
import { MarkdownNodeArray } from './MarkdownNodeArray'

export class MarkdownNodeTextBold extends MarkdownNode {
    public readonly type = MarkdownNodeNodeType.TextBold
    public body = ''
    public children = new MarkdownNodeArray()

    /**
     * Override setPositions method to set positions for children nodes with correct offset
     * @param offset
     * @returns this
     */
    public setPositions(offset?: number): this {
        super.setPositions(offset)

        // +2 for open ** or __
        this.children.setPositions(this.start + 2)

        return this
    }

    public toHtml() {
        let childrenHTML = this.children.map((node) => node.toHtml()).join('')

        if (!childrenHTML) {
            childrenHTML = this.body
        }

        return `<strong>${childrenHTML}</strong>`
    }
}
