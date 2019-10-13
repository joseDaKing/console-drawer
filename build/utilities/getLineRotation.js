"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getLineLength_1 = __importDefault(require("./getLineLength"));
/**
 * Gets the rotation based on 2 position on the line
 *
 * @param positions Is array of start and end positions
 */
var getLineRotation = function (positions) {
    var start = positions[0], end = positions[1];
    var yStart = start.y;
    var yEnd = end.y;
    var height = (yStart - yEnd);
    var length = getLineLength_1.default(positions);
    var radians = Math.asin(height / length);
    var degrees = radians / Math.PI * 180;
    if (isNaN(degrees))
        return 0;
    if (degrees < 0)
        return 360 - degrees;
    return degrees;
};
exports.default = getLineRotation;
