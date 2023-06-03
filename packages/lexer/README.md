# @language-kit/lexer (beta)

A package to convert strings to tokens.

## Install

```bash
npm install @language-kit/lexer
```

## Usage
```js
import { Lexer } from '@language-kit/lexer'

const lexer = new Lexer()

const tokens = lexer.tokenize('1 + 2')

// output
[
  Token { type: 'Word', value: '1' },
  Token { type: 'WhiteSpace', value: ' ' },
  Token { type: 'Symbol', value: '+' },
  Token { type: 'WhiteSpace', value: ' ' },
  Token { type: 'Word', value: '2' },
  Token { type: 'EndOfFile', value: '' }
]
```

## Support the development

Suggestions and issues are welcome

And for financial support you can check my: [Github sponsor link](https://github.com/sponsors/zzhenryquezz)