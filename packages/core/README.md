# Language-kit core

This package is a set of base classes to create language parsers.

## Install

```bash
npm install @language-kit/core
```

## Usage

The goal of the lib is convert strings to an array of nodes.

For this we need to define 3 entities: Nodes, Processors and a Parser

### 1 - Define a nodes

First define nodes that the your language will have.

> Is recommended to have an base node with shared methods, and sub nodes with specific methods

```ts
// LineNode.ts
import { BaseNode } from '@language-kit/core'

export class BaseLineNode extends BaseNode {
    public type = 'BaseLine'

    public sharedMethod() {
        // code
    }

    public isFirstLine(): this is FirstLineNode {
        return this.type === 'FirstLine'
    }
}

export class FirstLineNode extends BaseLineNode {
    public type = 'FirstLine'

    public customMethodForFirstLineOnly() {
        // code
    }
}
```

### 2 - Define Processor

Next we have to create an processor to convert tokens to this nodes

```ts
// LineProcessor.ts
import { BaseLineNode, FirstLineNode } from './line-node'
import { BaseProcessor } from '@language-kit/core'

export class LineProcessor extends BaseProcessor<BaseLineNode> {
    public process() {
        // current token being processed
        const token = this.tokens[0]

        // search for the end of line token: token.type = "BreakLine"
        const endOfLineTokenIndex = this.tokens.findIndex((t) => t.type === 'BreakLine')

        // if not found, return false
        if (endOfLineTokenIndex === -1) return false

        // get all tokens until the end of line token
        const tokens = this.tokens.slice(this.tokens.indexOf(token), endOfLineTokenIndex + 1)

        let node = new BaseLineNode()

        if (this.nodes.length === 0) {
            node = new FirstLineNode()
        }

        node.tokens = tokens

        // add node instance to result nodes
        this.nodes.push(node)

        // remove tokens processed
        this.tokens.splice(0, tokens.length)

        // return true to indicate that the processor have processed some tokens and changed the state
        return true
    }
}

```
### 3 - Define parser

Finally we can create an parser with the created classes

```ts
import { BaseParser } from '@language-kit/core'
import { BaseLineNode } from './LineNode'
import { LineProcessor } from './LineProcessor'

export class LineParser extends BaseParser<BaseLineNode> {
    public processors = [new LineProcessor()]
}

```

### 4 - Parser string

Now we can parse any string and have an array of nodes representing the string

```ts
// Sample.ts
import { LineParser } from './LineParser'

const parser = new LineParser()

const payload = ['Hello', '', 'This is a paragraph'].join('\n')

const [firstLine, normalLine] = parser.toNodes(payload) // result [FirstLineNode, BaseLineNode]

normalLine.sharedMethod()

if (firstLine.isFirstLine()) {
    firstLine.customMethodForFirstLineOnly()
}

```

## Documentation

### Nodes

Nodes are a representation of a group of tokens

For example you can have a node for a whole line of the text, or for each tag html inside a text.

The node of the language will always depend on the output you want

> **Tip:** When defining Nodes is highly recommended have well defined **start** and an **end** patterns, this is to avoid problems and be more easy to implement your processor

All custom nodes will be an instance of [BaseNode.ts](./src/BaseNode.ts), you can check the source file the know the methods and helpers that are available

Examples markdown

```md

## Heading <!-- MarkdownHeadingNode -->

**Heading** <!-- MarkdownTextBoldNode -->

<div>Content</div> <!-- MarkdownHTMLNode -->
```

Examples javascript
```js
// JSVariableNode
const count = 0 

// JSFunctionNode
function hello(){
    //
}

// JSClassNode
class Awesome {

}
```

### NodesArray

This is an class that extends the normal Array of Javascript.

It have some extra helper methods like ```toText()``` method that convert a whole array nodes into text.

And ``setPositions``` that update all nodes start and end positions

You can check another methods and more about in the [NodesArray.ts](./src/NodeArray.ts) file

