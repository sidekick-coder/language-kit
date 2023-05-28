import { describe, it, expect } from 'vitest'

import { Token } from '@language-kit/lexer'

import { Parser } from '../Parser'
import { Node, NodeComponent, NodeType } from '../Node'

describe('Component processor', () => {
    const parser = new Parser()

    it('should process simple NodeComponent', () => {
        const payload = [':: button', 'Hello-word', '::'].join('\n')

        const result = parser.toNodes(payload)
        const node = result[0] as NodeComponent

        const tokens = parser.toTokens(payload)

        const expected = new NodeComponent({
            type: NodeType.Component,
            name: 'button',
            body: 'Hello-word',
            tokens,
        })

        expect(result.length).toBe(1)

        expect(node.name).toBe(expected.name)
        expect(node.body).toBe(expected.body)
        expect(node.tokens).toEqual(expected.tokens)
    })

    it('should process NodeComponent with attrs', () => {
        const payload = [
            ':: button',
            '#class="btn"',
            "#style='color: red'",
            "#dataAttr='value'",
            'Hello-word',
            '::',
        ].join('\n')

        const result = parser.toNodes(payload)
        const node = result[0] as NodeComponent

        const tokens = parser.toTokens(payload)

        const expected = new NodeComponent({
            type: NodeType.Component,
            name: 'button',
            body: 'Hello-word',
            attrs: {
                class: 'btn',
                style: 'color: red',
                dataAttr: 'value',
            },
            tokens,
        })

        expect(result.length).toBe(1)

        expect(node.name).toBe(expected.name)
        expect(node.body).toBe(expected.body)
        expect(node.attrs).toEqual(expected.attrs)
        expect(node.tokens).toEqual(expected.tokens)
    })

    it('should process NodeComponent with props', () => {
        const payload = [
            ':: button',
            ':class="someVariable"',
            ':active="!!someVariable"',
            'Body of component',
            '::',
        ].join('\n')

        const result = parser.toNodes(payload)
        const node = result[0] as NodeComponent

        const tokens = parser.toTokens(payload)

        const expected = new NodeComponent({
            type: NodeType.Component,
            name: 'button',
            body: 'Body of component',
            attrs: {},
            props: {
                class: 'someVariable',
                active: '!!someVariable',
            },
            tokens,
        })

        expect(result.length).toBe(1)

        expect(node.name).toBe(expected.name)
        expect(node.body).toBe(expected.body)
        expect(node.attrs).toEqual(expected.attrs)
        expect(node.props).toEqual(expected.props)
        expect(node.tokens).toEqual(expected.tokens)
    })

    it('should not transform attrs & props after body is defined', () => {
        const payload = [
            ':: button',
            'Start of body content',
            '#class="btn"',
            ':someProp="123"',
            '::',
        ].join('\n')

        const result = parser.toNodes(payload)
        const node = result[0] as NodeComponent

        const tokens = parser.toTokens(payload)

        const expected = new NodeComponent({
            type: NodeType.Component,
            name: 'button',
            body: 'Start of body content\n#class="btn"\n:someProp="123"',
            attrs: {},
            tokens,
        })

        expect(result.length).toBe(1)

        expect(node.name).toBe(expected.name)
        expect(node.body).toBe(expected.body)
        expect(node.attrs).toEqual(expected.attrs)
        expect(node.tokens).toEqual(expected.tokens)
    })
})
