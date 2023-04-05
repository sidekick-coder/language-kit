import type LexerProcessor from '../LexerProcessor'
import Token, { TokenType } from '../Token'

export default class WordProcessor implements LexerProcessor {
  public order = 90

  public process: LexerProcessor['process'] = (char, chars, tokens) => {
    const regex = /[a-z0-9]/i

    if (!regex.test(char)) return false

    let endIndex = chars.findIndex((c) => !regex.test(c))

    if (endIndex === -1) endIndex = chars.length

    const word = chars.slice(0, endIndex).join('')

    tokens.push(Token.from(TokenType.Word, word))

    if (endIndex > 0) chars.splice(0, endIndex)

    if (endIndex === 0) chars.shift()

    return true
  }
}
