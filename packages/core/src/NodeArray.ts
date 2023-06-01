import { BaseNode } from './BaseNode'

export class NodeArray<N extends BaseNode = BaseNode> extends Array<N> {
    public setPositions() {
        this.forEach((node, index) => {
            const firstToken = node.tokens[0]
            const lastToken = node.tokens.at(-1)

            if (!firstToken || !lastToken) return

            node.start = firstToken.start
            node.end = lastToken.end
        })
    }
}
