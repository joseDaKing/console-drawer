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
var createElipse_1 = __importDefault(require("./createElipse"));
/**
 * A function that returns a polygon that represent circle
 *
 * @param options The options for the circle
 *
 * @category Secondary geometry
 */
var createCircle = function (options) {
    var size = options.size;
    var circle = createElipse_1.default(__assign(__assign({}, options), { rotation: 0, size: {
            height: size,
            width: size
        } }));
    return circle;
};
exports.default = createCircle;
