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
/**
 * The class reperesents a line that is defiend with 2 vertices
 * @category Primal geometry
 */
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    /**
     *
     * @param positions The line position
     *
     * @param style  The style
     */
    function Line(positions, style) {
        return _super.call(this, positions, style) || this;
    }
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
     * @param vertices set the new vertices
     */
    Line.prototype.setVertices = function (vertices) {
        var errorMessage = "\n        Wrong argument for the method setVertices, the argument should always be Position Array of size 2\n        ".trim();
        if (vertices.length !== this._vertices.length)
            throw Error(errorMessage);
        if (!Array.isArray(vertices)) {
            var _a = getLinePositions_1.default(vertices), start = _a.start, end = _a.end;
            vertices = [start, end];
        }
        this._vertices = vertices;
    };
    /**
     * @param vertice The new start position
     */
    Line.prototype.setStartVertice = function (vertice) {
        this._vertices[0] = vertice;
    };
    /**
     * @param vertice The new end start position
     */
    Line.prototype.setEndVertice = function (vertice) {
        this._vertices[1] = vertice;
    };
    /**
     * @returns The pixels of the line
     */
    Line.prototype.getPixels = function () {
        ;
        var positions = [this._vertices[0], this._vertices[1]];
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
    return Line;
}(geometry_1.default));
exports.default = Line;
