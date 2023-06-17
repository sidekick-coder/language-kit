import { MarkdownProcessor } from './MarkdownProcessor'
import { MarkdownNodeTextWithAttrs } from './MarkdownNodeTextWithAttrs'
import { MarkdownProcessorParagraph } from '.'

export class MarkdownProcessorTextWithAttrs extends MarkdownProcessor {
    public order = 30

    public isTextWithAttrs() {
        const conditions = [
            // should have open bracket
            this.tokens[0].value === '[',
            // should have close bracket
            this.tokens.some((token) => token.value === ']'),
            // should have open attrs
            this.tokens.some((token) => token.value === '{'),
            // should have close attrs
            this.tokens.some((token) => token.value === '}'),
        ]

        return conditions.every((condition) => condition)
    }

    public findEndIndex() {
        return this.tokens.findIndex((token) => token.value === '}')
    }

    public findBody() {
        const endIndex = this.findFirstIndexByValue(']')

        if (endIndex === -1) return ''

        return this.tokens.slice(1, endIndex).toText()
    }

    public findAttrs() {
        const startIndex = this.findFirstIndexByValue('{')

        if (startIndex === -1) return {}

        const endIndex = this.findEndIndex()

        if (endIndex === -1) return {}

        const text = this.tokens.slice(startIndex, endIndex + 1).toText()

        return this.transformStringToAttrsObject(text)
    }

    public process() {
        if (!this.isTextWithAttrs()) return false

        const endIndex = this.findEndIndex()

        if (endIndex === -1) return false

        const tokens = this.tokens.slice(0, endIndex + 1)

        const node = new MarkdownNodeTextWithAttrs()

        node.tokens = tokens
        node.body = this.findBody()
        node.attrs = this.findAttrs()

        node.children = this.parser.toNodes(node.body, {
            processors: {
                exclude: [MarkdownProcessorTextWithAttrs, MarkdownProcessorParagraph],
            },
        })

        this.addNode(node)

        return true
    }
}
