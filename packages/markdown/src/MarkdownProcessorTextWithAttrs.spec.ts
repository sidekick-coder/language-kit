import { describe, it, expect } from 'vitest'
import { MarkdownParser } from './MarkdownParser'
import { MarkdownNodeTextWithAttrs } from './MarkdownNodeTextWithAttrs'
import { MarkdownProcessorTextWithAttrs } from './MarkdownProcessorTextWithAttrs'

describe('MarkdownProcessorTextBold', () => {
    it('should transform text node text with attrs', () => {
        const parser = new MarkdownParser([new MarkdownProcessorTextWithAttrs()])

        const payload = '[Hello word]{ color="red" }'

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeTextWithAttrs()

        node.body = 'Hello word'
        node.start = 0
        node.end = payload.length - 1
        node.tokens = parser.toTokens(payload, {
            includeEndOfFileToken: false,
        })
        node.attrs = {
            color: 'red',
        }

        expect(result).toHaveLength(1)

        expect(result[0]).toEqual(node)
    })
})
