export enum TokenType {
  Word = 'Word',
  Symbol = 'Symbol',
  Hashtag = 'Hashtag',
  WhiteSpace = 'WhiteSpace',
  BreakLine = 'BreakLine',
  EndOfFile = 'EndOfFile'
}

// TODO: add startIndex and endIndex
export default class Token {
  public type: TokenType
  public value: string

  constructor(props: Token) {
    this.type = props.type
    this.value = props.value
  }

  public static from(type: TokenType, value: string) {
    return new Token({ type, value })
  }

  public static fromSymbol(value: string) {
    return Token.from(TokenType.Symbol, value)
  }

  public static fromWord(value: string) {
    return Token.from(TokenType.Word, value)
  }

  public static fromWhiteSpace(value = ' ') {
    return Token.from(TokenType.WhiteSpace, value)
  }

  public static fromBreakLine() {
    return Token.from(TokenType.BreakLine, '\n')
  }

  public static fromEndOfFile() {
    return Token.from(TokenType.EndOfFile, '')
  }
}
