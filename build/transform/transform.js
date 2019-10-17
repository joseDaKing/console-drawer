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
var flip_1 = __importDefault(require("./flip"));
var location_1 = __importDefault(require("./location"));
var rotation_1 = __importDefault(require("./rotation"));
var scale_1 = __importDefault(require("./scale"));
/**
 * A mixin class used for transforming geometric shape
 * @category Transfrom class
 */
var Transform = /** @class */ (function () {
    function Transform() {
    }
    Transform = __decorate([
        mixin_1.default(apply_1.default, flip_1.default, location_1.default, rotation_1.default, scale_1.default)
    ], Transform);
    return Transform;
}());
;
exports.default = Transform;
