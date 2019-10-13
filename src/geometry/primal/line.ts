import { Position, Style } from "../../types";

import Geometry from "./geometry";

import Pixel from "../../graphic/pixel";

import LineEquation from "../../utilities/lineEquation";

import getLineWidth from "../../utilities/getLineWidth";

import getLineHeight from "../../utilities/getLineHeight";

import getLinePositions, {getLinePositionsOptions} from "../../utilities/getLinePositions"

import { COLOR_TYPES } from "../../enums";

type LinePosition = [Position, Position];

class Line extends Geometry {

    private _pixels: Pixel[];

    /**
     * 
     * @param positions The line position 
     * 
     * @param style  The style
     */
    constructor(positions: LinePosition | getLinePositionsOptions, style: Style) {    
        super(positions, style);

        this._pixels = this._getPixels(positions);
    }

    /**
     * Gets the pixels on the line
     * 
     * @param positions the positions of the line
     */
    private _getPixels(positions: LinePosition | getLinePositionsOptions): Pixel[] {;
        
        this._pixels = [];

        if (!Array.isArray(positions)) {
            const {
                start: vertice1, 
                end: vertice2
            } = getLinePositions(positions);
    
            positions = [vertice1, vertice2];
        }

        const width: number = getLineWidth(positions);

        const height: number = getLineHeight(positions);

        const axis: "x" | "y" = (
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

        const oppisteAxis: "x" | "y" = (
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

    /**
     * Re arranges the line position based on size on specific axis
     * 
     * @param positions 
     * 
     * @param axis 
     */
    private _reArrangePositions(positions: LinePosition, axis: "x" | "y"): LinePosition {
        
        const [start, end] = positions;

        if (end[axis] < start[axis]) {
            return [end, start];
        }

        return positions;
    }

    /**
     * Set the pixels based on the lineposition
     */
    private _setPixels(): void {
        
        const [start, end] = this._vertices;
        
        this._pixels = this._getPixels([start, end]);
    }

    /**
     * @returns The pixels for the line
     */
    public getPixels(): Pixel[] {
        
        return this._pixels;
    }

    /**
     * @returns the start and end positions of the line
     */
    public getLinePositions(): LinePosition {
        
        const [start, end] = this._vertices;

        return [start, end];
    }

    /**
     * @param positions the new line positions
     */
    public setPositions(positions: LinePosition | getLinePositionsOptions): void {

        if (!Array.isArray(positions)) {
            
            const {start, end} = getLinePositions(positions);

            positions = [start, end];
        }

        this._vertices = positions;

        this._setPixels();
    }

    /**
     * @param position The new start position
     */
    public setStartPosition(position: Position): void {
        
        this._vertices[0] = position;

        this._setPixels();
    }

    /**
     * 
     * @param position The new end start position
     */
    public setEndPosition(position: Position): void {

        this._vertices[1] = position;

        this._setPixels();
    }

    /**
     * @returns the style of the line
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
        this._setPixels();
    }

    /**
     * Sets the new color of the line
     * 
     * @param color the new color
     */
    public setColor(color: COLOR_TYPES): void {
        this._style.color = color
        this._setPixels();
    }

    /**
     * Set the new shape
     * 
     * @param shape The new shape
     */
    public setShape(shape: string): void {
        this._style.shape = shape;
        this._setPixels();
    }

    /**
     * Sets the scale of the line
     * 
     * @param scale the new scale
     */
    public scale(scale: number): void {
        
        this.scaleX(scale);
        
        this.scaleY(scale);

        this._setPixels();
    }

    /**
     * Sets the new y scale
     * 
     * @param scale the new y scale
     */
    public scaleY(scale: number): void {
        
        this._scaleBasedOnAxis(scale, "y");

        this._setPixels();
    }

    /**
     * Sets the new x scale
     * 
     * @param scale the new x scale
     */
    public scaleX(scale: number): void {
        
        this._scaleBasedOnAxis(scale, "x");

        this._setPixels();
    }

    /**
     * Translates the position of line
     * 
     * @param positionAdd the added position to current location
     */
    public translate(positionAdd: Position): void {

        const {x, y} = positionAdd;

        this.translateX(x);
        
        this.translateY(y);

        this._setPixels();
    }

    /**
     * Translate x position of line
     * 
     * @param xAdd the added x position
     */
    public translateX(xAdd: number): void {

        this._translateBasedOnAxis(xAdd, "x");

        this._setPixels();
    }

    /**
     * Translate y position of line
     * 
     * @param yAdd the added y position
     */
    public translateY(yAdd: number): void {

        this._translateBasedOnAxis(yAdd, "y");

        this._setPixels();
    }

    /**
     * Rotates the line reletivly
     * 
     * @param degrees the added rotation to the current rotation
     */
    public rotate(degrees: number): void {
        
        this._rotate(degrees);

        this._setPixels();
    }
}

export default Line;

export {
    LinePosition
}