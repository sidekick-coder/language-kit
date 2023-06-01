import { BaseParser } from '@language-kit/core'
import { BaseLineNode } from './LineNode'
import { LineProcessor } from './LineProcessor'

export class LineParser extends BaseParser<BaseLineNode> {
    public processors = [new LineProcessor()]
}
