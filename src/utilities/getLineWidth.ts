import {LinePosition} from "../types";

/**
 * Gets the width of the line based on 2 positions on the line
 * @category UtilitieS
 * @param positions Is array of start and end positions
 */
const getLineWidth = (positions: LinePosition): number => {
    
    const [start, end] = positions;

    const {
        x: xStart
    } = start;

    const {
        x: xEnd
    } = end;

    const width: number = Math.abs(xEnd - xStart);

    return width;
};

export default getLineWidth;