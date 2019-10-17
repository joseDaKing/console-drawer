"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createRectangle_1 = __importDefault(require("./createRectangle"));
/**
 * A function that returns a polygon that represent square
 *
 * @param options The options for the square
 * @category Primal geometry
 */
var createSquare = function (options) {
    var size = options.size, position = options.position, shape = options.shape, color = options.color;
    var square = createRectangle_1.default({
        size: {
            height: size,
            width: size
        },
        position: position,
        shape: shape,
        color: color
    });
    return square;
};
exports.default = createSquare;
