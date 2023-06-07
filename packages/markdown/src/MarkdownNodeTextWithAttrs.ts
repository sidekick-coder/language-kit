import { NodeArray } from '@language-kit/core'
import { MarkdownNode, MarkdownNodeNodeType } from './MarkdownNode'

export class MarkdownNodeTextWithAttrs extends MarkdownNode {
    public readonly type = MarkdownNodeNodeType.TextWithAttrs
    public body = ''
    public children = new NodeArray<MarkdownNode>()
    public attrs: Record<string, string> = {}
}
