import { describe, it, expect } from 'vitest'
import { MarkdownParser } from './MarkdownParser'
import { MarkdownNodeParagraph } from './MarkdownNodeParagraph'
import { MarkdownProcessorParagraph } from './MarkdownProcessorParagraph'
import { MarkdownProcessorTextBold } from './MarkdownProcessorTextBold'
import { MarkdownNodeText } from './MarkdownNodeText'
import { MarkdownNodeTextBold } from './MarkdownNodeTextBold'
import { MarkdownProcessorText } from './MarkdownProcessorText'

describe('MarkdownProcessorParagraph', () => {
    it('should transform text in node paragraph', () => {
        const parser = new MarkdownParser([MarkdownProcessorParagraph])

        const payload = 'Hello world'

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeParagraph()

        node.start = 0
        node.end = -1 // -1 for EOF
        node.body = payload

        node.tokens = parser.toTokens(payload)

        expect(result.length, 'Should return only one node').toBe(1)

        expect(result[0]).toEqual(node)
    })

    it('should process child nodes', () => {
        const parser = new MarkdownParser([
            MarkdownProcessorParagraph,
            MarkdownProcessorTextBold,
            MarkdownProcessorText,
        ])

        const payload = ['Hello **word**'].join('\n').trim()

        const result = parser.toNodes(payload)

        const paragraph = new MarkdownNodeParagraph()
        const text = new MarkdownNodeText()
        const space = new MarkdownNodeText()
        const bold = new MarkdownNodeTextBold()

        text.start = 0
        text.end = 4
        text.body = 'Hello'
        text.tokens = parser.toTokens('Hello', {
            includeEndOfFileToken: false,
        })

        space.start = 5
        space.end = 5
        space.body = ' '
        space.tokens = parser.toTokens(' ', {
            includeEndOfFileToken: false,
        })

        space.tokens.setPositions(space.start)

        bold.start = 6
        bold.end = 13
        bold.body = 'word'
        bold.tokens = parser.toTokens('**word**', {
            includeEndOfFileToken: false,
        })
        bold.children = parser.toNodes('word', {
            processors: {
                exclude: [MarkdownProcessorParagraph],
            },
        })

        bold.setPositions(bold.start)

        paragraph.start = 0
        paragraph.end = -1 // -1 for EOF
        paragraph.tokens = parser.toTokens(payload)
        paragraph.body = payload

        paragraph.children.push(text, space, bold)

        expect(result).toHaveLength(1)

        expect(result[0]).toEqual(paragraph)
    })
})
