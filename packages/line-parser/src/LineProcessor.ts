import { BaseLineNode, FirstLineNode } from './LineNode'
import { BaseProcessor } from '@language-kit/core'

export class LineProcessor extends BaseProcessor<BaseLineNode> {
    public process() {
        // current token being processed
        const token = this.tokens[0]

        // search for the end of line token: token.type = "BreakLine"
        const endOfLineTokenIndex = this.tokens.findIndex((t) => t.type === 'BreakLine')

        // if not found, return false
        if (endOfLineTokenIndex === -1) return false

        // get all tokens until the end of line token
        const tokens = this.tokens.slice(this.tokens.indexOf(token), endOfLineTokenIndex + 1)

        let node = new BaseLineNode()

        if (this.nodes.length === 0) {
            node = new FirstLineNode()
        }

        node.tokens = tokens

        // add node instance to result nodes
        this.nodes.push(node)

        // remove tokens processed
        this.tokens.splice(0, tokens.length)

        // return true to indicate that the processor have processed some tokens and changed the state
        return true
    }
}
