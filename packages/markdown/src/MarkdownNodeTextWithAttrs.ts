import { MarkdownNode, MarkdownNodeType } from './MarkdownNode'
import { MarkdownNodeArray } from './MarkdownNodeArray'

export class MarkdownNodeTextWithAttrs extends MarkdownNode {
    public readonly type = MarkdownNodeType.TextWithAttrs
    public body = ''
    public children = new MarkdownNodeArray()
    public attrs: Record<string, string> = {}

    /**
     * Override setPositions method to set positions for children nodes with correct offset
     * @param offset
     * @returns this
     */
    public setPositions(offset?: number): this {
        super.setPositions(offset)

        // +1 for open bracket
        this.children.setPositions(this.start + 1)

        return this
    }

    public toHtml() {
        let childrenHTML = this.children.map((child) => child.toHtml()).join('')

        if (!childrenHTML) {
            childrenHTML = this.body
        }

        const attrString = Object.entries(this.attrs).reduce((acc, [key, value]) => {
            return `${acc} ${key}="${value}"`
        }, '')

        return `<span${attrString}>${childrenHTML}</span>`
    }
}
