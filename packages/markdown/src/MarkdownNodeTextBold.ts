import { MarkdownNode, MarkdownNodeNodeType } from './MarkdownNode'

export class MarkdownNodeTextBold extends MarkdownNode {
    public readonly type = MarkdownNodeNodeType.TextBold
    public body = ''
}
