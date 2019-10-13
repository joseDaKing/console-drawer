import Engine from "./graphic/engine";

import Canvas from "./graphic/canvas";

import { Polygon } from "./geometry/primal"

import { 
    COLOR_TYPES 
} from "./enums";

const canvas = new Canvas({
    size: {
        height: 10,
        width: 10
    },
    blankStyle: {
        shape: "#",
        color: COLOR_TYPES.CYAN
    }
});

const polygon = new  Polygon([
    {x: 0, y: 0},
    {x: 0, y: 9},
    {x: 9, y: 9},
    {x: 9, y: 0}
], {color: COLOR_TYPES.RED, shape: "*"});

canvas.draw(polygon.getPixels());

const engine = new Engine();

engine.addCanvas({canvas});

engine.render();