import { Lexer, Token, TokenArray } from '@language-kit/lexer'
import { describe, it, expect } from 'vitest'
import { BaseNode } from './BaseNode'
import { NodeArray } from './NodeArray'

describe('NodeArray', () => {
    const lexer = new Lexer()

    function createNode(value: string) {
        const node = new BaseNode()

        node.tokens = lexer.tokenize(value, {
            includeEndOfFile: false,
        })

        return node
    }

    it('should convert to text', () => {
        const nodes = new NodeArray(
            createNode('First line'),
            createNode('\n'),
            createNode('last line')
        )

        expect(nodes.toText()).toBe('First line\nlast line')
    })

    it('should set start and end position', () => {
        const nodes = new NodeArray(
            createNode('First line'),
            createNode('\n'),
            createNode('last line')
        )

        nodes.setPositions()

        const positions = nodes.map((node) => [node.start, node.end])

        expect(positions).toEqual([
            [0, 9],
            [10, 10],
            [11, 19],
        ])
    })
})
