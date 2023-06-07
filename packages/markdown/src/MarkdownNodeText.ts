import { MarkdownNode, MarkdownNodeNodeType } from './MarkdownNode'

export class MarkdownNodeText extends MarkdownNode {
    public readonly type = MarkdownNodeNodeType.Text
    public text = ''
}