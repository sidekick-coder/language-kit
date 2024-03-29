import { BaseNode } from '@language-kit/core'
import { MarkdownNodeComponent } from './MarkdownNodeComponent'
import { MarkdownNodeText } from './MarkdownNodeText'
import { MarkdownNodeTextBold } from './MarkdownNodeTextBold'
import { MarkdownNodeParagraph } from './MarkdownNodeParagraph'
import { MarkdownNodeHeading } from './MarkdownNodeHeading'
import { MarkdownNodeTextWithAttrs } from './MarkdownNodeTextWithAttrs'

export enum MarkdownNodeType {
    Unknown = 'Unknown',
    Paragraph = 'Paragraph',
    Heading = 'Heading',
    Component = 'Component',
    TextBold = 'TextBold',
    TextWithAttrs = 'TextWithAttrs',
    Text = 'Text',
    BreakLine = 'BreakLine',
}

export type MarkdownNodeTypeName = keyof typeof MarkdownNodeType

interface InstancesTypesByEnum {
    [MarkdownNodeType.Unknown]: MarkdownNode
    [MarkdownNodeType.Paragraph]: MarkdownNodeParagraph
    [MarkdownNodeType.Heading]: MarkdownNodeHeading
    [MarkdownNodeType.Component]: MarkdownNodeComponent
    [MarkdownNodeType.Text]: MarkdownNodeText
    [MarkdownNodeType.TextBold]: MarkdownNodeTextBold
    [MarkdownNodeType.TextWithAttrs]: MarkdownNodeTextWithAttrs
    [key: string]: MarkdownNode
}

export class MarkdownNode extends BaseNode {
    // type of node
    public type: string = MarkdownNodeType.Unknown

    // default node types
    public static types = MarkdownNodeType

    // meta data
    public meta: any = {}

    public is<K extends MarkdownNodeType>(type: K): this is InstancesTypesByEnum[K]
    public is<K extends MarkdownNodeTypeName>(type: K): this is InstancesTypesByEnum[K]
    public is<T>(type: string): this is T
    public is(type: string): this is MarkdownNode
    public is(type: string) {
        return this.type === type
    }

    public toHtml() {
        return ''
    }
}
