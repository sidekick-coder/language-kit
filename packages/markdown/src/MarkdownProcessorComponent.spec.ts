import { describe, it, expect } from 'vitest'
import { MarkdownParser } from './MarkdownParser'
import { MarkdownProcessorComponent } from './MarkdownProcessorComponent'
import { MarkdownNodeComponent } from './MarkdownNodeComponent'
import { MarkdownProcessorParagraph } from './MarkdownProcessorParagraph'

describe('MarkdownProcessorComponent', () => {
    it('should transform text component', () => {
        const parser = new MarkdownParser([MarkdownProcessorComponent])

        const payload = ':: button\nHello world\n::\n'

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeComponent()

        node.start = 0
        node.end = payload.length - 1

        node.tokens = parser.toTokens(payload, {
            includeEndOfFileToken: false,
        })

        node.name = 'button'
        node.body = 'Hello world'

        expect(result.length, 'Should return 1 node').toEqual(1)

        expect(result[0]).toEqual(node)
    })

    it('should transform text inline component', () => {
        const parser = new MarkdownParser([MarkdownProcessorComponent])

        const payload = ':: button\nHello world\n::'

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeComponent()

        node.start = 0
        node.end = payload.length - 1

        node.tokens = parser.toTokens(payload, {
            includeEndOfFileToken: false,
        })

        node.name = 'button'
        node.body = 'Hello world'
        node.isInlined = true

        expect(result.length, 'Should return 1 node').toEqual(1)

        expect(result[0]).toEqual(node)
    })

    it('should transform text with inline attrs', () => {
        const parser = new MarkdownParser([MarkdownProcessorComponent])

        const payload = [
            ':: button { id="btn" :data-count="count" color="red" @click="handle()" }',
            'Hello world',
            '::',
            '',
        ].join('\n')

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeComponent()

        node.start = 0
        node.end = payload.length - 1

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
        const parser = new MarkdownParser([MarkdownProcessorComponent])

        const payload = [
            ':: button {',
            '   id="btn"',
            '   :data-count="count"',
            '   color="red"',
            '   @click="handle()"',
            '}',
            'Hello world',
            '::',
            '',
        ].join('\n')

        const result = parser.toNodes(payload)

        const node = new MarkdownNodeComponent()

        node.start = 0
        node.end = payload.length - 1

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

    it('should have priority over paragraph node', () => {
        const parser = new MarkdownParser([MarkdownProcessorParagraph, MarkdownProcessorComponent])

        const payload = [':: button', 'Hello world', '::'].join('\n').trim()

        const result = parser.toNodes(payload, {
            lexer: {
                includeEndOfFileToken: false,
            },
        })

        expect(result.length, 'Should return only 1 node').toBe(1)

        expect(result[0].type).toBe(MarkdownNodeComponent.types.Component)
    })
})
