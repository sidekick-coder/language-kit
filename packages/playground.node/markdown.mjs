import { Parser } from '@language-kit/markdown'


const parser = new Parser()


const text = [
    '# Hello, world!',
    '',
    'This is a paragraph.',
].join('\n')

const nodes = parser.toNodes(text)

console.log(JSON.stringify(nodes, null, 2))