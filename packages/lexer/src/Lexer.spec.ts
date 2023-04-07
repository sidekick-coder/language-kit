import { describe, it, expect } from 'vitest'
import { Lexer } from '../src/Lexer'
import { Token } from '.'

describe('lexer', () => {
  const lexer = new Lexer()

  const files = import.meta.glob('./tests/fixtures/*.txt', {
    eager: true,
    as: 'raw'
  })

  it.each(Object.entries(files))('should tokenize fixtures %s', (filename, content) => {
    const tokens = lexer.tokenize(content)

    const length = tokens.reduce((acc, token) => acc + token.value.length, 0)

    expect(lexer.tokenize(content)).toMatchSnapshot()

    expect(length).toBe(content.length)
  })

  it('should correctly convert whitespaces', () => {
    const tokens = lexer.tokenize('This is a **bold text** \n\n')

    const expected = [
      Token.word('This'),
      Token.whiteSpace(),
      Token.word('is'),
      Token.whiteSpace(),
      Token.word('a'),
      Token.whiteSpace(),
      Token.symbol('*'),
      Token.symbol('*'),
      Token.word('bold'),
      Token.whiteSpace(),
      Token.word('text'),
      Token.symbol('*'),
      Token.symbol('*'),
      Token.whiteSpace(),
      Token.breakLine(),
      Token.breakLine(),
      Token.endOfFile()
    ]

    expect(tokens).toEqual(expected)
  })
})
