import { Position, Style, Axis, LinePosition } from "../../types";
import Geometry from "./geometry";
import Pixel from "../../graphic/pixel";
import LineEquation from "../../utilities/lineEquation";
import getLineWidth from "../../utilities/getLineWidth";
import getLineHeight from "../../utilities/getLineHeight";
import getLinePositions, {getLinePositionsOptions} from "../../utilities/getLinePositions"

/**
 * The class reperesents a line that is defiend with 2 vertices
 * @category Primal geometry
 */
class Line extends Geometry {

    /**
     * 
     * @param positions The line position 
     * 
     * @param style  The style
     */
    constructor(positions: LinePosition | getLinePositionsOptions, style: Style) {    
        super(positions, style);
    }

    /**
     * Re arranges the line position based on size on specific axis
     * 
     * @param positions 
     * 
     * @param axis 
     */
    private _reArrangePositions(positions: LinePosition, axis: Axis): LinePosition {
        
        const [start, end] = positions;

        if (end[axis] < start[axis]) {
            return [end, start];
        }

        return positions;
    }

    /**
     * @param vertices set the new vertices
     */
    public setVertices(vertices: LinePosition | getLinePositionsOptions): void {

        const errorMessage: string = `
        Wrong argument for the method setVertices, the argument should always be Position Array of size 2
        `.trim();

        if (vertices.length !== this._vertices.length) throw Error(errorMessage);

        if (!Array.isArray(vertices)) {
            
            const {start, end} = getLinePositions(vertices);

            vertices = [start, end];
        }

        this._vertices = vertices;
    }

    /**
     * @param vertice The new start position
     */
    public setStartVertice(vertice: Position): void {
        
        this._vertices[0] = vertice;
    }

    /**
     * @param vertice The new end start position
     */
    public setEndVertice(vertice: Position): void {

        this._vertices[1] = vertice;
    }

    /**
     * @returns The pixels of the line
     */
    public getPixels(): Pixel[] {;
        
        let positions: LinePosition = [this._vertices[0], this._vertices[1]];

        const width: number = getLineWidth(positions);

        const height: number = getLineHeight(positions);

        const axis: Axis = (
            width <= height
            ?
            "y"
            :
            "x"
        );

        positions = this._reArrangePositions(positions, axis);

        const [start, end] = positions;

        const lineEquation: LineEquation = new LineEquation(start, end);

        const getValue: "getX" | "getY" = (
            axis === "x"
            ?
            "getY"
            :
            "getX"
        );

        const pixels: Pixel[] = [];

        const oppisteAxis: Axis = (
            axis === "x" 
            ? 
            "y" 
            : 
            "x"
        );

        for (let i: number = start[axis]; i <= end[axis]; i++) {

            let j: number = lineEquation[getValue](i);
            
            j = (
                isNaN(j)
                ?
                start[oppisteAxis]
                :
                j
            ); 

            const position: Position = (
                axis === "x"
                ?
                {x: i, y: j}
                :
                {x: j, y: i}
            );

            const pixel: Pixel = new Pixel(position, this._style);

            pixels.push(pixel);
        }

        return pixels;
    }
}

export default Line;

export {
    LinePosition
}