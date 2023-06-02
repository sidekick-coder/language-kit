import { describe, it, expect } from 'vitest'
import { MarkdownParser } from './MarkdownParser'
import { MarkdownNodeParagraph } from './MarkdownNodeParagraph'
import { MarkdownProcessorParagraph } from './MarkdownProcessorParagraph'

describe('MarkdownProcessorParagraph', () => {
    it('should transform text in node paragraph', () => {
        const parser = new MarkdownParser([new MarkdownProcessorParagraph()])

        const payload = 'Hello world'

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeParagraph()

        node.tokens = parser.toTokens(payload)

        expect(result).toEqual([node])
    })
})
