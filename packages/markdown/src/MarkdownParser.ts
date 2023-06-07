import { BaseParser, BaseProcessor, BaseProcessorConstructor } from '@language-kit/core'
import { MarkdownNode } from './MarkdownNode'
import { MarkdownProcessorParagraph } from './MarkdownProcessorParagraph'
import { MarkdownProcessorHeading } from './MarkdownProcessorHeading'
import { MarkdownProcessorComponent } from './MarkdownProcessorComponent'
import { MarkdownProcessor } from './MarkdownProcessor'

export const Processors: Record<string, BaseProcessorConstructor<MarkdownProcessor>> = {
    Paragraph: MarkdownProcessorParagraph,
    Heading: MarkdownProcessorHeading,
    Component: MarkdownProcessorComponent,
}

export class MarkdownParser extends BaseParser<MarkdownNode> {
    constructor(processors?: BaseProcessorConstructor<MarkdownProcessor>[]) {
        super()

        if (processors) {
            this.setProcessors(processors)
        }
    }
}
