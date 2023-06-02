import { BaseProcessor } from '@language-kit/core'
import { MarkdownNode } from './MarkdownNode'
import { Token } from '@language-kit/lexer'

export class MarkdownProcessor extends BaseProcessor<MarkdownNode> {
    public findIndexByType(type: string, start = 0) {
        return this.tokens.findIndex((token, i) => {
            if (i < start) return false

            return token.type === type
        })
    }

    public findIndexByValue(value: string, start = 0, end?: number) {
        for (let i = 0; i < this.tokens.length; i++) {
            if (i < start) continue

            if (end && i > end) break

            const current = this.tokens[i]

            if (current.value === value) return i
        }

        return -1
    }

    public findFirstIndexByType(...args: string[]) {
        for (const type of args) {
            const index = this.findIndexByType(type)

            if (index !== -1) return index
        }

        return -1
    }

    public findFirstIndexByValue(...values: string[]) {
        return values.reduce((prev, value) => {
            if (prev !== -1) return prev

            return this.findIndexByValue(value)
        }, -1)
    }

    public findEndLineIndex() {
        return this.findFirstIndexByType(Token.types.BreakLine, Token.types.EndOfFile)
    }
}
