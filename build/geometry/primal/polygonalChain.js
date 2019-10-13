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
var _1 = require(".");
var PolygonalChain = /** @class */ (function (_super) {
    __extends(PolygonalChain, _super);
    /**
     * @param vertices The vertices
     *
     * @param style The style of the polygonalChain
     */
    function PolygonalChain(vertices, style) {
        var _this = _super.call(this, vertices, style) || this;
        _this._lines = _this._getLines();
        return _this;
    }
    /**
     * @returns the lines for the polygonalChain
     */
    PolygonalChain.prototype._getLines = function () {
        var _this = this;
        this._lines = [];
        var lines = [];
        this._vertices
            .forEach(function (currentVertice, index, array) {
            var nextVertice = array[index + 1];
            if (nextVertice) {
                var line = new _1.Line([
                    currentVertice,
                    nextVertice
                ], _this._style);
                line.setOrigin(_this._origin);
                lines.push(line);
            }
        });
        return lines;
    };
    /**
     * Sets the lines for polygonalchain
     */
    PolygonalChain.prototype._setLines = function () {
        this._lines = this._getLines();
    };
    /**
     * Adds a vertice
     *
     * @param position vertice
     */
    PolygonalChain.prototype.addVertice = function (position) {
        this._vertices.push(position);
        this._setLines();
    };
    /**
     * Adds new vertices
     *
     * @param positions vertices
     */
    PolygonalChain.prototype.addVertices = function (positions) {
        var _this = this;
        positions.forEach(function (position) {
            _this.addVertice(position);
        });
    };
    /**
     * Deletes a vertice based on index
     *
     * @param indexToDelete the index of the vertice
     */
    PolygonalChain.prototype.deleteVerticeByIndex = function (indexToDelete) {
        this._vertices = this._vertices.filter(function (_, index) { return indexToDelete !== index; });
        this._setLines();
    };
    /**
     * Deletes the vertices based on indexes
     *
     * @param indexesToDelete the indexes of the vertices
     */
    PolygonalChain.prototype.deleteVerticesByIndexes = function (indexesToDelete) {
        this._vertices = this._vertices.filter(function (_, index) {
            var willBeDeleted = false;
            for (var _i = 0, indexesToDelete_1 = indexesToDelete; _i < indexesToDelete_1.length; _i++) {
                var indexToDelete = indexesToDelete_1[_i];
                willBeDeleted = index === indexToDelete;
                if (willBeDeleted)
                    break;
            }
            return !willBeDeleted;
        });
        this._setLines();
    };
    /**
     * Deletes vertices by index range
     *
     * @param start the start index
     *
     * @param end the end index
     */
    PolygonalChain.prototype.deleteVerticesByIndexRange = function (_a) {
        var start = _a[0], end = _a[1];
        this._vertices = this._vertices.filter(function (_, index) {
            var willBeDeleted = false;
            for (var indexToDelete = start; indexToDelete <= end; indexToDelete++) {
                willBeDeleted = index === indexToDelete;
                if (willBeDeleted)
                    break;
            }
            return !willBeDeleted;
        });
        this._setLines();
    };
    /**
     * Delets a vertice by position
     *
     * @param position the position of the vertice
     */
    PolygonalChain.prototype.deleteVerticeByPosition = function (position) {
        this._vertices = this._vertices.filter(function (vertice) {
            var xVerticePosition = vertice.x, yVerticePosition = vertice.y;
            var xPosition = position.x, yPosition = position.y;
            var xPositionMatch = xPosition === xVerticePosition;
            var yPositionMatch = yPosition === yVerticePosition;
            var isMatching = xPositionMatch && yPositionMatch;
            return !isMatching;
        });
        this._setLines();
    };
    /**
     * Delets vertices by positions
     *
     * @param positions the positions of the vertices
     */
    PolygonalChain.prototype.deleteVerticesByPositions = function (positions) {
        var _this = this;
        positions.forEach(function (position) {
            _this.deleteVerticeByPosition(position);
        });
        this._setLines();
    };
    /**
     * @returns the style of the polygonalChain
     */
    PolygonalChain.prototype.getStyle = function () {
        return this._style;
    };
    /**
     * Sets new the style of the polygonalChain
     *
     * @param style the new style
     */
    PolygonalChain.prototype.setStyle = function (style) {
        this._style = style;
        this._setLines();
    };
    /**
     * Sets the new color of the polygonalChain
     *
     * @param color the new color
     */
    PolygonalChain.prototype.setColor = function (color) {
        this._style.color = color;
        this._setLines();
    };
    /**
     * Set the new shape
     *
     * @param shape The new shape
     */
    PolygonalChain.prototype.setShape = function (shape) {
        this._style.shape = shape;
        this._setLines();
    };
    /**
     * Sets the scale of the polygonalChain
     *
     * @param scale the new scale
     */
    PolygonalChain.prototype.scale = function (scale) {
        this.scaleX(scale);
        this.scaleY(scale);
        this._setLines();
    };
    /**
     * Sets the new y scale
     *
     * @param scale the new y scale
     */
    PolygonalChain.prototype.scaleY = function (scale) {
        this._scaleBasedOnAxis(scale, "y");
        this._setLines();
    };
    /**
     * Sets the new x scale
     *
     * @param scale the new x scale
     */
    PolygonalChain.prototype.scaleX = function (scale) {
        this._scaleBasedOnAxis(scale, "x");
        this._setLines();
    };
    /**
     * Translates the position of polygonalChain
     *
     * @param positionAdd the added position to current location
     */
    PolygonalChain.prototype.translate = function (positionAdd) {
        var x = positionAdd.x, y = positionAdd.y;
        this.translateX(x);
        this.translateY(y);
        this._setLines();
    };
    /**
     * Translate x position of polygonalChain
     *
     * @param xAdd the added x position
     */
    PolygonalChain.prototype.translateX = function (xAdd) {
        this._translateBasedOnAxis(xAdd, "x");
        this._setLines();
    };
    /**
     * Translate y position of polygonalChain
     *
     * @param yAdd the added y position
     */
    PolygonalChain.prototype.translateY = function (yAdd) {
        this._translateBasedOnAxis(yAdd, "y");
        this._setLines();
    };
    /**
     * Rotates the polygonalChain reletivly
     *
     * @param degrees the added rotation to the current rotation
     */
    PolygonalChain.prototype.rotate = function (degrees) {
        this._rotate(degrees);
        this._setLines();
    };
    /**
     * @returns the pixels of the polygonalChain
     */
    PolygonalChain.prototype.getPixels = function () {
        var pixels = [];
        this._lines.forEach(function (line) {
            pixels.push.apply(pixels, line.getPixels());
        });
        return pixels;
    };
    /**
     * @returns The vertices of polygonalChain
     */
    PolygonalChain.prototype.getVertices = function () {
        return this._vertices;
    };
    return PolygonalChain;
}(geometry_1.default));
exports.default = PolygonalChain;
