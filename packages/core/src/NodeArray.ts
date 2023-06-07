import { Token } from '@language-kit/lexer'
import { BaseNode } from './BaseNode'

export class NodeArray<N extends BaseNode = BaseNode> extends Array<N> {
    public setPositions(start = 0) {
        let position = start

        this.forEach((node) => {
            node.tokens.setPositions(position)
            const last = node.tokens.at(-1)

            if (last?.type === Token.types.EndOfFile) {
                return
            }

            position = last ? last.end + 1 : position
        })

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

    public toText() {
        return this.map((node) => node.toText()).join('')
    }
}
