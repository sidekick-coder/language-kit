import { Token, TokenArray } from '@language-kit/lexer'
import { MarkdownNodeComponent } from './MarkdownNodeComponent'
import { MarkdownProcessor } from './MarkdownProcessor'

export class MarkdownProcessorComponent extends MarkdownProcessor {
    public order = 10

    /**
     * The length of the wrapper pattern.
     * @example
     * 2 for the start `::`
     * 2 for the end `::`
     */
    public wrapperPatternLength = 2

    public findEndComponentIndex() {
        return this.tokens.findIndex((t, i) => {
            if (i <= 2) return false

            const prev = this.tokens[i - 1]

            if (!prev) return false

            return [prev.value, t.value].every((value) => value === ':')
        })
    }

    public findNameTokens() {
        const lineEndIndex = this.findEndLineIndex()

        if (lineEndIndex === -1) {
            return new TokenArray()
        }

        let endIndex = this.findIndexByValue('{', 2, lineEndIndex)

        if (endIndex === -1) {
            endIndex = lineEndIndex
        }

        return this.tokens.slice(2, endIndex)
    }

    public findAttrsTokens() {
        const lineEndIndex = this.findEndLineIndex()

        if (lineEndIndex === -1) return new TokenArray()

        const startIndex = this.findIndexByValue('{', 2, lineEndIndex)

        if (startIndex === -1) return new TokenArray()

        const endIndex = this.findIndexByValue('}', startIndex)

        if (endIndex === -1) return new TokenArray()

        return this.tokens.slice(startIndex, endIndex + 1)
    }

    public findAttrsObject(): MarkdownNodeComponent['attrs'] {
        const tokens = this.findAttrsTokens().slice(1, -1)

        const result: MarkdownNodeComponent['attrs'] = {}

        /**
         * Get the key and value of the attribute.
         * @example
         * `id="btn"` => { key: 'id', value: 'btn' }
         * `:data-count="count"` => { key: ':data-count', value: 'count' }
         * `color="red"` => { key: 'color', value: 'red' }
         * `@click="handle()"` => { key: '@click', value: 'handle()' }
         */
        const regex = /(?<key>[^=]+)="(?<value>[^"]+)"/g

        Array.from(tokens.toText().matchAll(regex)).forEach((match) => {
            const key = match.groups?.key
            const value = match.groups?.value

            if (!key || !value) return

            result[key.trim()] = value
        })

        return result
    }

    public findBodyTokens() {
        const nameTokens = this.findNameTokens()
        const attrsTokens = this.findAttrsTokens()

        const endComponentIndex = this.findEndComponentIndex()

        if (endComponentIndex === -1) {
            return new TokenArray()
        }

        let startBodyIndex = this.wrapperPatternLength

        startBodyIndex += nameTokens.length
        startBodyIndex += attrsTokens.length

        const endBodyIndex = endComponentIndex - this.wrapperPatternLength

        return this.tokens.slice(startBodyIndex, endBodyIndex)
    }

    public process() {
        const isComponent = this.tokens
            .slice(0, this.wrapperPatternLength)
            .every((t) => t.value === ':')

        if (!isComponent) return false

        const endLineIndex = this.findEndComponentIndex()

        if (endLineIndex === -1) return false

        const tokens = this.tokens.slice(0, endLineIndex + 1)

        const node = new MarkdownNodeComponent()

        node.tokens = tokens

        node.body = this.findBodyTokens().toText().trim()
        node.name = this.findNameTokens().toText().trim()
        node.attrs = this.findAttrsObject()

        this.nodes.push(node)

        this.tokens.splice(0, tokens.length)

        return true
    }
}
