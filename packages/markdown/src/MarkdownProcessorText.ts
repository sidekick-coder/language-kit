import { MarkdownProcessor } from './MarkdownProcessor'
import { Token } from '@language-kit/lexer'
import { MarkdownNodeText } from './MarkdownNodeText'

export class MarkdownProcessorText extends MarkdownProcessor {
    public order = 40

    public tokenTypesConsideredTexts = [
        Token.types.Word,
        Token.types.WhiteSpace,
        Token.types.Symbol,
    ] as string[]

    public process() {
        const token = this.tokens[0]

        if (!this.tokenTypesConsideredTexts.includes(token.type)) return

        const node = new MarkdownNodeText()

        node.body = token.value
        node.tokens = this.tokens.slice(0, 1)

        this.nodes.push(node)
        this.tokens.splice(0, 1)

        return true
    }
}
