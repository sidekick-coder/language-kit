import { Token, TokenType } from './Token'

export default class TokenArray<T extends Token> extends Array<T> {
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
}
