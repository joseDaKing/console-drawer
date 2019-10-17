import createRectangel from "./createRectangle";
import { Position, COLOR_TYPES } from "../types";
import { Polygon } from "./primal";

type CreateSquareOptions = {
    size: number,
    position: Position,
    shape: string,
    color: COLOR_TYPES
}

/**
 * A function that returns a polygon that represent square
 * 
 * @param options The options for the square
 * @category Primal geometry
 */
const createSquare = (options: CreateSquareOptions): Polygon => {
    
    const {
        size,
        position,
        shape,
        color
    } = options;

    const square: Polygon = createRectangel({
        size: {
            height: size,
            width: size
        },
        position,
        shape,
        color
    });

    return square;
}

export default createSquare;