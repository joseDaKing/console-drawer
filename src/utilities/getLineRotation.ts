import { LinePosition } from "../geometry/primal/line";

import getLineLength from "./getLineLength";

/**
 * Gets the rotation based on 2 position on the line
 * 
 * @param positions Is array of start and end positions
 */
const getLineRotation = (positions: LinePosition): number => {

    const [start, end] = positions;

    const {
        y: yStart,
        x: xStart
    } = start;

    const {
        y: yEnd,
        x: xEnd
    } = end;

    const height: number = yEnd - yStart;

    const length: number = getLineLength(positions);

    const radians: number = Math.asin(height/length);

    let degrees: number = radians * 180 / Math.PI;
    
    if (xEnd < xStart) {
        degrees = 180 - degrees;
    }

    return degrees;
}

export default getLineRotation;