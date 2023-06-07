import { describe, it, expect } from 'vitest'
import { MarkdownParser } from './MarkdownParser'
import { MarkdownProcessorTextBold } from './MarkdownProcessorTextBold'
import { MarkdownNodeTextBold } from './MarkdownNodeTextBold'
import { MarkdownProcessorText } from './MarkdownProcessorText'
import { MarkdownProcessorTextWithAttrs } from './MarkdownProcessorTextWithAttrs'
import { MarkdownNodeTextWithAttrs } from './MarkdownNodeTextWithAttrs'
import { MarkdownNodeText } from './MarkdownNodeText'

describe('MarkdownProcessorTextBold', () => {
    it('should transform text with ** syntax in node text bold', () => {
        const parser = new MarkdownParser([MarkdownProcessorTextBold])

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
        const parser = new MarkdownParser([MarkdownProcessorTextBold])

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

    it('should node includes text with attr as children node', () => {
        const parser = new MarkdownParser([
            MarkdownProcessorText,
            MarkdownProcessorTextBold,
            MarkdownProcessorTextWithAttrs,
        ])

        const payload = '**Hello [word]{ color="red" }**'

        const result = parser.toNodes(payload)

        const mainNode = new MarkdownNodeTextBold()
        const helloNode = new MarkdownNodeText()
        const spaceNode = new MarkdownNodeText()
        const textWithAttrNode = new MarkdownNodeTextWithAttrs()

        helloNode.body = 'Hello'
        helloNode.start = 2
        helloNode.end = 6
        helloNode.tokens = parser.toTokens('Hello', { includeEndOfFileToken: false })
        helloNode.tokens.setPositions(helloNode.start)

        spaceNode.body = ' '
        spaceNode.start = 7
        spaceNode.end = 7
        spaceNode.tokens = parser.toTokens(' ', { includeEndOfFileToken: false })
        spaceNode.tokens.setPositions(spaceNode.start)

        textWithAttrNode.body = 'word'
        textWithAttrNode.start = 8
        textWithAttrNode.end = 28
        textWithAttrNode.attrs = { color: 'red' }
        textWithAttrNode.tokens = parser.toTokens('[word]{ color="red" }', {
            includeEndOfFileToken: false,
        })
        textWithAttrNode.children = parser.toNodes('word')
        textWithAttrNode.setPositions(textWithAttrNode.start)

        mainNode.body = 'Hello [word]{ color="red" }'
        mainNode.start = 0
        mainNode.end = payload.length - 1
        mainNode.tokens = parser.toTokens(payload, { includeEndOfFileToken: false })

        mainNode.children.push(helloNode, spaceNode, textWithAttrNode)

        expect(result).toHaveLength(1)

        const resultNode = result[0] as MarkdownNodeTextBold

        expect(resultNode.children[0]).toEqual(helloNode)
        expect(resultNode.children[1]).toEqual(spaceNode)
        expect(resultNode.children[2]).toEqual(textWithAttrNode)

        expect(result[0]).toEqual(mainNode)
    })
})
