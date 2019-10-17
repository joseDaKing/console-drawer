"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphic_1 = require("./graphic");
exports.Canvas = graphic_1.Canvas;
exports.Engine = graphic_1.Engine;
exports.Pixel = graphic_1.Pixel;
var geometry_1 = require("./geometry");
exports.Line = geometry_1.Line;
exports.PolygonalChain = geometry_1.PolygonalChain;
exports.Polygon = geometry_1.Polygon;
exports.createRectangel = geometry_1.createRectangel;
exports.createSquare = geometry_1.createSquare;
exports.createEquilateralTriangle = geometry_1.createEquilateralTriangle;
exports.createIsoscelesTriangle = geometry_1.createIsoscelesTriangle;
exports.createRightTriangle = geometry_1.createRightTriangle;
exports.createRegulerPolygon = geometry_1.createRegulerPolygon;
exports.createElipse = geometry_1.createElipse;
exports.createCircle = geometry_1.createCircle;
var types_1 = require("./types");
exports.COLOR_TYPES = types_1.COLOR_TYPES;
var line = new geometry_1.Line([
    { x: 0, y: 0 },
    { x: 9, y: 9 }
], { color: types_1.COLOR_TYPES.RED, shape: "*" });
var canvas = new graphic_1.Canvas({
    size: {
        width: 20,
        height: 20
    },
    blankStyle: {
        color: types_1.COLOR_TYPES.BG_BLACK,
        shape: " "
    }
});
canvas.draw(line.getPixels());
graphic_1.Engine.addCanvas({ canvas: canvas });
graphic_1.Engine.render();
