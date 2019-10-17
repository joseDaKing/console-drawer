"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
/**
 * A function that returns a polygon that represent rectangel
 *
 * @param options The options for the rectangel
 * @category Primal geometry
 */
var createRectangel = function (options) {
    var size = options.size, position = options.position, shape = options.shape, color = options.color;
    var x = position.x, y = position.y;
    var height = size.height, width = size.width;
    var rectangel = new __1.Polygon([
        // Bottom Left Vertice
        { x: x - width / 2,
            y: y - height / 2 },
        // Top Left Vertice
        { x: x - width / 2,
            y: y + height / 2 },
        // Top Right Vertice
        { x: x + width / 2,
            y: y + height / 2 },
        // Bottom Right Vertice
        { x: x + width / 2,
            y: y - height / 2 },
    ], { shape: shape, color: color });
    return rectangel;
};
exports.default = createRectangel;
