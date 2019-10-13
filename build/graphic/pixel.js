"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Code
/**
 * @class Used for definning a pixel in canvas.
 */
var Pixel = /** @class */ (function () {
    /**
     * @constructor
     *
     * @param position      The position of the pixel
     *
     * @param style         The style of the pixel
     */
    function Pixel(position, style) {
        this._position = {
            x: Math.round(position.x),
            y: Math.round(position.y)
        };
        this._style = style;
    }
    /**
     * @returns The position of the pixel
     */
    Pixel.prototype.getPosition = function () {
        return this._position;
    };
    /**
     * @returns The style of the pixel
     */
    Pixel.prototype.getStyle = function () {
        return this._style;
    };
    return Pixel;
}());
;
// Exports
exports.default = Pixel;
