"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
/**
 * A function that returns a polygon that represent equilateral triangle
 *
 * @param options The options for the equilateral triangle
 * @category Primal geometry
 */
var createEquilateralTriangle = function (options) {
    var size = options.size, position = options.position, shape = options.shape, color = options.color;
    var x = position.x, y = position.y;
    var area = Math.pow(size, 2) * Math.sin(Math.PI / 3) / 2;
    var width = size;
    var height = area / width;
    var triangle = new __1.Polygon([
        // Bottom Right Vertice
        { x: Math.ceil(x + width / 2),
            y: Math.ceil(y - height / 2) },
        // Bottom Left Vertice
        { x: Math.ceil(x - width / 2),
            y: Math.ceil(y - height / 2) },
        // Top Vertice
        { x: Math.ceil(x), y: Math.ceil(y + height) }
    ], { color: color, shape: shape });
    return triangle;
};
exports.default = createEquilateralTriangle;
