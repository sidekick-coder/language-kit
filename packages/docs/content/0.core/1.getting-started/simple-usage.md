# Simple usage

Our goal will be making a simple language that convert the text to a [LineNode\[\]](/core/classes/BaseNode) array

That are simple objects that tell us the content of each line of the text.

To do that we will need to define 3 classes for our language Nodes, Processors and a Parser

## 1 - Defining language a nodes

Is recommended to have an base node with shared methods, and sub nodes with specific methods

Tokens are simple javascript objects that represents the text.

You can know more about they in [Lexer](https://www.npmjs.com/package/@language-kit/lexer)

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

## 2 - Define Processor

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
## 3 - Define parser

Finally we can create an parser with the created classes.

```ts
import { BaseParser } from '@language-kit/core'
import { BaseLineNode } from './LineNode'
import { LineProcessor } from './LineProcessor'

export class LineParser extends BaseParser<BaseLineNode> {
    public processors = [LineProcessor]
}

```

## 4 - Use the Parse

Now we can parse any string and have an the output desired

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