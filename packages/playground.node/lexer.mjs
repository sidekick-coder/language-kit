import { Lexer, Token, allProcessors } from '@language-kit/lexer'

const lexer = new Lexer()

const tokens = lexer.tokenize('1 + 2')

console.log(tokens)

console.log(allProcessors)

console.log(Token.fromSymbol('@'))