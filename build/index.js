"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphic_1 = require("./graphic");
exports.Canvas = graphic_1.Canvas;
exports.Engine = graphic_1.Engine;
exports.Pixel = graphic_1.Pixel;
var primal_1 = require("./geometry/primal");
exports.Line = primal_1.Line;
exports.PolygonalChain = primal_1.PolygonalChain;
exports.Polygon = primal_1.Polygon;
var enums_1 = require("./enums");
exports.COLOR_TYPES = enums_1.COLOR_TYPES;
var polygon = new primal_1.Polygon([
    { x: 0, y: 0 },
    { x: 0, y: 20 },
    { x: 20, y: 20 }
], { shape: "*", color: enums_1.COLOR_TYPES.GREEN });
polygon.translate({ x: 15, y: 7 });
var canvas = new graphic_1.Canvas({
    size: {
        height: 35,
        width: 50
    },
    blankStyle: {
        shape: "#",
        color: enums_1.COLOR_TYPES.BLUE
    }
});
canvas.draw(polygon.getPixels());
var engine = new graphic_1.Engine();
engine.addCanvas({
    main: canvas
});
engine.render();
