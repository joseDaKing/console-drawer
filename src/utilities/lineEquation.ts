import { Position } from "../types";

/**
 * The class is used for geting the line equation for x and y based on start end position
 * @category UtilitieS
 */
class LineEquation {

    private _constant: number = 0;

    private _coefficient: number = 0;

    /**
     * The start and end values are used for calculating the line equation
     * 
     * @param start The start position of the line
     * 
     * @param end The end position of the line
     */
    constructor(start: Position, end: Position) {
        
        this._setCoefficient(start, end);

        this._setConstant(start);
    }

    /**
     * Returns the coefficient of the line
     * 
     * @param start The start position of the line
     * 
     * @param end The end position of the line
     * 
     * @returns Coefficient of the line
     */
    private _setCoefficient(start: Position, end: Position) {

        const deltaY = start.y - end.y;

        const deltaX = start.x - end.x;

        const coefficient = deltaY / deltaX;

        this._coefficient = coefficient;
    }

    /**
     * Returns the constant of the line
     * 
     * @param start Start position of the line
     * 
     * @param end End position of the line
     * 
     * @returns Constant of the line
     */
    private _setConstant(start: Position) {

        const coefficient = this._coefficient;

        const {x, y} = start;

        const constant = y - x * coefficient;

        this._constant = constant;
    }

    /**
     * Gets the y value for specific x value
     * 
     * @param x Specified x value on the line 
     * 
     * @returns The y value
     */
    public getY(x: number): number {
        return x * this._coefficient + this._constant;
    }
    
    /**
     * Gets the x value for specific y value
     * 
     * @param y Specified y value on the line 
     * 
     * @returns The x value
     */
    public getX(y: number): number {
        return (y - this._constant) / this._coefficient;
    }
}

export default LineEquation;