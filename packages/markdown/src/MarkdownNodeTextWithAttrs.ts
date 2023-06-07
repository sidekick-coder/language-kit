import { NodeArray } from '@language-kit/core'
import { MarkdownNode, MarkdownNodeNodeType } from './MarkdownNode'

export class MarkdownNodeTextWithAttrs extends MarkdownNode {
    public readonly type = MarkdownNodeNodeType.TextWithAttrs
    public body = ''
    public children = new NodeArray<MarkdownNode>()
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
}
