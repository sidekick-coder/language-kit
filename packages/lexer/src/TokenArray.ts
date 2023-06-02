import { Token, TokenType } from './Token'

export class TokenArray<T extends Token = Token> extends Array<T> {
    public setPositions() {
        let position = 0

        this.forEach((token) => {
            if (token.type === TokenType.EndOfFile) {
                token.start = -1
                token.end = -1
                return
            }

            token.start = position
            position += token.value.length
            token.end = position - 1
        })
    }

    public slice(start?: number, end?: number) {
        return new TokenArray(...super.slice(start, end))
    }

    public filter<S extends T>(
        predicate: (value: T, index: number, array: T[]) => value is S,
        thisArg?: any
    ): TokenArray<S>
    public filter(
        predicate: (value: T, index: number, array: T[]) => unknown,
        thisArg?: any
    ): TokenArray<T>
    public filter(predicate: unknown, thisArg?: unknown): TokenArray<T> {
        return new TokenArray(...super.filter(predicate as any, thisArg))
    }

    /**
     * Make a loop over the tokens and return the value joined.
     * @returns string
     * @example
     * const tokens = new TokenArray(
     *      new Token(TokenType.Text, 'Hello'),
     *      new Token(TokenType.Text, ' '),
     *      new Token(TokenType.Text, 'world'),
     * )     *
     * tokens.toText() // Hello world
     */

    public toText() {
        return this.map((t) => t.value).join('')
    }
}
