import { LineParser } from './LineParser'

const parser = new LineParser()

const payload = ['Hello', '', 'This is a paragraph'].join('\n')

const [firstLine, normalLine] = parser.toNodes(payload) // result [FirstLineNode, BaseLineNode]

normalLine.sharedMethod()

if (firstLine.isFirstLine()) {
    firstLine.customMethodForFirstLineOnly()
}
