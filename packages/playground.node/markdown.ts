import { MarkdownParser, Processors, MarkdownProcessor, MarkdownNode } from '@language-kit/markdown'

class CustomProcessor extends MarkdownProcessor {
    public order = 1
    public process() {
        // code

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

first // MarkdownNode { type: 'HelloNode', tokens: [ 'Hello Word\n' ] }
second // MarkdownNode { type: 'Paragraph', tokens: [ 'Normal paragraph\n' ] }
