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
})
