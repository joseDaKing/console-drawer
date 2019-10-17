"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getLineHeight_1 = __importDefault(require("../utilities/getLineHeight"));
var getLineWidth_1 = __importDefault(require("../utilities/getLineWidth"));
var dummyClasses_1 = __importDefault(require("./dummyClasses"));
var mixin_1 = __importDefault(require("../utilities/mixin"));
/**
 * Mixin transform class used for scaling a geometric shape
 * @category Transfrom class
 */
var Scale = /** @class */ (function () {
    function Scale() {
    }
    /**
     *
     * @param scale The new scale on specific axis
     *
     * @param axis The axis to scale
     */
    Scale.prototype._scaleBasedOnAxis = function (scale, axis) {
        var _this = this;
        var lengthType = (axis === "x"
            ?
                "width"
            :
                "height");
        var prevScale = this._scale[lengthType];
        var origin = this._origin[axis];
        this._vertices = this._vertices.map(function (vertice) {
            // Vertice position on specific axis
            var verticePosition = vertice[axis];
            var getLength = (axis === "x"
                ?
                    getLineWidth_1.default
                :
                    getLineHeight_1.default);
            // Length between origin and vertice
            var length = getLength([_this._origin, vertice]);
            // original length between origin and vertice on specific axis
            var originalLength = 1 / prevScale * length;
            if (verticePosition < origin) {
                vertice[axis] = origin - originalLength * scale;
            }
            if (origin < verticePosition) {
                vertice[axis] = origin + originalLength * scale;
            }
            return vertice;
        });
        // Set new scale on specific axis for the geometry
        this._scale[lengthType] = scale;
    };
    /**
     * @param scale The new scale
     */
    Scale.prototype.scale = function (scale) {
        this.scaleY(scale.height);
        this.scaleX(scale.width);
    };
    /**
     * @param scale The new scale on x axis
     */
    Scale.prototype.scaleX = function (scale) {
        this._scaleBasedOnAxis(scale, "x");
    };
    /**
     * @param scale The new scale on y axis
     */
    Scale.prototype.scaleY = function (scale) {
        this._scaleBasedOnAxis(scale, "y");
    };
    /**
     * Defaults scale by settings scale to 1
     */
    Scale.prototype.defaultScale = function () {
        this.scaleY(1);
        this.scaleX(1);
    };
    Scale = __decorate([
        mixin_1.default(dummyClasses_1.default)
    ], Scale);
    return Scale;
}());
exports.default = Scale;
