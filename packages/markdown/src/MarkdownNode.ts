import { BaseNode } from '@language-kit/core'
import { MarkdownNodeComponent } from './MarkdownNodeComponent'

export enum MarkdownNodeNodeType {
    Unknown = 'unknown',
    Paragraph = 'paragraph',
    Heading = 'heading',
    Component = 'component',
    Blockquote = 'blockquote',
    List = 'list',
}

export class MarkdownNode extends BaseNode {
    public type: MarkdownNodeNodeType = MarkdownNodeNodeType.Unknown

    public static types = MarkdownNodeNodeType

    public isComponent(): this is MarkdownNodeComponent {
        return this.type === MarkdownNodeNodeType.Component
    }
}
