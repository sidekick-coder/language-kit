import { Parser } from '@language-kit/markdown'

import utils from 'util'

const parser = new Parser()

const text = ['# Heading', '', 'Paragraph.'].join('\n')

const nodes = parser.toNodes(text)

console.log(utils.inspect(nodes, { depth: null }))
