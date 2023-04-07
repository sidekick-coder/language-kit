import { MarkdownTokenProcessor } from "../MarkdownTokenProcessor";
import { MarkdownToken, MarkdownTokenType } from "../MarkdownToken";

export default class MarkdownTokenProcessorBold extends MarkdownTokenProcessor {
    public order = 10

    public findEndTokenIndex() {
        return this.tokens.findIndex((current, i) => {
            if (i < 2) return false

            const prev = this.tokens[i - 1]

            if (!prev) return false

            return prev.value === '*' && current.value === '*'
        })
    }

    public process: MarkdownTokenProcessor['process'] = () => {

        const [first, second] = this.tokens

        if (first.value !== '*' || second.value !== '*') return false

        const endIndex = this.findEndTokenIndex()

        if (endIndex === -1) return false

        const tokens = this.tokens.slice(0, endIndex + 1)

        const markdownToken = new MarkdownToken({
            type: MarkdownTokenType.BoldText,
            value: tokens.map((t) => t.value).join(''),
            data: {
                text: tokens.slice(2, -2).map((t) => t.value).join('')
            }
        })

        this.markdownTokens.push(markdownToken)

        this.removeTokens(0, tokens.length)

        return true
    }
}