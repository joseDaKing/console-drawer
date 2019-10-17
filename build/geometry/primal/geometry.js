"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getLinePositions_1 = __importDefault(require("../../utilities/getLinePositions"));
var mixin_1 = __importDefault(require("../../utilities/mixin"));
var transform_1 = __importDefault(require("../../transform/transform"));
/**
 * The class represent a abstract geometry object that is defiend with vertices
 * @category Primal geometry
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
     * @returns the scale of the geometry
     */
    Geometry.prototype.getScale = function () {
        return this._scale;
    };
    /**
     * @returns the rotation of the geometry
     */
    Geometry.prototype.getRotation = function () {
        return this._rotation;
    };
    /**
     * @returns The style for the geometry lines
     */
    Geometry.prototype.getStyle = function () {
        return this._style;
    };
    /**
     * Sets new the style of the line
     *
     * @param style the new style
     */
    Geometry.prototype.setStyle = function (style) {
        this._style = style;
    };
    /**
     * Sets the new color of the line
     *
     * @param color the new color
     */
    Geometry.prototype.setColor = function (color) {
        this._style.color = color;
    };
    /**
     * Set the new shape
     *
     * @param shape The new shape
     */
    Geometry.prototype.setShape = function (shape) {
        this._style.shape = shape;
    };
    Geometry = __decorate([
        mixin_1.default(transform_1.default)
    ], Geometry);
    return Geometry;
}());
exports.default = Geometry;
