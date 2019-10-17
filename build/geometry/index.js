"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @ignore
 * @hidden
 */
var primal_1 = require("./primal");
exports.Line = primal_1.Line;
exports.Polygon = primal_1.Polygon;
exports.PolygonalChain = primal_1.PolygonalChain;
var createRectangle_1 = __importDefault(require("./createRectangle"));
exports.createRectangel = createRectangle_1.default;
var createSquare_1 = __importDefault(require("./createSquare"));
exports.createSquare = createSquare_1.default;
var createEquilateralTriangle_1 = __importDefault(require("./createEquilateralTriangle"));
exports.createEquilateralTriangle = createEquilateralTriangle_1.default;
var createIsoscelesTriangle_1 = __importDefault(require("./createIsoscelesTriangle"));
exports.createIsoscelesTriangle = createIsoscelesTriangle_1.default;
var createRightTriangle_1 = __importDefault(require("./createRightTriangle"));
exports.createRightTriangle = createRightTriangle_1.default;
var createRegularPolygon_1 = __importDefault(require("./createRegularPolygon"));
exports.createRegulerPolygon = createRegularPolygon_1.default;
var createElipse_1 = __importDefault(require("./createElipse"));
exports.createElipse = createElipse_1.default;
var createCircle_1 = __importDefault(require("./createCircle"));
exports.createCircle = createCircle_1.default;
