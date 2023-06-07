import { describe, it, expect } from 'vitest'
import { MarkdownParser } from './MarkdownParser'
import { MarkdownNodeText } from './MarkdownNodeText'
import { NodeArray } from '@language-kit/core'
import { MarkdownProcessorText } from './MarkdownProcessorText'

describe('MarkdownProcessorTextBold', () => {
    function createNodes(text: string) {
        const tokens = new MarkdownParser().toTokens(text, {
            includeEndOfFileToken: false,
        })

        const nodes = new NodeArray()

        tokens.map((token) => {
            const node = new MarkdownNodeText()

            node.body = token.value
            node.tokens.push(token)

            nodes.push(node)
        })

        nodes.setPositions()

        return nodes
    }

    it('should transform text node text', () => {
        const parser = new MarkdownParser([MarkdownProcessorText])

        const payload = 'Hello world'

        const result = parser.toNodes(payload)

        const nodes = createNodes(payload)

        expect(result.length, 'Should return 3 nodes').toEqual(3)

        expect(result).toEqual(nodes)
    })
})
