import type { LexerProcessor } from '../LexerProcessor'
import { Token, TokenType } from '../Token'

export default class BreakLineProcessor implements LexerProcessor {
    public order = 10

    public process: LexerProcessor['process'] = (char, chars, tokens) => {
        if (char !== '\n') return false

        tokens.push(Token.from(TokenType.BreakLine, '\n'))

        chars.shift()

        return true
    }
}
