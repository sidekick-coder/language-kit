import { MarkdownNode, MarkdownNodeNodeType } from './MarkdownNode'

export class MarkdownNodeHeading extends MarkdownNode {
    public readonly type = MarkdownNodeNodeType.Heading
}
