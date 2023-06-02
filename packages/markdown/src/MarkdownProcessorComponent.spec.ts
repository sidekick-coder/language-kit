import { describe, it, expect } from 'vitest'
import { MarkdownParser } from './MarkdownParser'
import { MarkdownProcessorComponent } from './MarkdownProcessorComponent'
import { MarkdownNodeComponent } from './MarkdownNodeComponent'

describe('MarkdownProcessorComponent', () => {
    it('should transform text', () => {
        const parser = new MarkdownParser([new MarkdownProcessorComponent()])

        const payload = [':: button', 'Hello world', '::'].join('\n')

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeComponent()

        node.tokens = parser.toTokens(payload, {
            includeEndOfFileToken: false,
        })

        node.name = 'button'
        node.body = 'Hello world'

        expect(result.length, 'Should return 1 node').toEqual(1)

        expect(result[0]).toEqual(node)
    })

    it('should transform text with inline attrs', () => {
        const parser = new MarkdownParser([new MarkdownProcessorComponent()])

        const payload = [
            ':: button { id="btn" :data-count="count" color="red" @click="handle()" }',
            'Hello world',
            '::',
        ].join('\n')

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeComponent()

        node.tokens = parser.toTokens(payload, {
            includeEndOfFileToken: false,
        })

        node.name = 'button'
        node.body = 'Hello world'
        node.attrs = {
            'id': 'btn',
            ':data-count': 'count',
            'color': 'red',
            '@click': 'handle()',
        }

        expect(result.length, 'Should return 1 node').toEqual(1)

        expect(result[0]).toEqual(node)
    })

    it('should transform text with attrs break-lines', () => {
        const parser = new MarkdownParser([new MarkdownProcessorComponent()])

        const payload = [
            ':: button {',
            '   id="btn"',
            '   :data-count="count"',
            '   color="red"',
            '   @click="handle()"',
            '}',
            'Hello world',
            '::',
        ].join('\n')

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeComponent()

        node.tokens = parser.toTokens(payload, {
            includeEndOfFileToken: false,
        })

        node.name = 'button'
        node.body = 'Hello world'
        node.attrs = {
            'id': 'btn',
            ':data-count': 'count',
            'color': 'red',
            '@click': 'handle()',
        }

        expect(result.length, 'Should return 1 node').toEqual(1)

        expect(result[0]).toEqual(node)
    })
})
