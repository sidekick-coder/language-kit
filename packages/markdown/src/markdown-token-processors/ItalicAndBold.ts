import { MarkdownTokenProcessor } from '../MarkdownTokenProcessor'
import { MarkdownToken, MarkdownTokenType } from '../MarkdownToken'
import { TokenType } from '@language-kit/lexer'

export default class MarkdownTokenProcessorITalicAndBold extends MarkdownTokenProcessor {
    public order = 10

    public findEndTokenIndex() {
        return this.tokens.findIndex((current, i) => {
            if (i < 3) return false

            const prev = this.tokens[i - 1]
            const prevPrev = this.tokens[i - 2]

            const isValid = [
                current.value === '*',
                prev.value === '*',
                prevPrev && prevPrev.value === '*',
            ]

            return isValid.every(Boolean)
        })
    }

    public process: MarkdownTokenProcessor['process'] = () => {
        const [first, second, third] = this.tokens

        const isValid = [
            first.value === '*',
            second && second.value === '*',
            third && third.value === '*',
        ]

        if (!isValid.every(Boolean)) return false

        const endIndex = this.findEndTokenIndex()

        if (endIndex === -1) return false

        const tokens = this.tokens.slice(0, endIndex + 1)

        const markdownToken = new MarkdownToken({
            type: MarkdownTokenType.ItalicAndBoldText,
            value: tokens.map((t) => t.value).join(''),
            data: {
                text: tokens
                    .slice(3, -3)
                    .map((t) => t.value)
                    .join(''),
            },
        })

        this.markdownTokens.push(markdownToken)

        this.removeTokens(0, tokens.length)

        return true
    }
}
