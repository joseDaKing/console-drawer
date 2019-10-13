import getLineWidth from "./getLineWidth";

import getLineHeight from "./getLineHeight";

import { LinePosition } from "../geometry/primal/line";

/**
 * Get the line length based on 2 positions of the line
 * 
 * @param positions Is array of start and end positions
 */
const getLineLength = (positions: LinePosition): number => {
    
    const width: number = getLineWidth(positions);

    const height: number = getLineHeight(positions);

    const length: number = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

    return length;
}

export default getLineLength;