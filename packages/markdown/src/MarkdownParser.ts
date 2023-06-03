import { BaseParser, BaseProcessor } from '@language-kit/core'
import { MarkdownNode } from './MarkdownNode'
import { MarkdownProcessorParagraph } from './MarkdownProcessorParagraph'
import { MarkdownProcessorHeading } from './MarkdownProcessorHeading'
import { MarkdownProcessorComponent } from './MarkdownProcessorComponent'
import { MarkdownProcessor } from './MarkdownProcessor'

export const Processors: Record<string, MarkdownProcessor> = {
    Paragraph: new MarkdownProcessorParagraph(),
    Heading: new MarkdownProcessorHeading(),
    Component: new MarkdownProcessorComponent(),
}

export class MarkdownParser extends BaseParser<MarkdownNode> {
    constructor(processors?: BaseProcessor<MarkdownNode>[]) {
        super(processors || Object.values(Processors))
    }
}
