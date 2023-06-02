import { MarkdownNode, MarkdownNodeNodeType } from './MarkdownNode'

export class MarkdownNodeParagraph extends MarkdownNode {
    public readonly type = MarkdownNodeNodeType.Paragraph
}
