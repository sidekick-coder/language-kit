import { Token, TokenArray } from '@language-kit/lexer'

export class BaseNode<T extends Token = Token> {
    public start = 0
    public end = 0
    public type = ''
    public tokens: TokenArray<T> = new TokenArray()

    public toText() {
        return this.tokens.map((t) => t.value).join('')
    }
}
