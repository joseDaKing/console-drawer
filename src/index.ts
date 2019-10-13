import {
    Canvas,
    Engine,
    Pixel
} from "./graphic";

import {
    Line,
    PolygonalChain,
    Polygon
} from "./geometry/primal"

import {
    COLOR_TYPES
} from "./enums";

export {
    Canvas,
    Engine,
    Pixel,
    Line,
    PolygonalChain,
    Polygon,
    COLOR_TYPES
}


const polygon = new Polygon([
    {x: 0, y: 0},
    {x: 0, y: 20},
    {x: 20, y: 20}
], {shape: "*", color: COLOR_TYPES.GREEN});

polygon.translate({x: 15, y: 7});

const canvas = new Canvas({
    size: {
        height: 35,
        width: 50
    },
    blankStyle: {
        shape: "#",
        color: COLOR_TYPES.BLUE
    }
});

canvas.draw(polygon.getPixels());

const engine = new Engine();

engine.addCanvas({
    main: canvas
});

engine.render();