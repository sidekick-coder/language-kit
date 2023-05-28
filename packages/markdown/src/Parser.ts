import { Lexer, Token } from '@language-kit/lexer'
import type { Node } from './Node'
import type { BaseProcessor } from './BaseProcessor'

// normal processors
import HeadingProcessor from './processors/Heading'
import ParagraphProcessor from './processors/Paragraph'
import ComponentProcessor from './processors/Component'

// markdown token processors
import MarkdownTokenProcessorBold from './markdown-token-processors/Bold'
import { MarkdownTokenProcessor } from './MarkdownTokenProcessor'
import { MarkdownToken } from './MarkdownToken'
import MarkdownTokenProcessorITalic from './markdown-token-processors/Italic'
import MarkdownTokenProcessorITalicAndBold from './markdown-token-processors/ItalicAndBold'
import BlockquoteProcessor from './processors/Blockquote'
import ListProcessor from './processors/List'
import EofProcessor from './processors/Eof'

export class Parser {
    private lexer = new Lexer()
    private processors: BaseProcessor[] = [
        new HeadingProcessor(),
        new ListProcessor(),
        new ParagraphProcessor(),
        new ComponentProcessor(),
        new BlockquoteProcessor(),
        new EofProcessor(),
    ]

    private markdowTokenProcessors: MarkdownTokenProcessor[] = [
        new MarkdownTokenProcessorBold(),
        new MarkdownTokenProcessorITalic(),
        new MarkdownTokenProcessorITalicAndBold(),
    ]

    constructor() {
        this.processors.sort((a, b) => a.order - b.order)
        this.markdowTokenProcessors.sort((a, b) => a.order - b.order)
    }

    public toNodes(value: string) {
        let tokens = this.lexer.tokenize(value)
        let nodes: Node[] = []

        while (tokens.length) {
            const result = this.processors.find((p) => {
                p.tokens = tokens
                p.nodes = nodes

                const test = p.process()

                tokens = p.tokens
                nodes = p.nodes

                return test
            })

            if (result) continue

            console.debug('[@language-kit/markdown] unhandled token', tokens[0])

            tokens.shift()
        }

        return nodes
    }

    public toMarkdownTokens(payload: Token[]) {
        let markdownTokens: MarkdownToken[] = []
        let tokens = payload.slice()

        while (tokens.length) {
            const result = this.markdowTokenProcessors.find((p) => {
                p.tokens = tokens
                p.markdownTokens = markdownTokens

                const test = p.process()

                tokens = p.tokens
                markdownTokens = p.markdownTokens

                return test
            })

            if (result) continue

            markdownTokens.push(MarkdownToken.from(tokens[0]))

            tokens.shift()
        }

        return markdownTokens
    }

    public toTokens(value: string): Token[] {
        return this.lexer.tokenize(value)
    }

    public toText(nodes: Node[]) {
        return nodes.map((node) => node.toText()).join('')
    }
}
