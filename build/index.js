"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __importDefault(require("./graphic/engine"));
var canvas_1 = __importDefault(require("./graphic/canvas"));
var primal_1 = require("./geometry/primal");
var enums_1 = require("./enums");
var canvas = new canvas_1.default({
    size: {
        height: 10,
        width: 10
    },
    blankStyle: {
        shape: "#",
        color: enums_1.COLOR_TYPES.CYAN
    }
});
var polygon = new primal_1.Polygon([
    { x: 0, y: 0 },
    { x: 0, y: 9 },
    { x: 9, y: 9 },
    { x: 9, y: 0 }
], { color: enums_1.COLOR_TYPES.RED, shape: "*" });
canvas.draw(polygon.getPixels());
var engine = new engine_1.default();
engine.addCanvas({ canvas: canvas });
engine.render();
