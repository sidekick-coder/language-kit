import { MarkdownProcessor } from './MarkdownProcessor'
import { MarkdownNodeTextBold } from './MarkdownNodeTextBold'

export class MarkdownProcessorTextBold extends MarkdownProcessor {
    public patters = ['_', '*']

    public findEndIndex() {
        return this.tokens.findIndex((t, i) => {
            const prev = this.tokens[i - 1]

            if (i <= 2) return false

            if (!prev) return false

            return [t.value, prev.value].every((v) => this.patters.includes(v))
        })
    }

    public process() {
        const isBold = this.tokens.slice(0, 2).every((token) => this.patters.includes(token.value))

        if (!isBold) return

        const endIndex = this.findEndIndex()

        if (endIndex === -1) return

        const node = new MarkdownNodeTextBold()

        const tokens = this.tokens.slice(0, endIndex + 1)

        node.body = tokens.slice(2, tokens.length - 2).toText()
        node.tokens = tokens

        this.nodes.push(node)
        this.tokens.splice(0, tokens.length)

        return true
    }
}
