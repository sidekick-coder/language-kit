import { Lexer, Token, allProcessors } from '@language-kit/lexer'

const lexer = new Lexer()

const tokens = lexer.tokenize('1 + 2')

console.debug(tokens)

console.debug(allProcessors)

console.debug(Token.symbol('@'))
