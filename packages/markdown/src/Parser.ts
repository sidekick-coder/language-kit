import { Lexer, Token } from '@language-kit/lexer'
import type { Node } from './Node'
import type { BaseProcessor } from './BaseProcessor'
import { allProcessors } from './Processors'

export class Parser {
  private lexer = new Lexer()
  private processors: BaseProcessor[] = allProcessors

  public toNodes(value: string) {
    let tokens = this.lexer.tokenize(value)
    let nodes: Node[] = []

    this.processors.sort((a, b) => a.order - b.order)

    while (tokens.length) {
      const result = this.processors.find((p) => {
        p.tokens = tokens
        p.nodes = nodes

        const test = p.process()

        tokens = p.tokens
        nodes = p.nodes

        return test
      })

      if (result) continue

      console.log('[md-parser] unhandled token', tokens[0])

      tokens.shift()
    }

    return nodes
  }

  public toTokens(value: string): Token[] {
    return this.lexer.tokenize(value)
  }

  public toText(nodes: Node[]) {
    return nodes.map((node) => node.toText()).join('')
  }
}
