import { describe, it, expect } from 'vitest'
import { Lexer } from '../src/Lexer'
import { Token } from '.'
import { TokenArray } from './TokenArray'

describe('lexer', () => {
    const lexer = new Lexer()

    it('should tokenize symbols', () => {
        const payload = `!@#$%^&*()_+-=[]{};':",./<>?`

        const result = lexer.tokenize(payload)

        const tokens = new TokenArray()

        payload.split('').forEach((char) => tokens.push(Token.symbol(char)))

        tokens.push(Token.endOfFile())

        tokens.setPositions()

        expect(result).toEqual(tokens)
    })

    it('should tokenize text', () => {
        const tokens = lexer.tokenize('This is a **bold text** \n\n')

        const expected = new TokenArray()

        expected.push(
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
        )

        expected.setPositions()

        expect(tokens).toEqual(expected)
    })
})
