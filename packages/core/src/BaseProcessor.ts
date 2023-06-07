import { Token, TokenArray } from '@language-kit/lexer'
import { BaseNode } from './BaseNode'
import { BaseParser } from './BaseParser'
import { NodeArray } from './NodeArray'

export class BaseProcessor<N extends BaseNode = BaseNode, T extends Token = Token> {
    public name = 'BaseProcessor'

    public parser: BaseParser<N, T>
    public tokens = new TokenArray<T>()
    public nodes = new NodeArray<N>()

    public order = 999

    constructor() {
        this.name = this.constructor.name
    }

    public process(): boolean {
        return false
    }
}
