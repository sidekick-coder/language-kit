import { TokenType } from '@language-kit/lexer'
import { NodeType } from '../Node'
import { BaseProcessor } from '../BaseProcessor'

export default class BlockquoteProcessor extends BaseProcessor {
    public order = 10

    public findComponentTokenEndIndex() {
        return this.tokens.findIndex((current, i) => {
            if (current.type === TokenType.EndOfFile) return true

            if (current.type !== TokenType.BreakLine) return false

            const next = this.tokens[i + 1]

            if (!next) return false

            if (next.type === TokenType.EndOfFile) return true

            if (next.type === TokenType.BreakLine) return true

            return next.value !== '>'
        })
    }

    public process: BaseProcessor['process'] = () => {
        const [fisrt] = this.tokens

        if (fisrt.value !== '>') return false

        const endIndex = this.findComponentTokenEndIndex()

        if (endIndex === -1) return false

        const tokens = this.tokens.slice(0, endIndex + 1)

        this.addNode({
            type: NodeType.Blockquote,
            tokens,
        })

        this.removeTokens(0, endIndex + 1)

        return true
    }
}
