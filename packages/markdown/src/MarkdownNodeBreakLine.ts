import { MarkdownNode, MarkdownNodeType } from './MarkdownNode'

export class MarkdownNodeBreakLine extends MarkdownNode {
    public readonly type = MarkdownNodeType.BreakLine

    public toHtml() {
        return '<br>'
    }
}
