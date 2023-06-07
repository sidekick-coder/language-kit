import { describe, it, expect } from 'vitest'
import { MarkdownNodeTextWithAttrs } from './MarkdownNodeTextWithAttrs'
import { MarkdownNodeText } from './MarkdownNodeText'

describe('MarkdownNodeTextWithAttrs', () => {
    it('should transform simple node to html using body', () => {
        const node = new MarkdownNodeTextWithAttrs()

        node.body = 'Hello world'
        node.attrs = {
            class: 'test',
        }

        expect(node.toHtml()).toBe('<span class="test">Hello world</span>')
    })

    it('should transform simple node to html using children', () => {
        const text = new MarkdownNodeTextWithAttrs()
        const subText = new MarkdownNodeText()

        subText.body = 'Hello world'

        text.children.push(subText)
        text.attrs = {
            class: 'test',
        }

        expect(text.toHtml()).toBe('<span class="test">Hello world</span>')
    })
})
