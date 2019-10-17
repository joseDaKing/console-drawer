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
var dummyClasses_1 = __importDefault(require("./dummyClasses"));
var mixin_1 = __importDefault(require("../utilities/mixin"));
/**
 * Mixin transform class used for applying the Transformation of the geometric shape
 * @category Transfrom class
 */
var Apply = /** @class */ (function () {
    function Apply() {
    }
    /**
     * Apply the transformation
     */
    Apply.prototype.applyTransformation = function () {
        this.applyRotation();
        this.applyScale();
    };
    /**
     * Apply the rotation
     */
    Apply.prototype.applyRotation = function () {
        this._rotation = 0;
    };
    /**
     * Apply the scale
     */
    Apply.prototype.applyScale = function () {
        this.applyScaleX();
        this.applyScaleY();
    };
    /**
     * Apply the scale x
     */
    Apply.prototype.applyScaleX = function () {
        this._scale.width = 1;
    };
    /**
     * Apply the scale y
     */
    Apply.prototype.applyScaleY = function () {
        this._scale.height = 1;
    };
    Apply = __decorate([
        mixin_1.default(dummyClasses_1.default)
    ], Apply);
    return Apply;
}());
exports.default = Apply;
