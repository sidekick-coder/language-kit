import { Token } from '@language-kit/lexer'
import { BaseNode } from './BaseNode'

export class NodeArray<N extends BaseNode = BaseNode> extends Array<N> {
    public setTokenPositions() {
        let start = 0

        this.forEach((node) => {
            let startNode = start

            node.tokens.forEach((token) => {
                if (token.type === Token.types.EndOfFile) {
                    token.start = -1
                    token.end = -1
                    return
                }

                token.start = startNode
                token.end = startNode + token.value.length - 1

                startNode = token.end + 1
            })

            start = startNode
        })
    }

    public setNodePositions() {
        this.forEach((node) => {
            const first = node.tokens[0]
            let last = node.tokens.at(-1)

            if (last?.type === Token.types.EndOfFile) {
                last = node.tokens.at(-2)
            }

            if (!first || !last) return

            node.start = first.start
            node.end = last.end
        })
    }

    public setPositions() {
        this.setTokenPositions()
        this.setNodePositions()
    }

    public toText() {
        return this.map((node) => node.toText()).join('')
    }
}
