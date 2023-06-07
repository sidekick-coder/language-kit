import { BaseNode } from './BaseNode'

export class NodeArray<N extends BaseNode = BaseNode> extends Array<N> {
    public setPositions(start = 0) {
        let position = start

        this.forEach((node) => {
            position = node.setPositions(position).end + 1
        })
    }

    public toText() {
        return this.map((node) => node.toText()).join('')
    }
}
