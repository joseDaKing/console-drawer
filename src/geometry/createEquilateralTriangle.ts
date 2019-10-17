import { Polygon } from "..";
import { Position, COLOR_TYPES } from "../types";

type CreateTriangleOptions = {
    size: number,
    position: Position,
    shape: string,
    color: COLOR_TYPES
}

/**
 * A function that returns a polygon that represent equilateral triangle
 * 
 * @param options The options for the equilateral triangle
 * @category Primal geometry
 */
const createEquilateralTriangle = (options: CreateTriangleOptions): Polygon => {

    const {
        size,
        position,
        shape,
        color
    } = options;

    const {x, y} = position;

    const area: number = Math.pow(size, 2) * Math.sin(Math.PI / 3) / 2;

    const width: number = size;

    const height: number = area / width;

    const triangle: Polygon = new Polygon([
        
        // Bottom Right Vertice
        {x: Math.ceil(x + width / 2), 
        y:  Math.ceil(y - height / 2)},

        // Bottom Left Vertice
        {x: Math.ceil(x - width / 2), 
        y:  Math.ceil(y - height / 2)},

        // Top Vertice
        {x: Math.ceil(x), y:  
        Math.ceil(y + height)}
    ], {color, shape});

    return triangle;
};

export default createEquilateralTriangle;