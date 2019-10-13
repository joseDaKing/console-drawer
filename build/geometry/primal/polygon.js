"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var polygonalChain_1 = __importDefault(require("./polygonalChain"));
var line_1 = __importDefault(require("./line"));
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    function Polygon(vertices, style) {
        return _super.call(this, vertices, style) || this;
    }
    Polygon.prototype._getLines = function () {
        var _this = this;
        var lines = [];
        this._vertices
            .forEach(function (currentVertice, index, array) {
            var nextVertice = array[index + 1];
            if (nextVertice) {
                lines.push(new line_1.default([
                    currentVertice,
                    nextVertice
                ], _this._style));
            }
            else {
                var firstVertice = _this._vertices[0];
                var lastVertice = _this._vertices[_this._vertices.length - 1];
                lines.push(new line_1.default([
                    lastVertice,
                    firstVertice
                ], _this._style));
            }
        });
        return lines;
    };
    return Polygon;
}(polygonalChain_1.default));
exports.default = Polygon;
