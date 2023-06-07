import { describe, it, expect } from 'vitest'
import { MarkdownNodeTextBold } from './MarkdownNodeTextBold'
import { MarkdownNodeText } from './MarkdownNodeText'

describe('MarkdownNodeTextBold', () => {
    it('should transform simple node to html using body', () => {
        const node = new MarkdownNodeTextBold()

        node.body = 'Hello world'

        expect(node.toHtml()).toBe('<strong>Hello world</strong>')
    })

    it('should transform simple node to html using children', () => {
        const node = new MarkdownNodeTextBold()
        const subText = new MarkdownNodeText()

        subText.body = 'Hello world'

        node.children.push(subText)

        expect(node.toHtml()).toBe('<strong>Hello world</strong>')
    })
})
