import { TokenType } from '@language-kit/lexer'

export enum MarkdownTokenType {
    BoldText = 'BoldText',
}

export class MarkdownToken {
    public type: MarkdownTokenType | TokenType
    public value: string
    public data: any = {}

    constructor(props: Partial<MarkdownToken> = {}) {
        Object.assign(this, props)
    }

    public static from(props: Partial<MarkdownToken>) {
        return new MarkdownToken(props)
    }

    public static symbol(value: string) {
        return new MarkdownToken({
            type: TokenType.Symbol,
            value,
        })
    }

    public static word(value: string) {
        return new MarkdownToken({
            type: TokenType.Word,
            value,
        })
    }

    public static whiteSpace(value: string) {
        return new MarkdownToken({
            type: TokenType.WhiteSpace,
            value,
        })
    }

    public static breakLine() {
        return new MarkdownToken({
            type: TokenType.BreakLine,
            value: '\n',
        })
    }

    public static endOfFile() {
        return new MarkdownToken({
            type: TokenType.EndOfFile,
            value: '',
        })
    }
}
