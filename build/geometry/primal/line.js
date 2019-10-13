"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var geometry_1 = __importDefault(require("./geometry"));
var pixel_1 = __importDefault(require("../../graphic/pixel"));
var lineEquation_1 = __importDefault(require("../../utilities/lineEquation"));
var getLineWidth_1 = __importDefault(require("../../utilities/getLineWidth"));
var getLineHeight_1 = __importDefault(require("../../utilities/getLineHeight"));
var getLinePositions_1 = __importDefault(require("../../utilities/getLinePositions"));
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    /**
     *
     * @param positions The line position
     *
     * @param style  The style
     */
    function Line(positions, style) {
        var _this = _super.call(this, positions, style) || this;
        _this._pixels = _this._getPixels(positions);
        return _this;
    }
    /**
     * Gets the pixels on the line
     *
     * @param positions the positions of the line
     */
    Line.prototype._getPixels = function (positions) {
        ;
        this._pixels = [];
        if (!Array.isArray(positions)) {
            var _a = getLinePositions_1.default(positions), vertice1 = _a.start, vertice2 = _a.end;
            positions = [vertice1, vertice2];
        }
        var width = getLineWidth_1.default(positions);
        var height = getLineHeight_1.default(positions);
        var axis = (width <= height
            ?
                "y"
            :
                "x");
        positions = this._reArrangePositions(positions, axis);
        var start = positions[0], end = positions[1];
        var lineEquation = new lineEquation_1.default(start, end);
        var getValue = (axis === "x"
            ?
                "getY"
            :
                "getX");
        var pixels = [];
        var oppisteAxis = (axis === "x"
            ?
                "y"
            :
                "x");
        for (var i = start[axis]; i <= end[axis]; i++) {
            var j = lineEquation[getValue](i);
            j = (isNaN(j)
                ?
                    start[oppisteAxis]
                :
                    j);
            var position = (axis === "x"
                ?
                    { x: i, y: j }
                :
                    { x: j, y: i });
            var pixel = new pixel_1.default(position, this._style);
            pixels.push(pixel);
        }
        return pixels;
    };
    /**
     * Re arranges the line position based on size on specific axis
     *
     * @param positions
     *
     * @param axis
     */
    Line.prototype._reArrangePositions = function (positions, axis) {
        var start = positions[0], end = positions[1];
        if (end[axis] < start[axis]) {
            return [end, start];
        }
        return positions;
    };
    /**
     * Set the pixels based on the lineposition
     */
    Line.prototype._setPixels = function () {
        var _a = this._vertices, start = _a[0], end = _a[1];
        this._pixels = this._getPixels([start, end]);
    };
    /**
     * @returns The pixels for the line
     */
    Line.prototype.getPixels = function () {
        return this._pixels;
    };
    /**
     * @returns the start and end positions of the line
     */
    Line.prototype.getLinePositions = function () {
        var _a = this._vertices, start = _a[0], end = _a[1];
        return [start, end];
    };
    /**
     * @param positions the new line positions
     */
    Line.prototype.setPositions = function (positions) {
        if (!Array.isArray(positions)) {
            var _a = getLinePositions_1.default(positions), start = _a.start, end = _a.end;
            positions = [start, end];
        }
        this._vertices = positions;
        this._setPixels();
    };
    /**
     * @param position The new start position
     */
    Line.prototype.setStartPosition = function (position) {
        this._vertices[0] = position;
        this._setPixels();
    };
    /**
     *
     * @param position The new end start position
     */
    Line.prototype.setEndPosition = function (position) {
        this._vertices[1] = position;
        this._setPixels();
    };
    /**
     * @returns the style of the line
     */
    Line.prototype.getStyle = function () {
        return this._style;
    };
    /**
     * Sets new the style of the line
     *
     * @param style the new style
     */
    Line.prototype.setStyle = function (style) {
        this._style = style;
        this._setPixels();
    };
    /**
     * Sets the new color of the line
     *
     * @param color the new color
     */
    Line.prototype.setColor = function (color) {
        this._style.color = color;
        this._setPixels();
    };
    /**
     * Set the new shape
     *
     * @param shape The new shape
     */
    Line.prototype.setShape = function (shape) {
        this._style.shape = shape;
        this._setPixels();
    };
    /**
     * Sets the scale of the line
     *
     * @param scale the new scale
     */
    Line.prototype.scale = function (scale) {
        this.scaleX(scale);
        this.scaleY(scale);
        this._setPixels();
    };
    /**
     * Sets the new y scale
     *
     * @param scale the new y scale
     */
    Line.prototype.scaleY = function (scale) {
        this._scaleBasedOnAxis(scale, "y");
        this._setPixels();
    };
    /**
     * Sets the new x scale
     *
     * @param scale the new x scale
     */
    Line.prototype.scaleX = function (scale) {
        this._scaleBasedOnAxis(scale, "x");
        this._setPixels();
    };
    /**
     * Translates the position of line
     *
     * @param positionAdd the added position to current location
     */
    Line.prototype.translate = function (positionAdd) {
        var x = positionAdd.x, y = positionAdd.y;
        this.translateX(x);
        this.translateY(y);
        this._setPixels();
    };
    /**
     * Translate x position of line
     *
     * @param xAdd the added x position
     */
    Line.prototype.translateX = function (xAdd) {
        this._translateBasedOnAxis(xAdd, "x");
        this._setPixels();
    };
    /**
     * Translate y position of line
     *
     * @param yAdd the added y position
     */
    Line.prototype.translateY = function (yAdd) {
        this._translateBasedOnAxis(yAdd, "y");
        this._setPixels();
    };
    /**
     * Rotates the line reletivly
     *
     * @param degrees the added rotation to the current rotation
     */
    Line.prototype.rotate = function (degrees) {
        this._rotate(degrees);
        this._setPixels();
    };
    return Line;
}(geometry_1.default));
exports.default = Line;
