import { Lexer, Token, TokenArray, LexerTokenizeOptions } from '@language-kit/lexer'
import { BaseNode } from './BaseNode'
import { BaseProcessor } from './BaseProcessor'
import { NodeArray } from './NodeArray'

interface ToNodeOptions {
    excludeProcessors?: string[]
    lexerOptions?: LexerTokenizeOptions
}

export class BaseParser<N extends BaseNode = BaseNode, T extends Token = Token> {
    public timeout = 500

    constructor(public processors: BaseProcessor<N, T>[] = [], public lexer = new Lexer<T>()) {}

    public addProcessor(processor: BaseProcessor<N, T>) {
        this.processors.push(processor)
    }

    public toTokens(source: string, options?: LexerTokenizeOptions): TokenArray<T> {
        return this.lexer.tokenize(source, options)
    }

    public onUnhandledToken(_token: Token) {
        // handle unhandled token
    }

    public toNodes(source: string, options?: ToNodeOptions) {
        this.processors.sort((a, b) => a.order - b.order)

        let tokens = this.toTokens(source, options?.lexerOptions)
        let nodes = new NodeArray<N>()

        const now = Date.now()

        while (tokens.length) {
            const result = this.processors.find((processor) => {
                if (options?.excludeProcessors?.includes(processor.name)) return false

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

            if (Date.now() - now > this.timeout) {
                throw new Error('Timeout on parsing string')
            }

            if (result) continue

            this.onUnhandledToken(tokens[0])

            tokens.shift()
        }

        nodes.setPositions()

        return nodes
    }
}
