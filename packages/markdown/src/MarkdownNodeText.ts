import { MarkdownNode, MarkdownNodeType } from './MarkdownNode'

export class MarkdownNodeText extends MarkdownNode {
    public readonly type = MarkdownNodeType.Text
    public body = ''

    public toHtml() {
        return this.body
    }
}
