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
var getLineRotation_1 = __importDefault(require("../utilities/getLineRotation"));
var getLineLength_1 = __importDefault(require("../utilities/getLineLength"));
var getLinePositions_1 = __importDefault(require("../utilities/getLinePositions"));
var dummyClasses_1 = __importDefault(require("./dummyClasses"));
var mixin_1 = __importDefault(require("../utilities/mixin"));
/**
 * Mixin transform class used for rotating a geometric shape
 * @category Transfrom class
 */
var Rotation = /** @class */ (function () {
    function Rotation() {
    }
    /**
     * Rotates the geometric shape relatavily from the current rotation
     *
     * @param degrees the amount of relative rotation in degrees
     */
    Rotation.prototype.rotate = function (degrees) {
        var _this = this;
        this._vertices = this._vertices.map(function (vertice) {
            var rotation = getLineRotation_1.default([_this._origin, vertice]);
            var length = getLineLength_1.default([_this._origin, vertice]);
            var newRotation = rotation + degrees;
            var newVertice = getLinePositions_1.default({
                position: _this._origin,
                rotation: newRotation,
                length: length
            }).end;
            return newVertice;
        });
        this._rotation += degrees;
    };
    /**
     * @param degrees The degrees set the rotation tp
     */
    Rotation.prototype.setRotation = function (degrees) {
        this.defaultRotation();
        this.rotate(degrees);
    };
    /**
     * Defaults the rotation by setting the rotation to 0 degrees
     */
    Rotation.prototype.defaultRotation = function () {
        this.rotate(-this._rotation);
        this._rotation = 0;
    };
    Rotation = __decorate([
        mixin_1.default(dummyClasses_1.default)
    ], Rotation);
    return Rotation;
}());
;
exports.default = Rotation;
