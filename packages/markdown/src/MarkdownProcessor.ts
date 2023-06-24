import { BaseProcessor } from '@language-kit/core'
import { MarkdownNode } from './MarkdownNode'
import { Token } from '@language-kit/lexer'
import { MarkdownParser } from '.'

export class MarkdownProcessor extends BaseProcessor {
    public order = 10

    public declare parser: MarkdownParser

    public findIndexByType(type: string, start = 0, end?: number) {
        for (let i = 0; i < this.tokens.length; i++) {
            if (i < start) continue

            if (end && i > end) break

            const current = this.tokens[i]

            if (current.type === type) return i
        }

        return -1
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

    /**
     * Transform strings into attributes object.
     * @param tokens
     * @returns Record<string, string>
     * @example
     * { id="btn" } => { id: 'btn' }
     * { color="red" } => { color: 'red' }
     * { :data-count="count" } => { id: 'btn', color: 'red' }
     * { @click="handle()"` } => { ':data-count': 'count', '@click': 'handle()' }
     */

    public transformStringToAttrsObject(text: string): Record<string, string> {
        const textWithoutBrackets = text.slice(1, -1)
        const result: Record<string, string> = {}

        /**
         * Get the key and value of the attribute.
         * @example
         * `id="btn"` => { key: 'id', value: 'btn' }
         * `:data-count="count"` => { key: ':data-count', value: 'count' }
         * `color="red"` => { key: 'color', value: 'red' }
         * `@click="handle()"` => { key: '@click', value: 'handle()' }
         */
        const regex = /(?<key>[^=]+)="(?<value>[^"]+)"/g

        Array.from(textWithoutBrackets.matchAll(regex)).forEach((match) => {
            const key = match.groups?.key
            const value = match.groups?.value

            if (!key || !value) return

            result[key.trim()] = value
        })

        return result
    }

    public addNode(node: MarkdownNode) {
        this.nodes.push(node)
        this.tokens.splice(0, node.tokens.length)
    }
}
