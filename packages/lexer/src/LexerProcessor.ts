import type Token from './Token'

export default interface LexerProcessor {
  order: number
  process: (char: string, chars: string[], tokens: Token[]) => boolean
}
