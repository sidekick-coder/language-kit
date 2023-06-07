import { MarkdownNodeParagraph } from './MarkdownNodeParagraph'
import { MarkdownProcessor } from './MarkdownProcessor'

export class MarkdownProcessorParagraph extends MarkdownProcessor {
    public process() {
        const endLineIndex = this.findEndLineIndex()

        if (endLineIndex === -1) return

        const tokens = this.tokens.slice(0, endLineIndex + 1)

        const node = new MarkdownNodeParagraph()

        node.body = tokens.toText()
        node.tokens = tokens

        node.children = this.parser.toNodes(node.body, {
            excludeProcessors: [this.name],
            lexerOptions: {
                includeEndOfFileToken: false,
            },
        })

        this.nodes.push(node)

        this.tokens.splice(0, tokens.length)

        return true
    }
}
