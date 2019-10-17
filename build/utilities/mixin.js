"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A mixin decorator used for mixin classes instead of extending
 * @category Graphic class
 * @param sources The classes to mixin
 */
var mixin = function () {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return function (target) {
        sources
            .forEach(function (source) {
            Object
                .getOwnPropertyNames(source
                .prototype).forEach(function (name) {
                Object.defineProperty(target
                    .prototype, name, Object
                    .getOwnPropertyDescriptor(source.prototype, name));
            });
        });
    };
};
exports.default = mixin;
