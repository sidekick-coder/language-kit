import { MarkdownNodeBreakLine } from './MarkdownNodeBreakLine'
import { MarkdownProcessor } from './MarkdownProcessor'

export class MarkdownProcessorBreakLine extends MarkdownProcessor {
    public order = 10

    public isBreakLine() {
        const current = this.tokens[0]

        return current.value === '\n'
    }

    public process() {
        if (!this.isBreakLine()) return false

        const tokens = this.tokens.slice(0, 1)

        const node = new MarkdownNodeBreakLine()

        node.tokens = tokens

        this.addNode(node)

        return true
    }
}
