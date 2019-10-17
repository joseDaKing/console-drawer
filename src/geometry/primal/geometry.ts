import { Position, Size, Style, COLOR_TYPES } from "../../types";
import getLinePositions, { getLinePositionsOptions } from "../../utilities/getLinePositions";
import mixin from "../../utilities/mixin";
import Transform from "../../transform/transform";

/**
 * The class represent a abstract geometry object that is defiend with vertices
 * @category Primal geometry
 */
@mixin(Transform)
class Geometry {

    protected _vertices: Position[];

    protected _origin: Position;

    protected _scale: Size = {
        width: 1, 
        height: 1
    };

    protected _rotation: number = 0;

    protected _style: Style;

    /**
     * @param vertices The position of each vertice or a object that describes 2 vertices by start position, rotation and the length
     * 
     * @param style The style of the geometry lines between each vertice
     */
    constructor(vertices: Position[] | getLinePositionsOptions, style: Style) {
        
        if (!Array.isArray(vertices)) {
            
            const {start , end}= getLinePositions(vertices);

            vertices = [start, end];
        }

        this._vertices = vertices;

        this._style = style;

        this._origin = this._getAverageOrigin(vertices);   
    }

    /**
     * Calculates the average origin of the geometry based on the positions of the vertices
     * 
     * @param vertices Vertices of the geometry
     */
    private _getAverageOrigin(vertices: Position[]): Position {

        let xDefault: number = 0;

        let yDefault: number = 0;

        for (const vertice of vertices) {

            const {x, y} = vertice;

            xDefault += x;

            yDefault += y;
        }

        const length: number = vertices.length;

        xDefault /= length;

        yDefault /= length;
        
        const defaultOrigin: Position = {
            x: xDefault,
            y: yDefault
        };

        return defaultOrigin;
    }

    /**
     * Sets the origin to average position of the geometry
     */
    public setOriginToCenter(): void {

        this._getAverageOrigin(this._vertices);
    }

    /**
     * Set the origin position
     * 
     * @param position The new position for the origin
     */
    public setOrigin(position: Position): void {
        
        this._origin = position;
    }

    /**
     * Set the x position of the origin
     * 
     * @param position The new x position for the origin 
     */
    public setOriginX(position: number): void {
        this._origin.x = position;
    }

    /**
     * Set the y position of the origin
     * 
     * @param position The new y position for the origin 
     */
    public setOriginY(position: number): void {
        this._origin.y = position;
    }
    

    /**
     * @returns The origin position
     */
    public getOrigin(): Position {
        
        return this._origin;
    }

    /**
     * @returns the scale of the geometry
     */
    public getScale(): Size {
        
        return this._scale;
    }

    /**
     * @returns the rotation of the geometry
     */
    public getRotation(): number { 
        return this._rotation;
    }

    /**
     * @returns The style for the geometry lines
     */
    public getStyle(): Style {

        return this._style;
    }

    /**
     * Sets new the style of the line
     * 
     * @param style the new style
     */
    public setStyle(style: Style): void {
        this._style = style;
    }

    /**
     * Sets the new color of the line
     * 
     * @param color the new color
     */
    public setColor(color: COLOR_TYPES): void {
        this._style.color = color
    }

    /**
     * Set the new shape
     * 
     * @param shape The new shape
     */
    public setShape(shape: string): void {
        this._style.shape = shape;
    }
}
interface Geometry extends Transform {}

export default Geometry;