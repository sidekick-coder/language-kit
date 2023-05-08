# @language-kit/markdown

This package convert strings to markdown nodes.

## Install

```bash
npm install @language-kit/markdown
```

## Usage
```js
import { Parser } from '@language-kit/markdown'

const parser = new Parser()

const text = ['# Heading', '', 'Paragraph.'].join('\n')

const nodes = parser.toNodes(text)

// output
[
  Node {
    type: 'heading',
    tokens: [
      Token { type: 'Symbol', value: '#' },
      Token { type: 'WhiteSpace', value: ' ' },
      Token { type: 'Word', value: 'Heading' },
      Token { type: 'BreakLine', value: '\n' }
    ]
  },
  Node {
    type: 'paragraph',
    tokens: [ Token { type: 'BreakLine', value: '\n' } ]
  },
  Node {
    type: 'paragraph',
    tokens: [
      Token { type: 'Word', value: 'Paragraph' },
      Token { type: 'Symbol', value: '.' },
      Token { type: 'EndOfFile', value: '' }
    ]
  }
]
```
