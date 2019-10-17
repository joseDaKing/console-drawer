"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ansi_colors_1 = __importDefault(require("ansi-colors"));
// Code
/**
 * Used for rendering a canvas
 * @category Graphic class
 */
var Engine = /** @class */ (function () {
    function Engine() {
    }
    /**
     * Used for Adding one canvas or multiple canvanses
     *
     * @param canvasesToAdd Add one canvas or multipple canvases
     */
    Engine.addCanvas = function (canvasesToAdd) {
        for (var name_1 in canvasesToAdd) {
            var canvas = canvasesToAdd[name_1];
            this._canvases[name_1] = {
                index: this._canvasAmount,
                canvas: canvas
            };
            this._canvasAmount++;
        }
    };
    /**
     * Used for deleting one canvas or multiple canvanses
     *
     * @param canvasesToDelete Delete one canvas or multiple canvases
     */
    Engine.deleteCanvas = function (canvasesToDelete) {
        for (var _i = 0, canvasesToDelete_1 = canvasesToDelete; _i < canvasesToDelete_1.length; _i++) {
            var name_2 = canvasesToDelete_1[_i];
            delete this._canvases[name_2];
            this._canvasAmount--;
        }
        // Reset index for reaming canvases
        var index = 0;
        for (var name_3 in this._canvases) {
            var canvas = this._canvases[name_3].canvas;
            this._canvases[name_3] = { index: index, canvas: canvas };
            index++;
        }
    };
    /**
     * Changes the position for a given canvas
     *
     * @param options The canvas name to change position and new position to be set
     */
    Engine.changeCanvasIndex = function (options) {
        var name = options.name, index = options.index;
        // Canvas name of given index
        var indexCanvasName = this._getCanvasNameByIndex(index);
        // Is canvas name defined
        if (indexCanvasName) {
            // Current index of the canvas 
            var currentIndex = this._canvases[name].index;
            // Swap indexes
            this._canvases[indexCanvasName].index = currentIndex;
            this._canvases[name].index = index;
        }
    };
    /**
     * @param index Index of the canvas
     *
     * @returns The canvas if existing
     */
    Engine._getCanvasNameByIndex = function (index) {
        for (var name_4 in this._canvases) {
            var canvasIndex = this._canvases[name_4].index;
            if (canvasIndex === index) {
                return name_4;
            }
        }
    };
    /**
     * Renders the canvases based on order of the canvases
     * The canvases will be drawn on top of eachother
     * The upermoste canvas will be drawn on top of all canvases
     */
    Engine.render = function () {
        var pixelMetadata = this._getCanvasesPixelMetadata();
        var _a = this._getCanvas()[this._canvasAmount - 1].getMetadata(), size = _a.size, blankStyle = _a.blankStyle;
        var height = size.height, width = size.width;
        var output = "";
        for (var y = height - 1; y >= 0; y--) {
            var row = pixelMetadata[y];
            var style = void 0;
            for (var x = 0; x < width; x++) {
                var doesRowAndCellExist = row && row[x];
                if (doesRowAndCellExist) {
                    var cell = row[x];
                    style = cell;
                }
                else {
                    style = blankStyle;
                }
                var color = style.color, shape = style.shape;
                output += ansi_colors_1.default[color](shape);
                if (x !== (width - 1)) {
                    output += ansi_colors_1.default[color](" ");
                }
            }
            output += "\n";
        }
        console.log(output);
    };
    /**
     * Concates all pixelmetadata from all canvases
     *
     * @returns The concated Pixelmetadata
     */
    Engine._getCanvasesPixelMetadata = function () {
        var canvasValues = this._getCanvas();
        var canvasesMetadata = canvasValues.map(function (canvas) { return canvas.getMetadata(); });
        var canvasesPixelMetadata = canvasesMetadata.map(function (metadata) { return metadata.pixelsMetadata; });
        var concatedPixelMetadata = {};
        for (var _i = 0, canvasesPixelMetadata_1 = canvasesPixelMetadata; _i < canvasesPixelMetadata_1.length; _i++) {
            var pixelMetadata = canvasesPixelMetadata_1[_i];
            concatedPixelMetadata = this._concatCanvansesPixelMetadata(concatedPixelMetadata, pixelMetadata);
        }
        return concatedPixelMetadata;
    };
    /**
     *
     * Concats 2 pixel metadata
     *
     * @param pixelsMetadata1
     *
     * @param pixelsMetadata2
     */
    Engine._concatCanvansesPixelMetadata = function (pixelsMetadata1, pixelsMetadata2) {
        pixelsMetadata1 = __assign(__assign({}, pixelsMetadata2), pixelsMetadata1);
        pixelsMetadata2 = __assign(__assign({}, pixelsMetadata1), pixelsMetadata2);
        var newPixelMetadata = {};
        for (var row in pixelsMetadata1) {
            var pixelsMetadataRow1 = pixelsMetadata1[row];
            var pixelsMetadataRow2 = pixelsMetadata2[row];
            newPixelMetadata[row] = __assign(__assign({}, pixelsMetadataRow1), pixelsMetadataRow2);
        }
        return newPixelMetadata;
    };
    /**
     * @returns The array Canvas objects
     */
    Engine._getCanvas = function () {
        var canvasValues = [];
        for (var canvasName in this._canvases) {
            var canvas = this._canvases[canvasName].canvas;
            canvasValues.push(canvas);
        }
        return canvasValues;
    };
    Engine._canvases = {};
    Engine._canvasAmount = 0;
    return Engine;
}());
;
// Exports
exports.default = Engine;
