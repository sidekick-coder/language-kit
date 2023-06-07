import { Lexer } from '@language-kit/lexer'
import { describe, it, expect } from 'vitest'
import { BaseNode } from './BaseNode'
import { NodeArray } from './NodeArray'

describe('NodeArray', () => {
    const lexer = new Lexer()

    function createNode(value: string, eof = false) {
        const node = new BaseNode()

        node.tokens = lexer.tokenize(value, {
            includeEndOfFileToken: eof,
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

    it('should set start and end position based on start agr', () => {
        const nodes = new NodeArray(
            createNode('First line'),
            createNode('\n'),
            createNode('last line')
        )

        nodes.setPositions(10)

        const positions = nodes.map((node) => [node.start, node.end])

        expect(positions).toEqual([
            [10, 19],
            [20, 20],
            [21, 29],
        ])
    })
})
