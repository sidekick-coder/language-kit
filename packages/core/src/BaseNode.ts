import { Token, TokenArray } from '@language-kit/lexer'

export class BaseNode<T extends Token = Token> {
    public start = 0
    public end = 0
    public tokens: TokenArray<T> = new TokenArray()
}
