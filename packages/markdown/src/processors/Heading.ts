import { TokenType } from '@language-kit/lexer'
import { NodeType } from '../Node'
import { BaseProcessor } from '../BaseProcessor'

export default class HeadingProcessor extends BaseProcessor {
  public order = 10

  public process: BaseProcessor['process'] = () => {
    if (this.tokens[0].value !== '#') return false

    const level = this.tokens.findIndex((t) => t.value !== '#')

    if (this.tokens[level].type !== TokenType.WhiteSpace) return false

    const endIndex = this.findEndLineTokenIndex()

    if (endIndex === -1) return false

    const allTokens = this.tokens.slice(0, endIndex + 1)

    this.addNode({ type: NodeType.Heading, tokens: allTokens })

    this.removeTokens(0, endIndex + 1)

    return true
  }
}
