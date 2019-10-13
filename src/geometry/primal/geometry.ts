import { Position, Size, Style } from "../../types";

import getLinePositions, { getLinePositionsOptions } from "../../utilities/getLinePositions";

import getLineWidth from "../../utilities/getLineWidth";

import getLineHeight from "../../utilities/getLineHeight";
import { LinePosition } from "./line";
import getLineRotation from "../../utilities/getLineRotation";
import getLineLength from "../../utilities/getLineLength";

/**
 * @class The class represent a Geometry object
 */
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
     * @param axis The axis to translate on
     * 
     * @param length The length to translate
     */
    protected _translateBasedOnAxis(length: number, axis: "x" | "y"): void {

        this._origin[axis] += length;

        this._vertices.map((vertice: Position): Position => {
            
            vertice[axis] += length;

            return vertice;
        }); 
    }

    /**
     * @returns the scale of the geometry
     */
    public getScale(): Size {
        
        return this._scale;
    }

    /**
     * 
     * @param scale The new scale
     * 
     * @param axis The axis to scale
     */
    protected _scaleBasedOnAxis(scale: number, axis: "x" | "y"): void {

        const lengthType: "width" | "height" = (
            axis === "x"
            ? 
            "width" 
            : 
            "height"
        );

        const prevScale: number = this._scale[lengthType]; 

        const origin: number = this._origin[axis];

        this._vertices.map((vertice: Position) => {
            
            // Vertice position on specific axis
            const verticePosition: number = vertice[axis];

            const getLength: (positions: LinePosition) => number = (
                axis === "x"
                ?
                getLineWidth
                :
                getLineHeight
            );

            // Length between origin and vertice
            const length: number = getLength([this._origin, vertice]);

            // original length between origin and vertice on specific axis
            const originalLength: number = 1 / prevScale * length;

            if (verticePosition < origin) {

                vertice[axis] = origin - originalLength * scale;
            }

            if (origin < verticePosition) {

                vertice[axis] = origin + originalLength * scale;
            }
        });

        // Set new scale on specific axis for the geometry
        this._scale[lengthType] = scale;
    }

    /**
     * Rotates the geometric shape 
     * 
     * @param degrees the amount of relative rotation in degrees
     */
    protected _rotate(degrees: number): void {
        
        console.log(this._vertices);

        this._vertices = this._vertices.map((vertice: Position) => {
            
            const rotation: number = getLineRotation([this._origin, vertice]);

            const length: number = getLineLength([this._origin, vertice]);

            const newRotation = rotation + degrees;
            console.log("r", newRotation);
            const {
                end: newVertice
            } = getLinePositions({
                position: this._origin,
                rotation: newRotation,
                length
            });

            return newVertice;
        });

        console.log(this._vertices);

        this._rotation += degrees;
    }

    /**
     * @returns The style for the geometry lines 
     */
    public getStyle(): Style {

        return this._style;
    }
}

export default Geometry;