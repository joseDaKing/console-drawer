"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gets the width of the line based on 2 positions on the line
 * @category UtilitieS
 * @param positions Is array of start and end positions
 */
var getLineWidth = function (positions) {
    var start = positions[0], end = positions[1];
    var xStart = start.x;
    var xEnd = end.x;
    var width = Math.abs(xEnd - xStart);
    return width;
};
exports.default = getLineWidth;
