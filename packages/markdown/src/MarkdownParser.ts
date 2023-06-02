import { BaseParser, BaseProcessor } from '@language-kit/core'
import { MarkdownNode } from './MarkdownNode'
import { MarkdownProcessorParagraph } from './MarkdownProcessorParagraph'
import { MarkdownProcessorHeading } from './MarkdownProcessorHeading'

export const Processors = {
    Paragraph: new MarkdownProcessorParagraph(),
    Heading: new MarkdownProcessorHeading(),
}

export class MarkdownParser extends BaseParser<MarkdownNode> {
    constructor(processors?: BaseProcessor<MarkdownNode>[]) {
        super(processors || Object.values(Processors))
    }
}
