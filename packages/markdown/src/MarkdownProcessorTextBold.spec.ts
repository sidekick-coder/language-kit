import { describe, it, expect } from 'vitest'
import { MarkdownParser } from './MarkdownParser'
import { MarkdownProcessorTextBold } from './MarkdownProcessorTextBold'
import { MarkdownNodeTextBold } from './MarkdownNodeTextBold'

describe('MarkdownProcessorTextBold', () => {
    it('should transform text with ** syntax in node text bold', () => {
        const parser = new MarkdownParser([new MarkdownProcessorTextBold()])

        const payload = '**Hello world**'

        const result = parser.toNodes(payload)
        const resultNode = result[0] as MarkdownNodeTextBold

        const node = new MarkdownNodeTextBold()

        node.start = 0
        node.end = payload.length - 1
        node.body = 'Hello world'
        node.tokens = parser.toTokens(payload, {
            includeEndOfFileToken: false,
        })

        expect(result.length, 'Ony 1 node returned').toEqual(1)

        expect(resultNode).toEqual(node)
    })

    it('should transform text with __ syntax in node text bold', () => {
        const parser = new MarkdownParser([new MarkdownProcessorTextBold()])

        const payload = '__Hello world__'

        const result = parser.toNodes(payload)
        const resultNode = result[0] as MarkdownNodeTextBold

        const node = new MarkdownNodeTextBold()

        node.start = 0
        node.end = payload.length - 1
        node.body = 'Hello world'
        node.tokens = parser.toTokens(payload, {
            includeEndOfFileToken: false,
        })

        expect(result.length, 'Ony 1 node returned').toEqual(1)

        expect(resultNode).toEqual(node)
    })
})
