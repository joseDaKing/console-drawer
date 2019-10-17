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
var getLineLength_1 = __importDefault(require("../utilities/getLineLength"));
var getLineRotation_1 = __importDefault(require("../utilities/getLineRotation"));
var getLinePositions_1 = __importDefault(require("../utilities/getLinePositions"));
var dummyClasses_1 = __importDefault(require("./dummyClasses"));
var mixin_1 = __importDefault(require("../utilities/mixin"));
/**
 * Mixin transform class used for changing the location of a geomtric shape
 * @category Transfrom class
 */
var Location = /** @class */ (function () {
    function Location() {
    }
    /**
     * Translates (Moves reltavily) the position on specific axis
     *
     * @param axis The axis to translate on
     *
     * @param length The length to move
     */
    Location.prototype._translateBasedOnAxis = function (length, axis) {
        this._origin[axis] += length;
        this._vertices.map(function (vertice) {
            vertice[axis] += length;
            return vertice;
        });
    };
    /**
     * Moves the geometry relative from where it is
     *
     * @param axis The axis to translate on
     *
     * @param length The length to translate
     */
    Location.prototype.translate = function (position) {
        this.translateX(position.x);
        this.translateY(position.y);
    };
    /**
     * Translates (Moves reltavily) the position on x axis
     *
     * @param length The length to move
     */
    Location.prototype.translateX = function (length) {
        this._translateBasedOnAxis(length, "x");
    };
    /**
     * Translates (Moves reltavily) the position on y axis
     *
     * @param length The length to move
     */
    Location.prototype.translateY = function (length) {
        this._translateBasedOnAxis(length, "y");
    };
    /**
     * @param location The new locatoin on specific axis
     *
     * @param axis The axis to set the new location on
     */
    Location.prototype._setLocationBasedOnAxis = function (location, axis) {
        var _this = this;
        this._vertices = this._vertices.map(function (vertice) {
            var _a;
            var length = getLineLength_1.default([_this._origin, vertice]);
            var rotation = getLineRotation_1.default([_this._origin, vertice]);
            var newVertice = getLinePositions_1.default({
                position: __assign(__assign({}, _this._origin), (_a = {}, _a[axis] = location, _a)),
                rotation: rotation,
                length: length
            }).end;
            return newVertice;
        });
        this._origin[axis] = location;
    };
    /**
     * @param location The new locatoin
     */
    Location.prototype.setLocation = function (location) {
        this.setLocationX(location.x);
        this.setLocationY(location.y);
    };
    /**
     * @param location The new x locatoin
     */
    Location.prototype.setLocationX = function (location) {
        this._setLocationBasedOnAxis(location, "x");
    };
    /**
     * @param location The new y locatoin
     */
    Location.prototype.setLocationY = function (location) {
        this._setLocationBasedOnAxis(location, "y");
    };
    Location = __decorate([
        mixin_1.default(dummyClasses_1.default)
    ], Location);
    return Location;
}());
exports.default = Location;
