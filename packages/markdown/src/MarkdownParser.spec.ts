import { describe, it, expect } from 'vitest'
import { MarkdownNodeTextBold } from './MarkdownNodeTextBold'
import { MarkdownNodeText } from './MarkdownNodeText'
import { MarkdownNodeArray } from './MarkdownNodeArray'
import { MarkdownParser } from '.'
import { MarkdownNodeHeading } from './MarkdownNodeHeading'
import { MarkdownNodeParagraph } from './MarkdownNodeParagraph'

describe('MarkdownParser', () => {
    it('should parse markdown in nodes', () => {
        const payload = ['# Heading', '**Bold text**', 'NormalText'].join('\n')

        const parser = new MarkdownParser()

        const nodes = parser.toNodes(payload)

        const heading = nodes[0] as MarkdownNodeHeading
        const paragraphWithBold = nodes[1] as MarkdownNodeParagraph
        const paragraphWithNormalText = nodes[2] as MarkdownNodeParagraph

        expect(nodes).toBeInstanceOf(MarkdownNodeArray)
        expect(nodes).toHaveLength(3)

        expect(heading).toBeInstanceOf(MarkdownNodeHeading)
        expect(paragraphWithBold).toBeInstanceOf(MarkdownNodeParagraph)
        expect(paragraphWithNormalText).toBeInstanceOf(MarkdownNodeParagraph)

        expect(paragraphWithBold.children).toHaveLength(1)
        expect(paragraphWithBold.children[0]).toBeInstanceOf(MarkdownNodeTextBold)

        expect(paragraphWithNormalText.children).toHaveLength(1)
        expect(paragraphWithNormalText.children[0]).toBeInstanceOf(MarkdownNodeText)
    })

    it('should transform nodes in html', () => {
        const payload = ['# Heading', '**Bold text**', 'NormalText'].join('\n')

        const parser = new MarkdownParser()

        const nodes = parser.toNodes(payload)

        const html = nodes.toHtml()

        expect(html).toBe('<h1>Heading</h1><p><strong>Bold text</strong></p><p>NormalText</p>')
    })

    it('should transform nodes with symbols in html', () => {
        const payload = ['# Heading @123 ', '**Hello {{crazy}}**', 'Normal Text with #hello'].join(
            '\n'
        )

        const parser = new MarkdownParser()

        const nodes = parser.toNodes(payload)

        const html = nodes.toHtml()

        expect(html).toBe(
            '<h1>Heading @123</h1><p><strong>Hello {{crazy}}</strong></p><p>Normal Text with #hello</p>'
        )
    })
})
