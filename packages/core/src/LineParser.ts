/**
 * This is an example of how to create a new parser.
 */
import { BaseNode } from './BaseNode'
import { Token } from '@language-kit/lexer'
import { BaseParser } from './BaseParser'
import { BaseProcessor } from './BaseProcessor'

/**
 * This the token that the language will have, normally is a representation of letter, number, symbol
 * check @language-kit/lexer for more information
 */
export class LineToken extends Token {
    public isLineToken = true
}

/**
 * This a node, that will be a representation of a group of tokens
 */

export class LineNode extends BaseNode<LineToken> {}

/**
 * This a instance of a processor
 * It responsible to convert tokens into nodes
 */

export class LineProcessor extends BaseProcessor<LineNode, LineToken> {
    public process() {
        // current token being processed in this case will always be the beginning of the line
        const token = this.tokens[0]

        // search for the end of line token: token.type = "BreakLine"
        const endOfLineTokenIndex = this.tokens.findIndex((t) =>
            ([LineToken.types.BreakLine, LineToken.types.EndOfFile] as string[]).includes(t.type)
        )

        // if not found, return false
        if (endOfLineTokenIndex === -1) return false

        // get all tokens until the end of line token
        const tokens = this.tokens.slice(this.tokens.indexOf(token), endOfLineTokenIndex + 1)

        // initialize a new node
        const node = new LineNode()

        node.tokens = tokens

        // add node instance to result nodes
        this.nodes.push(node)

        // remove tokens processed
        this.tokens.splice(0, tokens.length)

        // return true to indicate that the processor have processed some tokens and changed the state
        return true
    }
}

export class LineParser extends BaseParser<LineNode, LineToken> {
    public processors = [new LineProcessor()]
}
