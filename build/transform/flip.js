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
var mixin_1 = __importDefault(require("../utilities/mixin"));
var apply_1 = __importDefault(require("./apply"));
var scale_1 = __importDefault(require("./scale"));
/**
 * Mixin transform class used for fliping the geometric shape
 * @category Transfrom class
 */
var Flip = /** @class */ (function () {
    function Flip() {
    }
    /**
     * Flips the geometry on specific axis
     *
     * @param axis The axis to flip
     */
    Flip.prototype._flipOnAxis = function (axis) {
        var axisToFlip = (axis === "x"
            ?
                "width"
            :
                "height");
        this._scaleBasedOnAxis(-this._scale[axisToFlip], axis);
        var method = (axis === "x"
            ?
                "applyScaleX"
            :
                "applyScaleY");
        this[method]();
    };
    /**
     * Flips the geometry on x axis
     */
    Flip.prototype.flipX = function () {
        this._flipOnAxis("x");
    };
    /**
     * Flips the geometry on y axis
     */
    Flip.prototype.flipY = function () {
        this._flipOnAxis("y");
    };
    Flip = __decorate([
        mixin_1.default(apply_1.default, scale_1.default)
    ], Flip);
    return Flip;
}());
exports.default = Flip;
