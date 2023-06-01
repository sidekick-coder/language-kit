import { describe, it, expect } from 'vitest'
import { BaseParser } from './BaseParser'
import { BaseProcessor } from './BaseProcessor'

describe('BaseParser', () => {
    it('should throw an error after timeout of 100', () => {
        const processor = new BaseProcessor()

        processor.process = () => true

        const parser = new BaseParser()

        parser.addProcessor(processor)

        expect(() => parser.toNodes('Hello word', { timeout: 100 })).toThrowError(
            'Timeout on parsing string'
        )
    })
})
