import { BaseNode } from '@language-kit/core'
import { MarkdownNodeComponent } from './MarkdownNodeComponent'
import { MarkdownNodeText } from './MarkdownNodeText'
import { MarkdownNodeTextBold } from './MarkdownNodeTextBold'
import { MarkdownNodeParagraph } from './MarkdownNodeParagraph'
import { MarkdownNodeHeading } from './MarkdownNodeHeading'

export enum MarkdownNodeNodeType {
    Unknown = 'unknown',
    Paragraph = 'paragraph',
    Heading = 'heading',
    Component = 'component',
    TextBold = 'text-bold',
    Text = 'text',
}

interface Teste {
    [MarkdownNodeNodeType.Unknown]: MarkdownNode
    [MarkdownNodeNodeType.Paragraph]: MarkdownNodeParagraph
    [MarkdownNodeNodeType.Heading]: MarkdownNodeHeading
    [MarkdownNodeNodeType.Component]: MarkdownNodeComponent
    [MarkdownNodeNodeType.Text]: MarkdownNodeText
    [MarkdownNodeNodeType.TextBold]: MarkdownNodeTextBold
    // all other types are MarkdownNode
    [key: string]: MarkdownNode
}

export class MarkdownNode extends BaseNode {
    public type: string = MarkdownNodeNodeType.Unknown

    public static types = MarkdownNodeNodeType

    public is<K extends keyof Teste>(type: K): this is Teste[K] {
        return this.type === type
    }
}
