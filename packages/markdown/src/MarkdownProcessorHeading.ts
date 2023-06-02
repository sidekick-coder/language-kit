import { MarkdownNodeHeading } from './MarkdownNodeHeading'
import { MarkdownProcessor } from './MarkdownProcessor'

export class MarkdownProcessorHeading extends MarkdownProcessor {
    public order = 10

    public process() {
        const current = this.tokens[0]

        if (current.value !== '#') return false

        const endLineIndex = this.findEndLineIndex()

        if (endLineIndex === -1) return false

        const tokens = this.tokens.slice(0, endLineIndex + 1)

        const node = new MarkdownNodeHeading()

        node.tokens = tokens

        this.nodes.push(node)

        this.tokens.splice(0, tokens.length)

        return true
    }
}
