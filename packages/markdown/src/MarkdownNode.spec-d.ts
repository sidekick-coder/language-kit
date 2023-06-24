import { expectTypeOf, describe, it } from 'vitest'
import { MarkdownNode, MarkdownNodeHeading } from '.'

describe('MarkdownNode (types)', () => {
    it('should is() be used with enum', () => {
        const node = new MarkdownNode()

        if (node.is(MarkdownNode.types.Heading)) {
            expectTypeOf(node).toMatchTypeOf<MarkdownNodeHeading>()
        }
    })

    it('should is() be used with string', () => {
        const node = new MarkdownNode()

        if (node.is('Heading')) {
            expectTypeOf(node).toMatchTypeOf<MarkdownNodeHeading>()
        }
    })

    it('should is() be used with generic string', () => {
        const node = new MarkdownNode()

        if (node.is('custom')) {
            expectTypeOf(node).toMatchTypeOf<MarkdownNode>()
        }
    })

    it('should is() be used with generic string and custom node type', () => {
        const CustomNode = class extends MarkdownNode {
            public type = 'custom'
        }

        const node = new MarkdownNode()

        if (node.is<typeof CustomNode>('custom')) {
            expectTypeOf(node).toMatchTypeOf<typeof CustomNode>()
        }
    })
})
