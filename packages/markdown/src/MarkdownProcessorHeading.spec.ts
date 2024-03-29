import { describe, it, expect } from 'vitest'
import { MarkdownParser } from './MarkdownParser'
import { MarkdownProcessorHeading } from './MarkdownProcessorHeading'
import { MarkdownNodeHeading } from './MarkdownNodeHeading'

describe.only('MarkdownProcessorHeading', () => {
    it('should transform text in node heading', () => {
        const parser = new MarkdownParser([MarkdownProcessorHeading])

        const payload = '# Hello world'

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeHeading()

        node.start = 0
        node.end = payload.length - 1
        node.level = 1
        node.body = 'Hello world'

        node.tokens = parser.toTokens(payload, {
            includeEndOfFileToken: false,
        })

        expect(result).toHaveLength(1)

        expect(result[0]).toEqual(node)
    })
})
