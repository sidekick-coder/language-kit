import { describe, it, expect } from 'vitest'
import { Token } from '.'
import { TokenArray } from './TokenArray'

describe('TokenArray.ts', () => {
    it.each([
        [
            [Token.word('Hello'), Token.whiteSpace(), Token.word('word')],
            [
                [0, 4],
                [5, 5],
                [6, 9],
            ],
            [
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
                Token.endOfFile(),
            ],
            [
                [0, 3],
                [4, 4],
                [5, 6],
                [7, 7],
                [8, 8],
                [9, 9],
                [10, 10],
                [11, 11],
                [12, 15],
                [16, 16],
                [17, 20],
                [21, 21],
                [22, 22],
                [-1, -1],
            ],
        ],
    ])('should add start and end index', (payload, positions) => {
        const tokens = new TokenArray()

        tokens.push(...payload)

        tokens.setPositions()

        const result = tokens.map((token) => [token.start, token.end])

        expect(result).toEqual(positions)
    })

    const methods = ['setPositions']

    it('should slice() return an instance of TokenArray', () => {
        const tokens = new TokenArray()

        tokens.push(...[Token.word('Hello'), Token.whiteSpace(), Token.word('word')])

        const result = tokens.slice(0, 1)

        expect(result).toBeInstanceOf(TokenArray)

        methods.forEach((method) => expect(result[method]).toBeDefined())
    })

    it('should map() return an instance of TokenArray', () => {
        const tokens = new TokenArray()

        tokens.push(...[Token.word('Hello'), Token.whiteSpace(), Token.word('word')])

        const result = tokens.map((token) => token)

        expect(result).toBeInstanceOf(TokenArray)

        methods.forEach((method) => expect(result[method]).toBeDefined())
    })
})
