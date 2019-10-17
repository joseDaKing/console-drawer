import { Polygon } from "..";
import { Position, Size, COLOR_TYPES } from "../types";

type CreateRectangelOptions = {
    size: Size,
    position: Position,
    shape: string,
    color: COLOR_TYPES
}

/**
 * A function that returns a polygon that represent rectangel
 * 
 * @param options The options for the rectangel
 * @category Primal geometry
 */
const createRectangel = (options: CreateRectangelOptions): Polygon => {

    const {
        size,
        position,
        shape,
        color
    } = options;

    const {x, y} = position;

    const {
        height,
        width
    } = size;

    const rectangel: Polygon = new Polygon([
        // Bottom Left Vertice
        {x: x - width / 2, 
        y: y - height / 2},
        
        // Top Left Vertice
        {x: x - width / 2, 
        y: y + height / 2},
        
        // Top Right Vertice
        {x: x + width / 2, 
        y: y + height / 2},

        // Bottom Right Vertice
        {x: x + width / 2, 
        y: y - height / 2},
    ], {shape, color});

    return rectangel;
};

export default createRectangel;