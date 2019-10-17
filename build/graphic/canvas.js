"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Code
/**
 * Used for createing a canvas that can be drawn on with Pixels
 * @category Graphic class
 */
var Canvas = /** @class */ (function () {
    /**
     * @param options Options for the creation of the canvas
     */
    function Canvas(options) {
        var size = options.size, blankStyle = options.blankStyle;
        this._size = size;
        this._blankStyle = blankStyle;
        this._pixelsMetadata = {};
    }
    /**
     * Set size of the canvas
     *
     * @param size New size
     */
    Canvas.prototype.setSize = function (size) {
        this._size.height = size;
        this._size.width = size;
    };
    /**
     * Set height of the canvas
     *
     * @param height New height
     */
    Canvas.prototype.setHeight = function (height) {
        this._size.height = height;
    };
    /**
     * Set width of the canvas
     *
     * @param width New width
     */
    Canvas.prototype.setWidth = function (width) {
        this._size.width = width;
    };
    /**
     * Fill canvas with specific style
     *
     * @param style Style to fill canvas with
     */
    Canvas.prototype.fillAll = function (style) {
        var _a = this._size, height = _a.height, width = _a.width;
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var position = { x: x, y: y };
                this._drawPixel({ position: position, style: style });
            }
        }
    };
    /**
     * Fills part of the canvas with specific style based on filtering specific style
     *
     * @param options Style to be filtered and filled with new style
     */
    Canvas.prototype.fillBasedOnStyle = function (options) {
        var _this = this;
        var filter = options.filter, style = options.style, strict = options.strict;
        this._loopPixelsMetadata(function (position, pixelStyle) {
            var isMatching = _this._comparePixelStyle({
                styles: [
                    filter,
                    pixelStyle
                ],
                strict: strict
            });
            if (isMatching) {
                _this._drawPixel({ position: position, style: style });
            }
        });
    };
    /**
     * Draws on canvas with help of pixels
     *
     * @param options Pixels to be drawn and the style for pixels with undefined style
     */
    Canvas.prototype.draw = function (pixels) {
        for (var _i = 0, pixels_1 = pixels; _i < pixels_1.length; _i++) {
            var pixel = pixels_1[_i];
            var position = pixel.getPosition();
            var xPosition = position.x, yPosition = position.y;
            var _a = this._size, height = _a.height, width = _a.width;
            var isXpositionInCanvas = 0 <= xPosition && xPosition < width;
            var isYpositionInCanvas = 0 <= yPosition && yPosition < height;
            var isPixelInCanvas = isXpositionInCanvas && isYpositionInCanvas;
            if (isPixelInCanvas) {
                var style = pixel.getStyle();
                this._drawPixel({ position: position, style: style });
            }
        }
    };
    /**
     * Draw pixel metadata
     *
     * @param options Draws single pixel metadata based on position and styles
     */
    Canvas.prototype._drawPixel = function (options) {
        var position = options.position, style = options.style;
        var xPosition = position.x, yPosition = position.y;
        // Row
        this._pixelsMetadata[yPosition] = __assign({}, this._pixelsMetadata[yPosition]);
        // Cell
        this._pixelsMetadata[yPosition][xPosition] = style;
    };
    /**
     * @param positions Positions of pixels to delete
     */
    Canvas.prototype.erase = function (options) {
        var pixels = options.pixels, isStrict = options.strict;
        for (var _i = 0, pixels_2 = pixels; _i < pixels_2.length; _i++) {
            var pixel = pixels_2[_i];
            var _a = pixel.getPosition(), x = _a.x, y = _a.y;
            var row = this._pixelsMetadata[x];
            if (row) {
                var cell = row[y];
                if (cell) {
                    var position = { x: x, y: y };
                    var isSameStyle = this._comparePixelStyle({
                        styles: [
                            cell,
                            pixel.getStyle()
                        ],
                        strict: true
                    });
                    if (isStrict && isSameStyle) {
                        this._erasePixel(position);
                    }
                    else {
                        this._erasePixel(position);
                    }
                }
            }
        }
    };
    /**
     * Erases whole canvas
     */
    Canvas.prototype.eraseAll = function () {
        this._pixelsMetadata = {};
    };
    /**
     * Erases part of the canvas based on style
     *
     * @param options The style to be eraseed
     */
    Canvas.prototype.eraseBasedOnStyle = function (options) {
        var _this = this;
        var filter = options.filter, strict = options.strict;
        this._loopPixelsMetadata(function (position, pixelStyle) {
            var isMatching = _this._comparePixelStyle({
                styles: [
                    filter,
                    pixelStyle
                ],
                strict: strict
            });
            if (isMatching) {
                _this._erasePixel(position);
            }
        });
    };
    /**
     * Erases single pixel metadata based on position
     *
     * @param position Erases pixel metadata based on position
     */
    Canvas.prototype._erasePixel = function (position) {
        var x = position.x, y = position.y;
        delete this._pixelsMetadata[y][x];
        var isRowEmpty = Number(Object.keys(this._pixelsMetadata[y])) === y;
        if (isRowEmpty) {
            delete this._pixelsMetadata[y];
        }
    };
    /**
     * Loops trough pixel metadata
     *
     * @param fn Function to execute when looping trough each pixel metadata
     */
    Canvas.prototype._loopPixelsMetadata = function (fn) {
        for (var y in this._pixelsMetadata) {
            var row = this._pixelsMetadata[y];
            for (var x in row) {
                var position = {
                    x: Number(x),
                    y: Number(y)
                };
                var style = this._pixelsMetadata[y][x];
                fn(position, style);
            }
        }
    };
    /**
     * Compares if 2 pixel are the same
     *
     * @param options Compare 2 pixel data
     */
    Canvas.prototype._comparePixelStyle = function (options) {
        var styles = options.styles, isStrict = options.strict;
        var style1 = styles[0], style2 = styles[1];
        var style1Color = style1.color, style1Shape = style1.shape;
        var style2Color = style2.color, style2Shape = style2.shape;
        var isColorMatching = style1Color === style2Color;
        var isShapeMatching = style1Shape === style2Shape;
        var isMatching = (isStrict ?
            isColorMatching &&
                isShapeMatching
            :
                isColorMatching ||
                    isShapeMatching);
        return isMatching;
    };
    /**
     * @returns Metadata that describes the Canvas
     */
    Canvas.prototype.getMetadata = function () {
        return {
            size: this._size,
            blankStyle: this._blankStyle,
            pixelsMetadata: this._pixelsMetadata,
        };
    };
    return Canvas;
}());
// Exports
exports.default = Canvas;
