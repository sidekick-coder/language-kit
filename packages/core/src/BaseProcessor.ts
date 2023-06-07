import { Token, TokenArray } from '@language-kit/lexer'
import { BaseNode } from './BaseNode'
import { BaseParser } from './BaseParser'
import { NodeArray } from './NodeArray'

export interface BaseProcessorConstructor<T extends BaseProcessor = BaseProcessor> {
    new (): T
}

export class BaseProcessor<N extends BaseNode = BaseNode, T extends Token = Token> {
    public name: string

    public parser: BaseParser<N, T>
    public tokens = new TokenArray<T>()
    public nodes = new NodeArray<N>()

    public order = 999

    constructor() {
        if (!this.name) {
            this.name = this.constructor.name || 'BaseProcessor'
        }
    }

    public process(): boolean {
        return false
    }
}
