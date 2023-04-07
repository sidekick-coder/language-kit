import { describe, it, expect } from 'vitest'

import { Token } from '@language-kit/lexer'

import { Parser } from './Parser'
import { Node, NodeType } from './Node'
import { useFixturesFiles } from './tests/helpers'
import { MarkdownToken, MarkdownTokenType } from './MarkdownToken'

describe('markdown parser', () => {
    const parser = new Parser()

    const files = useFixturesFiles()

    it('shoud transform markdown text in node heading', () => {
        const payload = '# Hello world'

        const nodes = parser.toNodes(payload)

        const mdNode = new Node()

        mdNode.type = NodeType.Heading

        mdNode.tokens = [
            Token.symbol('#'),
            Token.whiteSpace(' '),
            Token.word('Hello'),
            Token.whiteSpace(' '),
            Token.word('world'),
            Token.endOfFile(),
        ]

        expect(nodes).toEqual([mdNode])
    })

    it('shoud transform markdown text in node paragraph', () => {
        const payload = ['Paragraph 1', '', 'Paragraph 2'].join('\n')

        const nodes = parser.toNodes(payload)

        const exepected = [
            new Node({
                type: NodeType.Paragraph,
                tokens: [
                    Token.word('Paragraph'),
                    Token.whiteSpace(' '),
                    Token.word('1'),
                    Token.breakLine(),
                ],
            }),
            new Node({
                type: NodeType.Paragraph,
                tokens: [Token.breakLine()],
            }),
            new Node({
                type: NodeType.Paragraph,
                tokens: [
                    Token.word('Paragraph'),
                    Token.whiteSpace(' '),
                    Token.word('2'),
                    Token.endOfFile(),
                ],
            }),
        ]

        expect(nodes).toEqual(exepected)
    })

    it('shoud transform markdown text in component node', () => {
        const payload = [':: v-btn', '', '    #label=Hello-word'].join('\n')

        const nodes = parser.toNodes(payload)

        const exepected = new Node({
            type: NodeType.Component,
        })

        exepected.tokens = [
            Token.symbol(':'),
            Token.symbol(':'),
            Token.whiteSpace(' '),
            Token.word('v'),
            Token.symbol('-'),
            Token.word('btn'),
            Token.breakLine(),
            Token.breakLine(),
            Token.whiteSpace('    '),
            Token.symbol('#'),
            Token.word('label'),
            Token.symbol('='),
            Token.word('Hello'),
            Token.symbol('-'),
            Token.word('word'),
            Token.endOfFile(),
        ]

        expect(nodes).toEqual([exepected])
    })

    it('should transform tokens to markdown tokens', () => {
        const payload = 'This is a **bold text** \n\n'

        const tokens = parser.toTokens(payload)

        const markdownTokens = parser.toMarkdownTokens(tokens)

        const exepected = [
            MarkdownToken.word('This'),
            MarkdownToken.whiteSpace(' '),
            MarkdownToken.word('is'),
            MarkdownToken.whiteSpace(' '),
            MarkdownToken.word('a'),
            MarkdownToken.whiteSpace(' '),
            MarkdownToken.from({
                type: MarkdownTokenType.BoldText,
                value: '**bold text**',
                data: {
                    text: 'bold text',
                },
            }),
            MarkdownToken.whiteSpace(' '),
            MarkdownToken.breakLine(),
            MarkdownToken.breakLine(),
            MarkdownToken.endOfFile(),
        ]

        expect(markdownTokens).toEqual(exepected)
    })

    it.each(files)('should fixutre $name be converted from nodes to text', (file) => {
        const nodes = parser.toNodes(file.content)

        expect(parser.toText(nodes)).toBe(file.content)
    })
})
