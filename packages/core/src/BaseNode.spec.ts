import { Token, TokenArray } from '@language-kit/lexer'
import { describe, it, expect } from 'vitest'
import { BaseNode } from './BaseNode'

describe('BaseNode', () => {
    it('should be converted to text', () => {
        const tokens = new TokenArray(
            Token.word('Hello'),
            Token.whiteSpace(' '),
            Token.word('word'),
            Token.endOfFile()
        )

        const node = new BaseNode()

        node.tokens = tokens

        expect(node.toText()).toBe('Hello word')
    })

    it('should set positions with different offset', () => {
        const tokens = new TokenArray(
            Token.word('Hello'),
            Token.whiteSpace(' '),
            Token.word('word'),
            Token.endOfFile()
        )

        const node = new BaseNode()

        node.tokens = tokens

        node.tokens.setPositions(10)

        const positions = node.tokens.map((token) => [token.start, token.end])

        expect(positions).toEqual([
            [10, 14],
            [15, 15],
            [16, 19],
            [-1, -1],
        ])
    })

    it('should handle start and end position when have eof', () => {
        const tokens = new TokenArray(
            Token.word('First'),
            Token.whiteSpace(' '),
            Token.word('line'),
            Token.breakLine('\n'),
            Token.word('last'),
            Token.whiteSpace(' '),
            Token.word('line'),
            Token.endOfFile()
        )

        const node = new BaseNode()

        node.tokens = tokens

        node.setPositions()

        const positions = node.tokens.map((node) => [node.start, node.end])

        expect(node.start).toBe(0)
        expect(node.end).toBe(-1)

        expect(positions).toEqual([
            [0, 4],
            [5, 5],
            [6, 9],
            [10, 10],
            [11, 14],
            [15, 15],
            [16, 19],
            [-1, -1],
        ])

        expect(node.tokens.at(-1)?.type, 'should have eof token').toBe(Token.types.EndOfFile)
    })
})
