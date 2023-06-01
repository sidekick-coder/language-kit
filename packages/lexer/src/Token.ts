export enum TokenType {
    Word = 'Word',
    Symbol = 'Symbol',
    Hashtag = 'Hashtag',
    WhiteSpace = 'WhiteSpace',
    BreakLine = 'BreakLine',
    EndOfFile = 'EndOfFile',
}

// TODO: add startIndex and endIndex
export class Token {
    public type: string
    public value: string
    public start = 0
    public end = 0

    public static types = TokenType

    public static from<T extends Token>(this: new (args: T) => T, type: string, value: string) {
        const token = new this({} as T)

        token.type = type
        token.value = value

        return token
    }

    public static symbol<T extends Token>(this: new (args: T) => T, value: string) {
        const token = new this({} as T)

        token.type = TokenType.Symbol
        token.value = value

        return token
    }

    public static word<T extends Token>(this: new (args: T) => T, value: string) {
        const token = new this({} as T)

        token.type = TokenType.Word
        token.value = value

        return token
    }

    public static whiteSpace<T extends Token>(this: new (args: T) => T, value = ' ') {
        const token = new this({} as T)

        token.type = TokenType.WhiteSpace
        token.value = value

        return token
    }

    public static breakLine<T extends Token>(this: new (args: T) => T, value = '\n') {
        const token = new this({} as T)

        token.type = TokenType.BreakLine
        token.value = value

        return token
    }

    public static endOfFile<T extends Token>(this: new (args: T) => T) {
        const token = new this({} as T)

        token.type = TokenType.EndOfFile
        token.value = ''

        return token
    }
}
