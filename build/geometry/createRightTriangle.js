"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
/**
 * A function that returns a polygon that represent right triangle
 *
 * @param options The options for the right triangle
 * @category Primal geometry
 */
var createRightTriangle = function (options) {
    var size = options.size, position = options.position, shape = options.shape, color = options.color;
    var x = position.x, y = position.y;
    var height = size.height, width = size.width;
    var triangle = new __1.Polygon([
        // Top Vertice
        { x: Math.ceil(x - width / 2),
            y: Math.ceil(y + height / 2) },
        // Bottom Right Vertice
        { x: Math.ceil(x + width / 2),
            y: Math.ceil(y - height / 2) },
        // Bottom Left Vertice
        { x: Math.ceil(x - width / 2),
            y: Math.ceil(y - height / 2) },
    ], { shape: shape, color: color });
    return triangle;
};
exports.default = createRightTriangle;
