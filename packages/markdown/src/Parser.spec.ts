import { describe, it, expect } from 'vitest'

import { Token } from '@language-kit/lexer'

import { Parser } from './Parser'
import { Node, NodeType } from './Node'
import { useFixturesFiles } from './tests/helpers'

describe('markdown parser', () => {
  const parser = new Parser()

  const files = useFixturesFiles()

  it('shoud transform markdown text in node heading', () => {
    const payload = '# Hello world'

    const nodes = parser.toNodes(payload)

    const mdNode = new Node()

    mdNode.type = NodeType.Heading

    mdNode.tokens = [
      Token.fromSymbol('#'),
      Token.fromWhiteSpace(' '),
      Token.fromWord('Hello'),
      Token.fromWhiteSpace(' '),
      Token.fromWord('world'),
      Token.fromEndOfFile()
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
          Token.fromWord('Paragraph'),
          Token.fromWhiteSpace(' '),
          Token.fromWord('1'),
          Token.fromBreakLine()
        ]
      }),
      new Node({
        type: NodeType.Paragraph,
        tokens: [Token.fromBreakLine()]
      }),
      new Node({
        type: NodeType.Paragraph,
        tokens: [
          Token.fromWord('Paragraph'),
          Token.fromWhiteSpace(' '),
          Token.fromWord('2'),
          Token.fromEndOfFile()
        ]
      })
    ]

    expect(nodes).toEqual(exepected)
  })

  it('shoud transform markdown text in component node', () => {
    const payload = [':: v-btn', '', '    #label=Hello-word'].join('\n')

    const nodes = parser.toNodes(payload)

    const exepected = new Node({
      type: NodeType.Component
    })

    exepected.tokens = [
      Token.fromSymbol(':'),
      Token.fromSymbol(':'),
      Token.fromWhiteSpace(' '),
      Token.fromWord('v'),
      Token.fromSymbol('-'),
      Token.fromWord('btn'),
      Token.fromBreakLine(),
      Token.fromBreakLine(),
      Token.fromWhiteSpace('    '),
      Token.fromSymbol('#'),
      Token.fromWord('label'),
      Token.fromSymbol('='),
      Token.fromWord('Hello'),
      Token.fromSymbol('-'),
      Token.fromWord('word'),
      Token.fromEndOfFile()
    ]

    expect(nodes).toEqual([exepected])
  })

  it.each(files)('should fixutre $name be converted from nodes to text', (file) => {
    const nodes = parser.toNodes(file.content)

    // expect(parser.toText(nodes)).toBe(file.content)
  })
})
