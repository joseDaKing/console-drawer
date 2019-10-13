"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getLinePositions_1 = __importDefault(require("../../utilities/getLinePositions"));
var getLineWidth_1 = __importDefault(require("../../utilities/getLineWidth"));
var getLineHeight_1 = __importDefault(require("../../utilities/getLineHeight"));
var getLineRotation_1 = __importDefault(require("../../utilities/getLineRotation"));
var getLineLength_1 = __importDefault(require("../../utilities/getLineLength"));
/**
 * @class The class represent a Geometry object
 */
var Geometry = /** @class */ (function () {
    /**
     * @param vertices The position of each vertice or a object that describes 2 vertices by start position, rotation and the length
     *
     * @param style The style of the geometry lines between each vertice
     */
    function Geometry(vertices, style) {
        this._scale = {
            width: 1,
            height: 1
        };
        this._rotation = 0;
        if (!Array.isArray(vertices)) {
            var _a = getLinePositions_1.default(vertices), start = _a.start, end = _a.end;
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
    Geometry.prototype._getAverageOrigin = function (vertices) {
        var xDefault = 0;
        var yDefault = 0;
        for (var _i = 0, vertices_1 = vertices; _i < vertices_1.length; _i++) {
            var vertice = vertices_1[_i];
            var x = vertice.x, y = vertice.y;
            xDefault += x;
            yDefault += y;
        }
        var length = vertices.length;
        xDefault /= length;
        yDefault /= length;
        var defaultOrigin = {
            x: xDefault,
            y: yDefault
        };
        return defaultOrigin;
    };
    /**
     * Sets the origin to average position of the geometry
     */
    Geometry.prototype.setOriginToCenter = function () {
        this._getAverageOrigin(this._vertices);
    };
    /**
     * Set the origin position
     *
     * @param position The new position for the origin
     */
    Geometry.prototype.setOrigin = function (position) {
        this._origin = position;
    };
    /**
     * Set the x position of the origin
     *
     * @param position The new x position for the origin
     */
    Geometry.prototype.setOriginX = function (position) {
        this._origin.x = position;
    };
    /**
     * Set the y position of the origin
     *
     * @param position The new y position for the origin
     */
    Geometry.prototype.setOriginY = function (position) {
        this._origin.y = position;
    };
    /**
     * @returns The origin position
     */
    Geometry.prototype.getOrigin = function () {
        return this._origin;
    };
    /**
     * @param axis The axis to translate on
     *
     * @param length The length to translate
     */
    Geometry.prototype._translateBasedOnAxis = function (length, axis) {
        this._origin[axis] += length;
        this._vertices.map(function (vertice) {
            vertice[axis] += length;
            return vertice;
        });
    };
    /**
     * @returns the scale of the geometry
     */
    Geometry.prototype.getScale = function () {
        return this._scale;
    };
    /**
     *
     * @param scale The new scale
     *
     * @param axis The axis to scale
     */
    Geometry.prototype._scaleBasedOnAxis = function (scale, axis) {
        var _this = this;
        var lengthType = (axis === "x"
            ?
                "width"
            :
                "height");
        var prevScale = this._scale[lengthType];
        var origin = this._origin[axis];
        this._vertices.map(function (vertice) {
            // Vertice position on specific axis
            var verticePosition = vertice[axis];
            var getLength = (axis === "x"
                ?
                    getLineWidth_1.default
                :
                    getLineHeight_1.default);
            // Length between origin and vertice
            var length = getLength([_this._origin, vertice]);
            // original length between origin and vertice on specific axis
            var originalLength = 1 / prevScale * length;
            if (verticePosition < origin) {
                vertice[axis] = origin - originalLength * scale;
            }
            if (origin < verticePosition) {
                vertice[axis] = origin + originalLength * scale;
            }
        });
        // Set new scale on specific axis for the geometry
        this._scale[lengthType] = scale;
    };
    /**
     * Rotates the geometric shape
     *
     * @param degrees the amount of relative rotation in degrees
     */
    Geometry.prototype._rotate = function (degrees) {
        var _this = this;
        this._vertices = this._vertices.map(function (vertice) {
            var rotation = getLineRotation_1.default([_this._origin, vertice]);
            var length = getLineLength_1.default([_this._origin, vertice]);
            var newRotation = rotation + degrees;
            var newVertice = getLinePositions_1.default({
                position: _this._origin,
                rotation: newRotation,
                length: length
            }).end;
            return newVertice;
        });
        this._rotation += degrees;
    };
    /**
     * @returns The style for the geometry lines
     */
    Geometry.prototype.getStyle = function () {
        return this._style;
    };
    return Geometry;
}());
exports.default = Geometry;
