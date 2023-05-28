import { TokenType } from '@language-kit/lexer'
import { NodeType } from '../Node'
import { BaseProcessor } from '../BaseProcessor'

export default class ComponentProcessor extends BaseProcessor {
    public order = 10

    public findComponentTokenEndIndex() {
        return this.tokens.findIndex((current, i) => {
            if (i <= 1) return false

            const prev = this.tokens[i - 1]

            if (!prev) return false

            return [prev, current].every((t) => t.value === ':')
        })
    }

    public process: BaseProcessor['process'] = () => {
        const [first, second] = this.tokens

        if (first.value !== ':' || second.value !== ':') return false

        const endIndex = this.findComponentTokenEndIndex()

        if (endIndex === -1) return false

        const tokens = this.tokens.slice(0, endIndex + 1)

        console.log(tokens)

        this.addNode({
            type: NodeType.Component,
            tokens,
        })

        this.removeTokens(0, endIndex + 1)

        return true
    }
}
