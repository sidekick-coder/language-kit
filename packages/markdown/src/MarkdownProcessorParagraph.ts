import { TokenType } from '@language-kit/lexer'
import { MarkdownProcessorText, MarkdownProcessorTextWithAttrs } from '.'
import { MarkdownNodeParagraph } from './MarkdownNodeParagraph'
import { MarkdownProcessor } from './MarkdownProcessor'
import { MarkdownProcessorTextBold } from './MarkdownProcessorTextBold'

export class MarkdownProcessorParagraph extends MarkdownProcessor {
    public order = 20

    public findEndIndex() {
        return this.tokens.findIndex((token, index) => {
            const next = this.tokens[index + 1]

            if (token.type === TokenType.BreakLine) {
                return true
            }

            if (index === this.tokens.length - 1) {
                return true
            }

            return false
        })
    }

    public isParagraph() {
        const current = this.tokens[0]

        const allowedTypes = [TokenType.Word, TokenType.Symbol, TokenType.WhiteSpace] as string[]

        return allowedTypes.includes(current.type)
    }

    public process() {
        if (!this.isParagraph()) return false

        const endIndex = this.findEndIndex()

        if (endIndex === -1) return false

        const tokens = this.tokens.slice(0, endIndex)

        const node = new MarkdownNodeParagraph()

        node.body = tokens.toText()
        node.tokens = tokens

        node.children = this.parser.toNodes(node.body, {
            lexer: {
                includeEndOfFileToken: false,
            },
            processors: {
                exclude: [MarkdownProcessorParagraph],
            },
        })

        this.addNode(node)

        return true
    }
}
