import {LinePosition} from "../geometry/primal/line";


/**
 * Get line height based on 2 positions of the line
 * 
 * @param positions Is array of start and end positions
 */
const getLineHeight = (positions: LinePosition): number => {
    
    const [start, end] = positions;

    const {
        y: yStart
    } = start;

    const {
        y: yEnd
    } = end;

    const height: number = Math.abs(yEnd - yStart);
    
    return height;
};

export default getLineHeight;