import { Position, Style, COLOR_TYPES } from "../../types";
import Geometry from "./geometry";
import polygonalChain from "./line";
import Pixel from "../../graphic/pixel";
import { Line } from ".";

/**
 * The class reperesents a polygonal chain that is defiend with multiple vertices
 * @category Primal geometry
 */
class PolygonalChain extends Geometry {

    protected _lines: Line[];

    /**
     * @param vertices The vertices
     * 
     * @param style The style of the polygonalChain
     */
    constructor(vertices: Position[], style: Style) {
        
        super(vertices, style);

        this._lines = this._getLines();
    }

    /**
     * @returns the lines for the polygonalChain
     */
    protected _getLines(): Line[] {
        
        this._lines = [];

        const lines: Line[] = [];

        this._vertices
        .forEach((currentVertice: Position, index: number, array: Position[]) => {
            
            const nextVertice: Position = array[index + 1];

            if (nextVertice) {

                const line: Line = new Line([
                    currentVertice,
                    nextVertice
                ], this._style);

                line.setOrigin(this._origin);

                lines.push(line);
            }
        });

        return lines;
    }

    /**
     * Sets the lines for polygonalchain
     */
    private _setLines(): void {
        this._lines = this._getLines();
    }

    /**
     * Adds a vertice
     * 
     * @param position vertice
     */
    public addVertice(position: Position): void {
        
        this._vertices.push(position);

        this._setLines();
    }

    /**
     * Adds new vertices
     * 
     * @param positions vertices
     */
    public addVertices(positions: Position[]): void {
        
        positions.forEach((position: Position) => {

            this.addVertice(position);
        });
    }

    /**
     * Deletes a vertice based on index
     * 
     * @param indexToDelete the index of the vertice
     */
    public deleteVerticeByIndex(indexToDelete: number): void {
        this._vertices = this._vertices.filter((_, index: number) => indexToDelete !== index);

        this._setLines();
    }

    /**
     * Deletes the vertices based on indexes
     * 
     * @param indexesToDelete the indexes of the vertices
     */
    public deleteVerticesByIndexes(indexesToDelete: number[]): void {
        
        this._vertices = this._vertices.filter((_, index: number) => {
            
            let willBeDeleted: boolean  = false;

            for (const indexToDelete of indexesToDelete) {
                
                willBeDeleted = index === indexToDelete;

                if (willBeDeleted) break;
            }

            return !willBeDeleted;
        });

        this._setLines();
    }

    /**
     * Deletes vertices by index range
     * 
     * @param range the index range (start, end)
     */
    public deleteVerticesByIndexRange(range: [number, number]): void {
        const [start, end] = range;

        this._vertices = this._vertices.filter((_, index: number) => {
            
            let willBeDeleted: boolean  = false;

            for (let indexToDelete = start; indexToDelete <= end; indexToDelete ++) {
                
                willBeDeleted = index === indexToDelete;

                if (willBeDeleted) break;
            }

            return !willBeDeleted;
        });

        this._setLines();
    }

    /**
     * Delets a vertice by position
     * 
     * @param position the position of the vertice
     */
    public deleteVerticeByPosition(position: Position): void {

        this._vertices = this._vertices.filter((vertice: Position) => {

            const {
                x: xVerticePosition,
                y: yVerticePosition
            } = vertice;

            const {
                x: xPosition, 
                y: yPosition
            } = position;

            const xPositionMatch: boolean = xPosition === xVerticePosition;

            const yPositionMatch: boolean = yPosition === yVerticePosition;

            const isMatching = xPositionMatch && yPositionMatch;

            return !isMatching;
        });

        this._setLines();
    }

    /**
     * Delets vertices by positions
     * 
     * @param positions the positions of the vertices
     */
    public deleteVerticesByPositions(positions: Position[]): void {
        
        positions.forEach((position: Position) => {

            this.deleteVerticeByPosition(position);
        });

        this._setLines();
    }

    /**
     * @returns the style of the polygonalChain
     */
    public getStyle(): Style {
        return this._style;
    }

    /**
     * Sets new the style of the polygonalChain
     * 
     * @param style the new style
     */
    public setStyle(style: Style): void {
        this._style = style;
        this._setLines();
    }

    /**
     * Sets the new color of the polygonalChain
     * 
     * @param color the new color
     */
    public setColor(color: COLOR_TYPES): void {
        this._style.color = color
        this._setLines();
    }

    /**
     * Set the new shape
     * 
     * @param shape The new shape
     */
    public setShape(shape: string): void {
        this._style.shape = shape;
        this._setLines();
    }

    /**
     * @returns the pixels of the polygonalChain
     */
    public getPixels(): Pixel[] {
        
        const pixels: Pixel[] = [];

        this._lines.forEach((line: polygonalChain) => {
            
            pixels.push(...line.getPixels());
        });

        return pixels;
    }

    /**
     * @param vertices set the new vertices
     */
    public setVertices(vertices: Position[]): void {

        const errorMessage: string = `
        Wrong argument for the method setVertices, the argument should be Position Array of size ${this._vertices.length}
        `.trim();

        if (vertices.length !== this._vertices.length) throw Error(errorMessage);

        this._vertices = vertices;

        this._setLines();
    }
}

export default PolygonalChain;