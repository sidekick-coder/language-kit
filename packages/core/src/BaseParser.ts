import { Lexer, Token, TokenArray, LexerTokenizeOptions } from '@language-kit/lexer'
import { BaseProcessor, BaseProcessorConstructor } from './BaseProcessor'
import { NodeArray } from './NodeArray'
import { BaseNode } from '.'

export type ProcessorNameOrConstructor = string | BaseProcessorConstructor

export interface ToNodeOptionProcessor {
    exclude?: ProcessorNameOrConstructor[]
    only?: ProcessorNameOrConstructor[]
}

export interface ToNodeOptions {
    processors?: ToNodeOptionProcessor
    lexer?: LexerTokenizeOptions
}

export class BaseParser<N extends BaseNode = BaseNode, T extends Token = Token> {
    // classes not instantiated that will be used to process tokens
    private processors = [] as BaseProcessorConstructor<BaseProcessor<N, T>>[]
    private lexer = new Lexer<T>()

    public setLexer(lexer: BaseParser<N, T>['lexer']) {
        this.lexer = lexer

        return this
    }

    public setProcessors(processors: BaseParser<N, T>['processors']) {
        this.processors = processors
        return this
    }

    public addProcessor(...processor: BaseParser<N, T>['processors']) {
        this.processors.push(...processor)
        return this
    }

    public toTokens(source: string, options?: LexerTokenizeOptions): TokenArray<T> {
        return this.lexer.tokenize(source, options)
    }

    public findAndInstantiateProcessors(options?: ToNodeOptionProcessor) {
        const onlyConstructors = [] as BaseProcessorConstructor[]
        const onlyNames = [] as string[]

        const excludeConstructors = [] as BaseProcessorConstructor[]
        const excludeNames = [] as string[]

        const result = [] as BaseProcessor<N, T>[]

        if (options?.only) {
            options.only
                .filter((o) => typeof o !== 'string')
                .forEach((c) => onlyConstructors.push(c as BaseProcessorConstructor))

            options.only
                .filter((o) => typeof o === 'string')
                .forEach((c) => onlyNames.push(c as string))
        }

        if (options?.exclude) {
            options.exclude
                .filter((o) => typeof o !== 'string')
                .forEach((c) => excludeConstructors.push(c as BaseProcessorConstructor))

            options.exclude
                .filter((o) => typeof o === 'string')
                .forEach((c) => excludeNames.push(c as string))
        }

        this.processors.forEach((c) => {
            const instance = new c()

            if (onlyConstructors.includes(c)) {
                return result.push(instance)
            }

            if (onlyNames.includes(instance.name)) {
                return result.push(instance)
            }

            if (onlyConstructors.length || onlyNames.length) return

            if (excludeConstructors.includes(c)) {
                return
            }

            if (excludeNames.includes(instance.name)) {
                return
            }

            result.push(instance)
        })

        result.sort((a, b) => a.order - b.order)

        return result
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
