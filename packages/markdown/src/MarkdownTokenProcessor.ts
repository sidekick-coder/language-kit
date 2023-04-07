import { Token, TokenType } from '@language-kit/lexer'
import { Node } from './Node'
import { MarkdownToken } from './MarkdownToken'

export class MarkdownTokenProcessor {
  public name = 'MarkdownPreProcessor'
  public order = 90
  public tokens: Token[] = []
  public markdownTokens: MarkdownToken[] = []

  constructor() {
    this.name = this.constructor.name
  }

  public removeToken(index: number) {
    this.tokens.splice(index, 1)
  }

  public removeTokens(start: number, end: number) {
    this.tokens.splice(start, end)
  }

  public findEndLineTokenIndex() {
    return this.tokens.findIndex(
      (t) => t.type === TokenType.BreakLine || t.type === TokenType.EndOfFile
    )
  }

  /**
   * Process the tokens
   * Used to convert tokens to markdown tokens
   * Tip: Normally the first token is the beginning of line
   * @returns true if the processor has processed the tokens
   */

  public process(): boolean {
    return false
  }
}
