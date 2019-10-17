enum COLOR_TYPES {
    BLACK = "black",
    
    RED = "red",

    GREEN = "green",

    YELLOW = "yellow",

    BLUE = "blue",

    MAGENTA = "magenta",

    CYAN = "cyan",

    WHITE = "white",

    gray = "gray",

    grey = "grey",

    BG_BLACK = "bgBlack",

    BG_RED = "bgRed",

    BG_GREEN = "bgGreen",

    BG_YELLOW = "bgYellow",

    BG_BLUE = "bgBlue",

    BG_MAGENTA = "bgMagenta",

    BG_CYAN = "bgCyan",
    
    BG_WHITE = "bgWhite"
};

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

type Axis = "x" | "y";

type Dimension = "width" | "height";

type LinePosition = [Position, Position];


export {
    Position,
    Size,
    Style,
    Axis,
    Dimension,
    LinePosition,
    COLOR_TYPES
}