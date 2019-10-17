"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get line height based on 2 positions of the line
 * @category UtilitieS
 * @param positions Is array of start and end positions
 */
var getLineHeight = function (positions) {
    var start = positions[0], end = positions[1];
    var yStart = start.y;
    var yEnd = end.y;
    var height = Math.abs(yEnd - yStart);
    return height;
};
exports.default = getLineHeight;
