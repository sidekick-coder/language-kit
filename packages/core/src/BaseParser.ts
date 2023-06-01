import { Lexer, Token, TokenArray } from '@language-kit/lexer'
import { BaseNode } from './BaseNode'
import { BaseProcessor } from './BaseProcessor'
import { NodeArray } from './NodeArray'

interface ToNodeOptions {
    onUnhandledToken?: (token: Token) => void
    timeout?: number
}

export class BaseParser<N extends BaseNode = BaseNode, T extends Token = Token> {
    constructor(public processors: BaseProcessor<N, T>[] = [], public lexer = new Lexer<T>()) {}

    public addProcessor(processor: BaseProcessor<N, T>) {
        this.processors.push(processor)
    }

    public toTokens(source: string): TokenArray<T> {
        return this.lexer.tokenize(source)
    }

    public toNodes(source: string, options?: ToNodeOptions) {
        let tokens = this.toTokens(source)
        let nodes = new NodeArray<N>()
        const timeout = options?.timeout ?? 500

        const now = Date.now()

        while (tokens.length) {
            const result = this.processors.find((processor) => {
                processor.tokens = tokens
                processor.parser = this
                processor.nodes = nodes

                const isProcessed = processor.process()

                if (isProcessed) {
                    tokens = processor.tokens
                    nodes = processor.nodes
                }

                return isProcessed
            })

            if (Date.now() - now > timeout) {
                throw new Error('Timeout on parsing string')
            }

            if (result) continue

            if (options?.onUnhandledToken) {
                options.onUnhandledToken(tokens[0])
            }

            tokens.shift()
        }

        return nodes
    }
}
