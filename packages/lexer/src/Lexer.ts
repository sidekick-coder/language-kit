import type { LexerProcessor } from './LexerProcessor'
import { Token } from './Token'

import { allProcessors } from './Processors'
import { TokenArray } from './TokenArray'

export interface LexerTokenizeOptions {
    includeEndOfFileToken?: boolean
}

const defaultOptions: LexerTokenizeOptions = {
    includeEndOfFileToken: true,
}

export class Lexer<T extends Token = Token> {
    public processors: LexerProcessor[] = allProcessors

    /**
     * Tokenize a string of code
     * @param code
     * @param options
     * @returns A TokenArray
     * @example
     * ```ts
     * const lexer = new Lexer()
     * const tokens = lexer.tokenize('1 + 1')
     * ```
     */
    public tokenize(code: string, options: LexerTokenizeOptions = defaultOptions) {
        const tokens = new TokenArray<T>()

        const chars = code.split('')

        while (chars.length) {
            const current = chars[0]

            this.processors.sort((a, b) => a.order - b.order)

            const result = this.processors.find((p) => p.process(current, chars, tokens))

            if (result) continue

            console.debug('[@language-kit/lexer] unhandled char', current)

            chars.shift()
        }

        if (options.includeEndOfFileToken) {
            tokens.push(Token.endOfFile() as T)
        }

        tokens.setPositions()

        return tokens
    }
}
