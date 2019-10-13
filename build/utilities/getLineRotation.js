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
    var yStart = start.y, xStart = start.x;
    var yEnd = end.y, xEnd = end.x;
    var height = yEnd - yStart;
    var length = getLineLength_1.default(positions);
    var radians = Math.asin(height / length);
    var degrees = radians * 180 / Math.PI;
    if (xEnd < xStart) {
        degrees = 180 - degrees;
    }
    return degrees;
};
exports.default = getLineRotation;
