import { describe, it, expect } from 'vitest'
import { MarkdownParser } from './MarkdownParser'
import { MarkdownNodeTextWithAttrs } from './MarkdownNodeTextWithAttrs'
import { MarkdownProcessorTextWithAttrs } from './MarkdownProcessorTextWithAttrs'
import { MarkdownNodeText } from './MarkdownNodeText'
import { MarkdownNodeTextBold } from './MarkdownNodeTextBold'
import { MarkdownProcessorText } from './MarkdownProcessorText'
import { MarkdownProcessorTextBold } from './MarkdownProcessorTextBold'

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

    it('should node includes text bold children node', () => {
        const parser = new MarkdownParser([
            new MarkdownProcessorText(),
            new MarkdownProcessorTextBold(),
            new MarkdownProcessorTextWithAttrs(),
        ])

        const payload = '[Hello **word**]{ color="red" }'

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeTextWithAttrs()
        const helloNode = new MarkdownNodeText()
        const spaceNode = new MarkdownNodeText()
        const boldNode = new MarkdownNodeTextBold()

        helloNode.body = 'Hello'
        helloNode.start = 1
        helloNode.end = 5
        helloNode.tokens = parser.toTokens('Hello', { includeEndOfFileToken: false })
        helloNode.tokens.setPositions(1)

        spaceNode.body = ' '
        spaceNode.start = 6
        spaceNode.end = 6
        spaceNode.tokens = parser.toTokens(' ', { includeEndOfFileToken: false })
        spaceNode.tokens.setPositions(6)

        boldNode.body = 'word'
        boldNode.start = 7
        boldNode.end = 14
        boldNode.tokens = parser.toTokens('**word**', { includeEndOfFileToken: false })
        boldNode.tokens.setPositions(7)

        node.body = 'Hello **word**'
        node.start = 0
        node.end = payload.length - 1
        node.tokens = parser.toTokens(payload, { includeEndOfFileToken: false })
        node.attrs = { color: 'red' }

        node.children.push(helloNode, spaceNode, boldNode)
        expect(result).toHaveLength(1)

        expect(result[0]).toEqual(node)
    })
})
