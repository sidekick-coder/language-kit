import { MarkdownTokenProcessor } from '../MarkdownTokenProcessor'
import { MarkdownToken, MarkdownTokenType } from '../MarkdownToken'
import { TokenType } from '@language-kit/lexer'

export default class MarkdownTokenProcessorITalic extends MarkdownTokenProcessor {
    public order = 20

    public findEndTokenIndex() {
        return this.tokens.findIndex((current, i) => {
            if (i < 1) return false

            return current.value === '*'
        })
    }

    public process: MarkdownTokenProcessor['process'] = () => {
        const [first, second] = this.tokens

        const isValid = [first.value === '*', second && second.type === TokenType.Word]

        if (!isValid.every(Boolean)) return false

        const endIndex = this.findEndTokenIndex()

        if (endIndex === -1) return false

        const tokens = this.tokens.slice(0, endIndex + 1)

        const markdownToken = new MarkdownToken({
            type: MarkdownTokenType.ItalicText,
            value: tokens.map((t) => t.value).join(''),
            data: {
                text: tokens
                    .slice(1, -1)
                    .map((t) => t.value)
                    .join(''),
            },
        })

        this.markdownTokens.push(markdownToken)

        this.removeTokens(0, tokens.length)

        return true
    }
}
