"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createRegularPolygon_1 = __importDefault(require("./createRegularPolygon"));
/**
 * A function that returns a polygon that represent elipse
 *
 * @param options The options for the elipse
 * @category Primal geometry
 */
var createElipse = function (options) {
    var size = options.size, rotation = options.rotation, position = options.position, color = options.color, shape = options.shape;
    var height = size.height, width = size.width;
    var elipse = createRegularPolygon_1.default({
        vertices: (height <= width
            ?
                width
            :
                height) * 128 / 20,
        rotation: 0,
        size: height,
        color: color,
        shape: shape,
        position: position
    });
    elipse.scaleX(width / height);
    elipse.rotate(rotation);
    return elipse;
};
exports.default = createElipse;
