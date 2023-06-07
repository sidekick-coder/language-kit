import { BaseParser, BaseProcessorConstructor, ToNodeOptions } from '@language-kit/core'
import { MarkdownNode } from './MarkdownNode'
import { MarkdownProcessorParagraph } from './MarkdownProcessorParagraph'
import { MarkdownProcessorHeading } from './MarkdownProcessorHeading'
import { MarkdownProcessorComponent } from './MarkdownProcessorComponent'
import { MarkdownProcessor } from './MarkdownProcessor'
import { MarkdownNodeArray } from './MarkdownNodeArray'
import { MarkdownProcessorText } from './MarkdownProcessorText'
import { MarkdownProcessorTextBold } from './MarkdownProcessorTextBold'
import { MarkdownProcessorTextWithAttrs } from './MarkdownProcessorTextWithAttrs'

export const Processors: Record<string, BaseProcessorConstructor<MarkdownProcessor>> = {
    Paragraph: MarkdownProcessorParagraph,
    Heading: MarkdownProcessorHeading,
    Component: MarkdownProcessorComponent,
    Text: MarkdownProcessorText,
    TextBold: MarkdownProcessorTextBold,
    TextWithAttrs: MarkdownProcessorTextWithAttrs,
}

export class MarkdownParser extends BaseParser<MarkdownNode> {
    constructor(processors?: BaseProcessorConstructor<MarkdownProcessor>[]) {
        super()

        this.setProcessors(processors || Object.values(Processors))
    }

    public toNodes(payload: string, options?: ToNodeOptions) {
        const nodes = super.toNodes(payload, options)

        return new MarkdownNodeArray(...nodes)
    }
}
