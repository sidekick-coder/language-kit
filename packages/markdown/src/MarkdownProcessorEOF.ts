import { MarkdownProcessor } from './MarkdownProcessor'

export class MarkdownProcessorEOF extends MarkdownProcessor {
    public order = 99

    public process() {
        const current = this.tokens[0]

        if (current.type !== 'EndOfFile') return false

        this.tokens.splice(0, 1)

        return true
    }
}
