import type { LexerProcessor } from '../LexerProcessor'
import { Token, TokenType } from '../Token'

export default class SymbolProcessor implements LexerProcessor {
    public order = 80

    public process: LexerProcessor['process'] = (char, chars, tokens) => {
        const regex = /[a-z0-9]/i

        if (regex.test(char)) return false

        tokens.push(Token.from(TokenType.Symbol, char))

        chars.shift()

        return true
    }
}
