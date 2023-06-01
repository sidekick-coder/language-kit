import { describe, it, expect } from 'vitest'
import { LineParser } from './LineParser'

describe('LineParser', () => {
    const parser = new LineParser()

    it('should be converted text to node lies', () => {
        const payload = ['this is a line one', 'this is a line two', 'this is a line three'].join(
            '\n'
        )

        const nodes = parser.toNodes(payload)

        // console.log(nodes)

        expect(nodes.length).toBe(3)
    })
})
