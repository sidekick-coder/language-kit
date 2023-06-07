import { NodeArray } from '@language-kit/core'
import { MarkdownNode, MarkdownNodeNodeType } from './MarkdownNode'

export class MarkdownNodeTextBold extends MarkdownNode {
    public readonly type = MarkdownNodeNodeType.TextBold
    public body = ''
    public children = new NodeArray<MarkdownNode>()

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
}
