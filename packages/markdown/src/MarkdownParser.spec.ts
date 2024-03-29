import { describe, it, expect } from 'vitest'
import { MarkdownNodeTextBold } from './MarkdownNodeTextBold'
import { MarkdownNodeText } from './MarkdownNodeText'
import { MarkdownNodeArray } from './MarkdownNodeArray'
import { MarkdownParser } from '.'
import { MarkdownNodeHeading } from './MarkdownNodeHeading'
import { MarkdownNodeParagraph } from './MarkdownNodeParagraph'
import { MarkdownNodeBreakLine } from './MarkdownNodeBreakLine'

describe('MarkdownParser', () => {
    it('should parse markdown in nodes', () => {
        const payload = ['# Heading', '**Bold text**', 'NormalText'].join('\n')

        const parser = new MarkdownParser()

        const nodes = parser.toNodes(payload)

        const [heading, _breakLine1, paragraphWithBold, _breakLine2, paragraphWithNormalText] =
            nodes as any[] as [
                MarkdownNodeHeading,
                MarkdownNodeBreakLine,
                MarkdownNodeParagraph,
                MarkdownNodeBreakLine,
                MarkdownNodeParagraph
            ]

        expect(nodes).toBeInstanceOf(MarkdownNodeArray)
        expect(nodes).toHaveLength(5)

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

        expect(html).toBe(
            '<h1>Heading</h1><br><p><strong>Bold text</strong></p><br><p>NormalText</p>'
        )
    })

    it('should transform nodes with symbols in html', () => {
        const payload = ['# Heading @123 ', '**Hello {{name}}**', 'Normal Text with #hello'].join(
            '\n'
        )

        const parser = new MarkdownParser()

        const nodes = parser.toNodes(payload)

        const html = nodes.toHtml()

        expect(html).toBe(
            '<h1>Heading @123 </h1><br><p><strong>Hello {{name}}</strong></p><br><p>Normal Text with #hello</p>'
        )
    })
})
