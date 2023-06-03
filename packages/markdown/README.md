# Language-kit markdown (beta)

## Overview

This package convert strings to markdown nodes.

> Alert: child nodes not supported yet!

## Table of contents

- [Installation](#install)
- [Simple usage](#simple-usage)
- [Advanced usage](#advance-usage)
- [Support the project](#support-the-development)
- [Classes & interfaces](#classes--interfaces)
  - [MarkdownNodeHeading](#markdownnodeheading)
  - [MarkdownNodeParagraph](#markdownnodeparagraph)
  - [MarkdownNodeComponent](#markdownnodecomponent)
## Install

```bash
npm install @language-kit/markdown
```

## Simple Usage

```js
import { MarkdownParser } from '@language-kit/markdown'

const parser = new MarkdownParser()

const text = ['Hello dio', '', 'Hello Jonathan'].join('\n')

const nodes = parser.toNodes(text)

// output
[
  {
    start: 0,
    end: 9,
    type: 'paragraph',
    tokens: [
      { type: 'Word', value: 'Hello', start: 0, end: 4 },
      { type: 'WhiteSpace', value: ' ', start: 5, end: 5 },
      { type: 'Word', value: 'dio', start: 6, end: 8 },
      { type: 'BreakLine', value: '\n', start: 9, end: 9 }
    ]
  },
  {
    start: 10,
    end: 10,
    type: 'paragraph',
    tokens: [ { type: 'BreakLine', value: '\n', start: 10, end: 10 } ]
  },
  {
    start: 11,
    end: 24,
    type: 'paragraph',
    tokens: [
      { type: 'Word', value: 'Hello', start: 11, end: 15 },
      { type: 'WhiteSpace', value: ' ', start: 16, end: 16 },
      { type: 'Word', value: 'Jonathan', start: 17, end: 24 },
      { type: 'EndOfFile', value: '', start: 25, end: 24 }
    ]
  }
]
```

## Advance usage

You can make your own processors and use together with the default processors to customize the output nodes

Check [core package](../core/README.md) to know more details about processors

```ts
import { MarkdownParser, Processors, MarkdownProcessor, MarkdownNode } from '@language-kit/markdown'

class CustomProcessor extends MarkdownProcessor {
    public order = 1
    public process() {
        const tokens = this.tokens.slice(0, 4)

        if (tokens.toText() === 'Hello Word\n') {
            const node = new MarkdownNode()

            node.type = 'HelloNode'
            node.tokens = tokens

            this.nodes.push(node)
            this.tokens.splice(0, tokens.length)

            return true
        }

        return false
    }
}

const MyProcessors = [Processors.Paragraph, new CustomProcessor()]

const parser = new MarkdownParser(MyProcessors)

const payload = ['Hello Word', 'Normal paragraph'].join('\n')

const [first, second] = parser.toNodes(payload)

first // MarkdownNode { type: 'HelloNode', tokens: [ ... ] }
second // MarkdownNode { type: 'Paragraph', tokens: [ ... ] }

```
## Support the development

Suggestions and issues are welcome

And for financial support you can check my: [Github sponsor link](https://github.com/sponsors/zzhenryquezz)

## Classes & Interfaces

You can check a list of available types in [MarkdownNode.ts](./src/MarkdownNode.ts) file
### MarkdownNodeHeading

[Reference](./src/MarkdownNodeHeading.ts)

Convert heading elements

Input
```md
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
```
Output
```c#
[MarkdownNodeHeading]
[MarkdownNodeHeading]
[MarkdownNodeHeading]
[MarkdownNodeHeading]
```

### MarkdownNodeParagraph

[Reference](./src/MarkdownNodeParagraph.ts)

This node is simple text

Keep in mind that isolated break lines are also treated as a paragraph.

This is to make the charts count always be the same as the text.

Input
```md
Hello friend
The next line is an empty line

The previous line is an empty line
```
Output
```c#
[MarkdownNodeParagraph]
[MarkdownNodeParagraph]
[MarkdownNodeParagraph]
[MarkdownNodeParagraph]
```

### MarkdownNodeComponent

[Reference](./src/MarkdownNodeComponent.ts)

This is an component representation with a **body** and **attributes** propertiese

An important note to keep in mind is that components can be used as inline text.

So the next break line will be converted in paragraphs in most of cases.

This can make you a little confused about how to render theses nodes, but the recommendation for this cases is ignore every empty paragraph.

And when the user wanna show a break line he have to add a **whitespace**

To know more the reason about that check [MarkdownNodeParagraph](#markdownnodeparagraph) description


Input
```md
:: button Hello word ::

:: button
  Hello word
::

:: button {color="red"} Hello word ::

:: button {color="red"}
  Hello word
::

:: button {
    color="red"
  }

  Hello word
::
```
Output
```c#
[MarkdownNodeComponent]
[MarkdownNodeParagraph]
[MarkdownNodeParagraph]

[MarkdownNodeComponent]
[MarkdownNodeParagraph]
[MarkdownNodeParagraph]

[MarkdownNodeComponent]
[MarkdownNodeParagraph]
[MarkdownNodeParagraph]

[MarkdownNodeComponent]
[MarkdownNodeParagraph]
[MarkdownNodeParagraph]

[MarkdownNodeComponent]
[MarkdownNodeParagraph]
[MarkdownNodeParagraph]
```

