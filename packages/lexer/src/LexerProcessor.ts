import type { Token } from './Token'

export interface LexerProcessor {
    order: number
    process: (char: string, chars: string[], tokens: Token[]) => boolean
}
