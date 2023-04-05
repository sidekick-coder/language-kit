import type LexerProcessor from '../LexerProcessor'
import Token, { TokenType } from '../Token'

export default class WhiteSpaceProcessor implements LexerProcessor {
  public order = 20

  public process: LexerProcessor['process'] = (char, chars, tokens) => {
    if (!/\s/.test(char)) return false

    let endIndex = chars.findIndex((c) => !/\s/.test(c))

    if (endIndex === -1) endIndex = chars.length

    const whitespace = chars.slice(0, endIndex).join('')

    tokens.push(Token.from(TokenType.WhiteSpace, whitespace))

    if (endIndex > 0) chars.splice(0, endIndex)

    if (endIndex === 0) chars.shift()

    return true
  }
}
