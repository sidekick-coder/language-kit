import { BaseNode } from '@language-kit/core'

export class BaseLineNode extends BaseNode {
    public type = 'BaseLine'

    public sharedMethod() {
        // code
    }

    public isFirstLine(): this is FirstLineNode {
        return this.type === 'FirstLine'
    }
}

export class FirstLineNode extends BaseLineNode {
    public type = 'FirstLine'

    public customMethodForFirstLineOnly() {
        // code
    }
}
