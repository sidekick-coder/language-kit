import BreakLineProcessor from "./processors/break-line";
import SymbolProcessor from "./processors/symbol";
import WhiteSpaceProcessor from "./processors/white-space";
import WordProcessor from "./processors/word";

export const breakLineProcessor = new BreakLineProcessor()
export const symbolProcessor = new SymbolProcessor()
export const whiteSpaceProcessor = new WhiteSpaceProcessor()
export const wordProcessor = new WordProcessor()

export const allProcessors = [
    breakLineProcessor,
    symbolProcessor,
    whiteSpaceProcessor,
    wordProcessor
]