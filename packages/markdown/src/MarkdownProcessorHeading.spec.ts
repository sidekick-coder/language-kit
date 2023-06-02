import { describe, it, expect } from 'vitest'
import { MarkdownParser } from './MarkdownParser'
import { MarkdownProcessorHeading } from './MarkdownProcessorHeading'
import { MarkdownNodeHeading } from './MarkdownNodeHeading'

describe('MarkdownProcessorHeading', () => {
    it('should transform text in node paragraph', () => {
        const parser = new MarkdownParser([new MarkdownProcessorHeading()])

        const payload = '# Hello world'

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeHeading()

        node.tokens = parser.toTokens(payload)

        expect(result).toEqual([node])
    })
})
