import { MarkdownNode, MarkdownNodeType } from './MarkdownNode'

export class MarkdownNodeComponent extends MarkdownNode {
    public readonly type = MarkdownNodeType.Component
    public name = 'unknown'
    public body = ''
    public attrs: Record<string, string> = {}
    public isInlined = false
}
