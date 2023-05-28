import { TokenType } from '@language-kit/lexer'
import { NodeComponent, NodeType } from '../Node'
import { BaseProcessor } from '../BaseProcessor'

export default class ComponentProcessor extends BaseProcessor {
    public order = 10

    public findEndIndex() {
        return this.tokens.findIndex((current, i) => {
            if (i <= 1) return false

            const prev = this.tokens[i - 1]

            if (!prev) return false

            return [prev, current].every((t) => t.value === ':')
        })
    }

    public findName() {
        const start = 2
        const end = this.tokens.findIndex((t, i) => {
            if (i <= start) return false

            if (t.type === TokenType.BreakLine) return true

            return t.type === TokenType.WhiteSpace
        })

        if (end === -1) return ''

        return this.tokens
            .slice(start, end)
            .map((t) => t.value)
            .join('')
            .trim()
    }

    public findAttrs() {
        const attrs: NodeComponent['attrs'] = {}

        const lines = this.findLines()

        for (const line of lines) {
            if (line[0]?.value !== '#') break

            const endKeyIndex = line.findIndex((t) => t.value === '=')
            const endValueIndex = line.findIndex((t) => t.type === TokenType.BreakLine)

            const name = line
                .slice(1, endKeyIndex)
                .map((t) => t.value)
                .join('')

            const value = line
                .slice(endKeyIndex + 2, endValueIndex)
                .map((t) => t.value)
                .join('')

            attrs[name] = value ?? 'true'
        }

        return attrs
    }

    public findProps() {
        const props: NodeComponent['props'] = {}

        const lines = this.findLines()

        for (const line of lines) {
            if (line[0]?.value !== ':') break

            const endKeyIndex = line.findIndex((t) => t.value === '=')
            const endValueIndex = line.findIndex((t) => t.type === TokenType.BreakLine)

            const name = line
                .slice(1, endKeyIndex)
                .map((t) => t.value)
                .join('')

            const value = line
                .slice(endKeyIndex + 2, endValueIndex)
                .map((t) => t.value)
                .join('')

            props[name] = value ?? 'true'
        }

        return props
    }

    public findEvents() {
        const events: NodeComponent['events'] = {}

        const lines = this.findLines()

        for (const line of lines) {
            if (line[0]?.value !== '@') break

            const endKeyIndex = line.findIndex((t) => t.value === '=')
            const endValueIndex = line.findIndex((t) => t.type === TokenType.BreakLine)

            const name = line
                .slice(1, endKeyIndex)
                .map((t) => t.value)
                .join('')

            const value = line
                .slice(endKeyIndex + 2, endValueIndex)
                .map((t) => t.value)
                .join('')

            events[name] = value
        }

        return events
    }

    public findBody() {
        const start = this.tokens.findIndex((t) => t.type === TokenType.BreakLine)
        const end = this.findEndIndex()

        if ([start, end].includes(-1)) return ''

        const lines = this.tokensToLines(this.tokens.slice(start, end - 1))
        const firstLine = lines[0]

        const patterns = ['#', ':', '@']

        let body = ''
        let haveAttr = firstLine && patterns.includes(firstLine[0]?.value)

        for (const line of lines) {
            const [first] = line

            if (haveAttr && !patterns.includes(first?.value)) {
                haveAttr = false
            }

            if (haveAttr && patterns.includes(first?.value)) {
                continue
            }

            body += line.map((t) => t.value).join('') + '\n'
        }

        body = body.trim()

        return body
    }

    public process: BaseProcessor['process'] = () => {
        const [first, second] = this.tokens

        if (first.value !== ':' || second.value !== ':') return false

        const endIndex = this.findEndIndex()

        if (endIndex === -1) return false

        const tokens = this.tokens.slice(0, endIndex + 1)

        const node = new NodeComponent({
            name: this.findName(),
            body: this.findBody(),
            attrs: this.findAttrs(),
            props: this.findProps(),
            events: this.findEvents(),
            tokens,
        })

        this.addNode(node)

        this.removeTokens(0, endIndex + 1)

        return true
    }
}
