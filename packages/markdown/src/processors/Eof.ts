import { TokenType } from '@language-kit/lexer'
import { BaseProcessor } from '../BaseProcessor'

export default class EofProcessor extends BaseProcessor {
    public order = 10

    public process: BaseProcessor['process'] = () => {
        const [current] = this.tokens

        if (current.type !== TokenType.EndOfFile) return false

        const lastIndex = this.nodes.length - 1

        if (!this.nodes[lastIndex]) return false

        this.nodes[lastIndex].tokens.push(current)

        this.removeTokens(0, 1)

        return true
    }
}
