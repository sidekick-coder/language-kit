import { describe, it, expect } from 'vitest'
import { MarkdownNodeTextWithAttrs } from './MarkdownNodeTextWithAttrs'
import { MarkdownNodeTextBold } from './MarkdownNodeTextBold'
import { MarkdownNodeText } from './MarkdownNodeText'
import { MarkdownNodeArray } from './MarkdownNodeArray'

describe('MarkdownNodeArray', () => {
    it('should transform all nodes in html', () => {
        const colorText = new MarkdownNodeTextWithAttrs()
        const boldText = new MarkdownNodeTextBold()
        const text = new MarkdownNodeText()

        text.body = 'Normal text'

        colorText.body = 'Color text'
        colorText.attrs = { color: 'red' }

        boldText.body = 'Bold text'

        const html = new MarkdownNodeArray(colorText, boldText, text).toHtml()

        expect(html).toBe(
            '<span color="red">Color text</span><strong>Bold text</strong>Normal text'
        )
    })
})
