import { MarkdownNodeHeading } from './MarkdownNodeHeading'
import { MarkdownProcessor } from './MarkdownProcessor'

export class MarkdownProcessorHeading extends MarkdownProcessor {
    public order = 10

    public findBodyStartIndex() {
        return this.tokens.findIndex((token) => {
            if (token.type === 'Word') {
                return true
            }

            return false
        })
    }

    public findBody() {
        const start = this.findBodyStartIndex()
        const end = this.findEndLineIndex()

        if (start === -1 || end === -1) return ''

        return this.tokens.slice(start, end).toText()
    }

    public process() {
        const current = this.tokens[0]

        if (current.value !== '#') return false

        const endIndex = this.findEndLineIndex()

        if (endIndex === -1) return false

        const tokens = this.tokens.slice(0, endIndex)

        const node = new MarkdownNodeHeading()

        node.tokens = tokens
        node.body = this.findBody()
        node.level = tokens.filter((token) => token.value === '#').length

        this.addNode(node)

        return true
    }
}
