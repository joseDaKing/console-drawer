import createRegulerPolygon from "./createRegularPolygon";
import { Size, Position, COLOR_TYPES } from "../types";
import { Polygon } from "./primal";


type CreateElipseOptions = {
    size: Size,
    rotation: number,
    position: Position,
    shape: string,
    color: COLOR_TYPES
}

/**
 * A function that returns a polygon that represent elipse
 * 
 * @param options The options for the elipse
 * @category Primal geometry
 */
const createElipse = (options: CreateElipseOptions): Polygon => {

    const {
        size,
        rotation,
        position,
        color,
        shape
    } = options;

    const {
        height,
        width
    } = size;

    
    const elipse: Polygon = createRegulerPolygon({
        vertices: (
            height <= width
            ?
            width
            :
            height
        ) * 128 / 20,
        rotation: 0,
        size: height,
        color,
        shape,
        position
    });

    elipse.scaleX(width/height);

    elipse.rotate(rotation);

    return elipse;
}

export default createElipse
