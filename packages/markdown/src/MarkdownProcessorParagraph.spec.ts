import { describe, it, expect } from 'vitest'
import { MarkdownParser } from './MarkdownParser'
import { MarkdownNodeParagraph } from './MarkdownNodeParagraph'
import { MarkdownProcessorParagraph } from './MarkdownProcessorParagraph'
import { MarkdownProcessorComponent } from './MarkdownProcessorComponent'

describe('MarkdownProcessorParagraph', () => {
    it('should transform text in node paragraph', () => {
        const parser = new MarkdownParser([new MarkdownProcessorParagraph()])

        const payload = 'Hello world'

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeParagraph()

        node.start = 0
        node.end = payload.length - 1

        node.tokens = parser.toTokens(payload)

        expect(result.length, 'Should return only one node').toBe(1)

        expect(result).toEqual([node])
    })

    it('should not transform text component in paragraph', () => {
        const parser = new MarkdownParser([
            new MarkdownProcessorParagraph(),
            new MarkdownProcessorComponent(),
        ])

        const payload = [':: button', 'Hello world', '::'].join('\n').trim()

        const result = parser.toNodes(payload)

        expect(result.length, 'Should return only 2 nodes').toBe(2)

        expect(result[0].type).toBe(MarkdownNodeParagraph.types.Component)
        expect(result[1].type).toBe(MarkdownNodeParagraph.types.Paragraph)
    })
})
