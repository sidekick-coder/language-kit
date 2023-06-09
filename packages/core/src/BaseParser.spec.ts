import { describe, it, expect, vi } from 'vitest'
import { BaseParser } from './BaseParser'
import { BaseProcessor } from './BaseProcessor'

describe('BaseParser', () => {
    function createProcessor(name: string) {
        const spy = vi.fn()
        return class extends BaseProcessor {
            constructor() {
                super()

                this.name = name
                this.process = spy
            }

            public static spy = spy
        }
    }

    it('should exclude processors of options', () => {
        const parser = new BaseParser()

        const a = createProcessor('nameA')
        const b = createProcessor('nameB')
        const c = createProcessor('nameC')

        parser.addProcessor(a, b, c)

        parser.toNodes('Hello word', {
            processors: {
                exclude: [a, 'nameC'],
            },
        })

        expect(a.spy).not.toHaveBeenCalled()
        expect(c.spy).not.toHaveBeenCalled()
        expect(b.spy).toHaveBeenCalled()
    })

    it('should use only processors defined in options', () => {
        const parser = new BaseParser()

        const a = createProcessor('nameA')
        const b = createProcessor('nameB')
        const c = createProcessor('nameC')

        parser.addProcessor(a, b, c)

        parser.toNodes('Hello word', {
            processors: {
                only: [a, 'nameC'],
            },
        })

        expect(a.spy).toHaveBeenCalled()
        expect(c.spy).toHaveBeenCalled()
        expect(b.spy).not.toHaveBeenCalled()
    })
})
