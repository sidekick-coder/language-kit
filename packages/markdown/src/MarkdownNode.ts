import { BaseNode } from '@language-kit/core'
import { MarkdownNodeComponent } from './MarkdownNodeComponent'
import { MarkdownNodeText } from './MarkdownNodeText'
import { MarkdownNodeTextBold } from './MarkdownNodeTextBold'
import { MarkdownNodeParagraph } from './MarkdownNodeParagraph'
import { MarkdownNodeHeading } from './MarkdownNodeHeading'
import { MarkdownNodeTextWithAttrs } from './MarkdownNodeTextWithAttrs'

export enum MarkdownNodeNodeType {
    Unknown = 'unknown',
    Paragraph = 'paragraph',
    Heading = 'heading',
    Component = 'component',
    TextBold = 'text-bold',
    TextWithAttrs = 'text-with-attrs',
    Text = 'text',
}

interface MarkdownNodeInstances {
    [MarkdownNodeNodeType.Unknown]: MarkdownNode
    [MarkdownNodeNodeType.Paragraph]: MarkdownNodeParagraph
    [MarkdownNodeNodeType.Heading]: MarkdownNodeHeading
    [MarkdownNodeNodeType.Component]: MarkdownNodeComponent
    [MarkdownNodeNodeType.Text]: MarkdownNodeText
    [MarkdownNodeNodeType.TextBold]: MarkdownNodeTextBold
    [MarkdownNodeNodeType.TextWithAttrs]: MarkdownNodeTextWithAttrs
    // all other types are MarkdownNode
    [key: string]: MarkdownNode
}

export class MarkdownNode extends BaseNode {
    public type: string = MarkdownNodeNodeType.Unknown

    public static types = MarkdownNodeNodeType

    public is<K extends keyof MarkdownNodeInstances>(type: K): this is MarkdownNodeInstances[K] {
        return this.type === type
    }

    public toHtml() {
        return ''
    }
}
