import { MarkdownNode, MarkdownNodeType } from './MarkdownNode'

export class MarkdownNodeHeading extends MarkdownNode {
    public readonly type = MarkdownNodeType.Heading
    public level = 1
    public body = ''

    public toHtml() {
        const tag = this.level > 6 ? 'h6' : `h${this.level}`

        return `<${tag}>${this.body}</${tag}>`
    }
}
