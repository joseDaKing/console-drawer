import { Position, COLOR_TYPES } from "../types";
import { Polygon } from "..";
import getLinePositions from "../utilities/getLinePositions";

type CreateNgonOptions = {
    position: Position,
    vertices: number,
    rotation: number,
    size: number,
    color: COLOR_TYPES,
    shape: string
};

/**
 * A function that returns a polygon that represent isosceles n-gon (hexgon, pentagon ...)
 * 
 * @param options The options for the n-gon
 * @category Primal geometry
 */
const createRegularPolygon = (options: CreateNgonOptions): Polygon => {

    const {
        position,
        vertices: verticeAmount,
        rotation: offset,
        size: length,
        color,
        shape
    } = options;

    const vertices: Position[] = [];

    for (let degrees = 0; degrees <= 360; degrees += 360/verticeAmount) {
        
        const {
            end: vertice
        } = getLinePositions({
            position,
            rotation: degrees + offset,
            length
        });

        vertices.push({
            x: Math.ceil(vertice.x),
            y: Math.ceil(vertice.y)
        });
    } 

    const egularPolygon: Polygon = new Polygon(vertices, {color, shape});

    return egularPolygon;
}

export default createRegularPolygon;