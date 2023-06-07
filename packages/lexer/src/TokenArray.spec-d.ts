import { describe, it, expectTypeOf } from 'vitest'
import { Token } from '.'
import { TokenArray } from './TokenArray'

describe('TokenArray.d.ts', () => {
    const methods = ['setPositions'] as const

    it('should slice() return an instance of TokenArray', () => {
        const tokens = new TokenArray()

        tokens.push(...[Token.word('Hello'), Token.whiteSpace(), Token.word('word')])

        const result = tokens.slice(0, 1)

        methods.forEach((method) => {
            expectTypeOf(result).toEqualTypeOf<InstanceType<typeof TokenArray>>()

            expectTypeOf(result[method]).toBeFunction()
        })
    })

    it('should map() return an instance of TokenArray', () => {
        const tokens = new TokenArray()

        tokens.push(...[Token.word('Hello'), Token.whiteSpace(), Token.word('word')])

        const result = tokens.map((t) => t)

        expectTypeOf(result).toEqualTypeOf<InstanceType<typeof Array<Token>>>()
    })

    it('should filter() return an instance of TokenArray', () => {
        const tokens = new TokenArray()

        tokens.push(...[Token.word('Hello'), Token.whiteSpace(), Token.word('word')])

        const result = tokens.filter((t) => t)

        expectTypeOf(result).toEqualTypeOf<InstanceType<typeof TokenArray>>()
    })
})
