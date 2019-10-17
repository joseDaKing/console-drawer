import PolygonalChain from "./polygonalChain";
import Line from "./line";
import { Position, Style } from "../../types";

/**
 * The class reperesents a polygon that can be defiend with multiple vertices
 * @category Primal geometry
 */
class Polygon extends PolygonalChain{

    /**
     * @param vertices The vertices of the polygon
     * 
     * @param style The style of the polygon lines
     */
    constructor(vertices: Position[], style: Style) { 
        super(vertices, style);
    }

    /**
     * @returns The lines of the polygon
     */
    protected _getLines(): Line[] {
        
        const lines: Line[] = [];

        this._vertices
        .forEach((currentVertice: Position, index: number, array: Position[]) => {
            
            const nextVertice: Position = array[index + 1];

            if (nextVertice) {

                lines.push(
                    new Line([
                        currentVertice, 
                        nextVertice
                    ], this._style)
                );
            }

            else {
                const firstVertice: Position = this._vertices[0];

                const lastVertice: Position = this._vertices[this._vertices.length - 1];

                lines.push(
                    new Line([
                        lastVertice,
                        firstVertice
                    ], this._style)
                );
            }
        });

        return lines;
    }
}

export default Polygon;