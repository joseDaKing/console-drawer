"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getLineWidth_1 = __importDefault(require("./getLineWidth"));
var getLineHeight_1 = __importDefault(require("./getLineHeight"));
/**
 * Get the line length based on 2 positions of the line
 *
 * @param positions Is array of start and end positions
 */
var getLineLength = function (positions) {
    var width = getLineWidth_1.default(positions);
    var height = getLineHeight_1.default(positions);
    var length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    return length;
};
exports.default = getLineLength;
