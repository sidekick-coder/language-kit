export enum TokenType {
  Word = 'Word',
  Symbol = 'Symbol',
  Hashtag = 'Hashtag',
  WhiteSpace = 'WhiteSpace',
  BreakLine = 'BreakLine',
  EndOfFile = 'EndOfFile'
}

// TODO: add startIndex and endIndex
export class Token {
  public type: TokenType
  public value: string

  constructor(props: Token) {
    this.type = props.type
    this.value = props.value
  }

  public static from(type: TokenType, value: string) {
    return new Token({ type, value })
  }

  public static symbol(value: string) {
    return Token.from(TokenType.Symbol, value)
  }

  public static word(value: string) {
    return Token.from(TokenType.Word, value)
  }

  public static whiteSpace(value = ' ') {
    return Token.from(TokenType.WhiteSpace, value)
  }

  public static breakLine() {
    return Token.from(TokenType.BreakLine, '\n')
  }

  public static endOfFile() {
    return Token.from(TokenType.EndOfFile, '')
  }
}
