import { describe, it, expect } from 'vitest'
import { MarkdownParser } from './MarkdownParser'
import { MarkdownProcessorHeading } from './MarkdownProcessorHeading'
import { MarkdownNodeHeading } from './MarkdownNodeHeading'

describe('MarkdownProcessorHeading', () => {
    it('should transform text in node heading', () => {
        const parser = new MarkdownParser([new MarkdownProcessorHeading()])

        const payload = '# Hello world'

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeHeading()

        node.start = 0
        node.end = -1 // -1 for EOF
        node.level = 1
        node.body = 'Hello world'

        node.tokens = parser.toTokens(payload)

        expect(result).toHaveLength(1)

        expect(result[0]).toEqual(node)
    })
})
