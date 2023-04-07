import { TokenType } from '@language-kit/lexer'
import { NodeType } from '../Node'
import { BaseProcessor } from '../BaseProcessor'

export default class ParagraphProcessor extends BaseProcessor {
  public order = 90

  public process: BaseProcessor['process'] = () => {
    const endIndex = this.tokens.findIndex(
      (t) => t.type === TokenType.BreakLine || t.type === TokenType.EndOfFile
    )

    if (endIndex === -1) return false

    const allTokens = this.tokens.slice(0, endIndex + 1)

    this.addNode({ type: NodeType.Paragraph, tokens: allTokens })

    this.removeTokens(0, allTokens.length)

    return true
  }
}
