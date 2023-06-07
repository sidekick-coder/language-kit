import { Lexer, Token, TokenArray, LexerTokenizeOptions } from '@language-kit/lexer'
import { BaseNode } from './BaseNode'
import { BaseProcessor, BaseProcessorConstructor } from './BaseProcessor'
import { NodeArray } from './NodeArray'

type ProcessorNameOrConstructor = string | BaseProcessorConstructor<BaseProcessor>

interface ToNodeOptionProcessor {
    exclude?: ProcessorNameOrConstructor[]
}

interface ToNodeOptions {
    processors?: ToNodeOptionProcessor
    lexer?: LexerTokenizeOptions
}

export class BaseParser<N extends BaseNode = BaseNode, T extends Token = Token> {
    // classes not instantiated that will be used to process tokens
    private processors = [] as BaseProcessorConstructor<BaseProcessor<N, T>>[]
    private lexer = new Lexer<T>()

    public setLexer(lexer: Lexer<T>) {
        this.lexer = lexer

        return this
    }

    public setProcessors(processors: BaseProcessorConstructor<BaseProcessor<N, T>>[]) {
        this.processors = processors
        return this
    }

    public addProcessor(...processor: BaseProcessorConstructor<BaseProcessor<N, T>>[]) {
        this.processors.push(...processor)
        return this
    }

    public toTokens(source: string, options?: LexerTokenizeOptions): TokenArray<T> {
        return this.lexer.tokenize(source, options)
    }

    public findAndInstantiateProcessors(options?: ToNodeOptionProcessor) {
        const names = (options?.exclude || []).filter((e) => typeof e === 'string') as string[]
        const constructors = (options?.exclude || []).filter(
            (e) => typeof e !== 'string'
        ) as BaseProcessorConstructor<BaseProcessor>[]

        return this.processors
            .filter((p) => !constructors.includes(p))
            .map((p) => new p())
            .filter((p) => !names.includes(p.name))
    }

    /**
     * This is to external implementation
     * @param _token
     */

    public onUnhandledToken(_token: Token) {
        // handle unhandled token
    }

    public toNodes(source: string, options?: ToNodeOptions) {
        const processors = this.findAndInstantiateProcessors(options?.processors)

        processors.sort((a, b) => a.order - b.order)

        let tokens = this.toTokens(source, options?.lexer)
        let nodes = new NodeArray<N>()

        while (tokens.length) {
            const result = processors.find((processor) => {
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

            if (result) continue

            this.onUnhandledToken(tokens[0])

            tokens.shift()
        }

        nodes.setPositions()

        return nodes
    }
}
