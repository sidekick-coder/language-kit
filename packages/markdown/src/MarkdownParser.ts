import { BaseParser, BaseProcessorConstructor, ToNodeOptions } from '@language-kit/core'
import { MarkdownNode } from './MarkdownNode'
import { MarkdownProcessorParagraph } from './MarkdownProcessorParagraph'
import { MarkdownProcessorHeading } from './MarkdownProcessorHeading'
import { MarkdownNodeArray } from './MarkdownNodeArray'
import { MarkdownProcessorText } from './MarkdownProcessorText'
import { MarkdownProcessorTextBold } from './MarkdownProcessorTextBold'
import { MarkdownProcessorTextWithAttrs } from './MarkdownProcessorTextWithAttrs'
import { MarkdownProcessorBreakLine } from './MarkdownProcessorBreakLine'
import { Token } from '@language-kit/lexer'
import { MarkdownProcessorEOF } from './MarkdownProcessorEOF'

export const Processors: Record<string, BaseProcessorConstructor> = {
    Paragraph: MarkdownProcessorParagraph,
    Heading: MarkdownProcessorHeading,
    Text: MarkdownProcessorText,
    TextBold: MarkdownProcessorTextBold,
    TextWithAttrs: MarkdownProcessorTextWithAttrs,
    BreakLine: MarkdownProcessorBreakLine,
    EOF: MarkdownProcessorEOF,
}

export class MarkdownParser extends BaseParser<MarkdownNode> {
    constructor(processors?: BaseProcessorConstructor[]) {
        super()

        this.setProcessors(processors || Object.values(Processors))
    }

    public toNodes(payload: string, options?: ToNodeOptions) {
        const nodes = super.toNodes(payload, options)

        return new MarkdownNodeArray(...nodes)
    }

    public onUnhandledToken(token: Token) {
        console.error('Unhandled token:', token)
    }
}
