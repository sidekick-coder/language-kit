import type { LexerProcessor } from './LexerProcessor'
import { Token, TokenType } from './Token'

import { allProcessors } from './Processors'
import TokenArray from './TokenArray'

interface Options {
    includeEndOfFile?: boolean
}

const defaultOptions: Options = {
    includeEndOfFile: true,
}

export class Lexer {
    public processors: LexerProcessor[] = allProcessors

    public tokenize(code: string, options: Options = defaultOptions) {
        const tokens = new TokenArray()

        const chars = code.split('')

        while (chars.length) {
            const current = chars[0]

            this.processors.sort((a, b) => a.order - b.order)

            const result = this.processors.find((p) => p.process(current, chars, tokens))

            if (result) continue

            console.debug('[@language-kit/lexer] unhandled char', current)

            chars.shift()
        }

        if (options.includeEndOfFile) {
            tokens.push(Token.endOfFile())
        }

        tokens.setPositions()

        return tokens
    }
}
