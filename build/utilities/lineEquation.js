"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class The class is used for geting the line equation for x and y based on start end position
 */
var LineEquation = /** @class */ (function () {
    /**
     * The start and end values are used for calculating the line equation
     *
     * @param start The start position of the line
     *
     * @param end The end position of the line
     */
    function LineEquation(start, end) {
        this._constant = 0;
        this._coefficient = 0;
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
    LineEquation.prototype._setCoefficient = function (start, end) {
        var deltaY = start.y - end.y;
        var deltaX = start.x - end.x;
        var coefficient = deltaY / deltaX;
        this._coefficient = coefficient;
    };
    /**
     * Returns the constant of the line
     *
     * @param start Start position of the line
     *
     * @param end End position of the line
     *
     * @returns Constant of the line
     */
    LineEquation.prototype._setConstant = function (start) {
        var coefficient = this._coefficient;
        var x = start.x, y = start.y;
        var constant = y - x * coefficient;
        this._constant = constant;
    };
    /**
     * Gets the y value for specific x value
     *
     * @param x Specified x value on the line
     *
     * @returns The y value
     */
    LineEquation.prototype.getY = function (x) {
        return x * this._coefficient + this._constant;
    };
    /**
     * Gets the x value for specific y value
     *
     * @param y Specified y value on the line
     *
     * @returns The x value
     */
    LineEquation.prototype.getX = function (y) {
        return (y - this._constant) / this._coefficient;
    };
    return LineEquation;
}());
exports.default = LineEquation;
