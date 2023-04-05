import { describe, it, expect } from 'vitest'
import { Lexer } from '../src/Lexer'

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
})
