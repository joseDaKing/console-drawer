import { Polygon } from "..";
import { Position, Size, COLOR_TYPES } from "../types";

type CreateTriangleOptions = {
    size: Size,
    position: Position,
    shape: string,
    color: COLOR_TYPES
}

/**
 * A function that returns a polygon that represent isosceles triangle
 * 
 * @param options The options for the isosceles triangle
 * @category Primal geometry
 */
const createIsoscelesTriangle = (options: CreateTriangleOptions): Polygon => {

    const {
        size,
        position,
        shape,
        color
    } = options;

    const {x, y} = position;

    const {height, width} = size;

    const triangle: Polygon = new Polygon([
        // Top Vertice
        {x: Math.ceil(x), 
        y: Math.ceil(y + height / 2)},

        // Bottom Right Vertice
        {x: Math.ceil(x + width / 2), 
        y: Math.ceil(y - height / 2)},

        // Bottom Left Vertice
        {x: Math.ceil(x - width / 2), 
        y: Math.ceil(y - height / 2)},
    ], {shape, color});

    return triangle;
};

export default createIsoscelesTriangle;