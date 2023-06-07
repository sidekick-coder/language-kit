import { MarkdownNode, MarkdownNodeNodeType } from './MarkdownNode'
import { NodeArray } from '@language-kit/core'

export class MarkdownNodeParagraph extends MarkdownNode {
    public readonly type = MarkdownNodeNodeType.Paragraph
    public text = ''
    public children = new NodeArray<MarkdownNode>()
}
