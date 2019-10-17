import {
    Canvas,
    Engine,
    Pixel
} from "./graphic";

import {
    Line,
    PolygonalChain,
    Polygon,
    createRectangel,
    createSquare,
    createEquilateralTriangle,
    createIsoscelesTriangle,
    createRightTriangle,
    createRegulerPolygon,
    createElipse,
    createCircle
} from "./geometry"

import {
    COLOR_TYPES
} from "./types";

export {
    COLOR_TYPES,
    Canvas,
    Engine,
    Pixel,
    Line,
    PolygonalChain,
    Polygon,
    createRectangel,
    createSquare,
    createEquilateralTriangle,
    createIsoscelesTriangle,
    createRightTriangle,
    createRegulerPolygon,
    createElipse,
    createCircle
}

const line: Line = new Line([
    {x: 0, y: 0},
    {x: 9, y: 9}
], {color: COLOR_TYPES.RED, shape: "*"});

const canvas: Canvas = new Canvas({
    size: {
        width: 20,
        height: 20
    },
    blankStyle: {
        color: COLOR_TYPES.BG_BLACK,
        shape: " "
    }
});

canvas.draw(line.getPixels());

Engine.addCanvas({canvas});

Engine.render();