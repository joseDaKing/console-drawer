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
        y: yStart
    } = start;

    const {
        y: yEnd 
    } = end;

    const height: number = (yStart - yEnd);

    const length: number = getLineLength(positions);

    const radians: number = Math.asin(height/length);

    const degrees: number = radians / Math.PI * 180;

    if (isNaN(degrees)) return 0;

    if (degrees < 0) return 360 - degrees;

    return degrees;
}

export default getLineRotation;