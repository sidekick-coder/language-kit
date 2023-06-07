import { MarkdownNode, MarkdownNodeNodeType } from './MarkdownNode'

export class MarkdownNodeComponent extends MarkdownNode {
    public readonly type = MarkdownNodeNodeType.Component
    public name = 'unknown'
    public body = ''
    public attrs: Record<string, string> = {}
    public isInlined = false
}
