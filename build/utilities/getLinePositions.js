"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gets the start and end position by line length, rotation (degrees) and start position
 *
 * @param options Options consists of the line length, rotation and start position
 */
var getLinePositions = function (options) {
    var startPosition = options.position, length = options.length, degrees = options.rotation;
    var xStart = startPosition.x, yStart = startPosition.y;
    var radians = degrees * Math.PI / 180;
    var sinValue = Math.sin(radians);
    var cosValue = Math.cos(radians);
    var width = cosValue * length;
    var height = sinValue * length;
    var xEnd = xStart + width;
    var yEnd = yStart + height;
    var endPosition = { x: xEnd, y: yEnd };
    return {
        start: startPosition,
        end: endPosition
    };
};
exports.default = getLinePositions;
