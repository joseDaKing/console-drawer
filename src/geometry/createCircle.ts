import createElipse from "./createElipse";
import { Polygon } from ".";
import { Position, COLOR_TYPES } from "../types";


type CrateCircleOptions = {
    color: COLOR_TYPES,
    shape: string,
    position: Position
    size: number
}

/**
 * A function that returns a polygon that represent circle
 * 
 * @param options The options for the circle
 * 
 * @category Secondary geometry
 */
const createCircle = (options: CrateCircleOptions): Polygon => {
    
    const { size } = options;

    const circle: Polygon = createElipse({
        ...options,
        rotation: 0,
        size: {
            height: size,
            width: size
        }
    });

    return circle
}

export default createCircle;