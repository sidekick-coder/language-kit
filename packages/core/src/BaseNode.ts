import { Token, TokenArray } from '@language-kit/lexer'

export class BaseNode<T extends Token = Token> {
    // start of the node inside the text
    public start = 0

    // end of the node inside the text
    public end = 0

    // type of the node
    public type = 'Unknown'

    // array of tokens that compose the node
    public tokens: TokenArray<T> = new TokenArray()

    /**
     * Convert the node into a text
     * @returns the text of the node
     * @example
     * const node = new BaseNode()
     * node.tokens = TokenArray([
     *      { type: 'Word', value: 'Hello' },
     *      { type: 'BreakLine', value: '\n' },
     *      { type: 'Word', value: 'World' },
     * ])
     * node.toText() // result: "Hello\nWorld"
     */
    public toText() {
        return this.tokens.map((t) => t.value).join('')
    }
}
