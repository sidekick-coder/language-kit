import type { LexerProcessor } from '../LexerProcessor'
import { Token } from '../Token'

export default class WhiteSpaceProcessor implements LexerProcessor {
    public order = 20

    public findEndIndex = (chars: string[]) => {
        return chars.findIndex((c, i) => {
            const next = chars[i + 1]

            if (c === '\n') return false

            if (next === '\n') return true

            return !/ /.test(c)
        })
    }

    public process: LexerProcessor['process'] = (char, chars, tokens) => {
        if (!/\s/.test(char)) return false

        let endIndex = this.findEndIndex(chars)

        if (endIndex <= 0) {
            endIndex = 1
        }
        const whitespace = chars.slice(0, endIndex).join('')

        tokens.push(Token.whiteSpace(whitespace))

        chars.splice(0, endIndex)

        return true
    }
}
