import ComponentProcessor from './processors/Component'
import HeadingProcessor from './processors/Heading'
import ParagraphProcessor from './processors/Paragraph'

export const componentProcessor = new ComponentProcessor()
export const headingProcessor = new HeadingProcessor()
export const paragraphProcessor = new ParagraphProcessor()

export const allProcessors = [componentProcessor, headingProcessor, paragraphProcessor]

