"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var getLinePositions_1 = __importDefault(require("../utilities/getLinePositions"));
/**
 * A function that returns a polygon that represent isosceles n-gon (hexgon, pentagon ...)
 *
 * @param options The options for the n-gon
 * @category Primal geometry
 */
var createRegularPolygon = function (options) {
    var position = options.position, verticeAmount = options.vertices, offset = options.rotation, length = options.size, color = options.color, shape = options.shape;
    var vertices = [];
    for (var degrees = 0; degrees <= 360; degrees += 360 / verticeAmount) {
        var vertice = getLinePositions_1.default({
            position: position,
            rotation: degrees + offset,
            length: length
        }).end;
        vertices.push({
            x: Math.ceil(vertice.x),
            y: Math.ceil(vertice.y)
        });
    }
    var egularPolygon = new __1.Polygon(vertices, { color: color, shape: shape });
    return egularPolygon;
};
exports.default = createRegularPolygon;
