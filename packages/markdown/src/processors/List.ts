import { TokenType } from '@language-kit/lexer'
import { NodeType } from '../Node'
import { BaseProcessor } from '../BaseProcessor'

export default class ListProcessor extends BaseProcessor {
    public order = 10

    public findNodeEndIndex() {
        return this.tokens.findIndex((current, index) => {
            const next = this.tokens[index + 1]

            if (current.type === TokenType.EndOfFile) return true

            if (!next) return false

            if (current.type === TokenType.BreakLine && next?.value !== '-') return true

            return false
        })
    }

    public process: BaseProcessor['process'] = () => {
        if (this.tokens[0].value !== '-') return false

        const endIndex = this.findNodeEndIndex()

        if (endIndex === -1) return false

        const allTokens = this.tokens.slice(0, endIndex + 1)

        this.addNode({ type: NodeType.List, tokens: allTokens })

        this.removeTokens(0, allTokens.length)

        return true
    }
}
