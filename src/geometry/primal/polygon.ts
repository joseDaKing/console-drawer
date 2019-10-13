import PolygonalChain from "./polygonalChain";

import Line from "./line";

import { Position, Style } from "../../types";


class Polygon extends PolygonalChain{

    constructor(vertices: Position[], style: Style) { 
        super(vertices, style);
    }

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