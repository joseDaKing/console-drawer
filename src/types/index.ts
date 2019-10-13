import {
    COLOR_TYPES
} from "../enums";

type Position = {
    x: number,
    y: number,
};

type Size = {
    height: number,
    width: number
};

type Style = {
    color: COLOR_TYPES,
    shape: string,
};

export {
    Position,
    Size,
    Style
}