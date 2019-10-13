// Imports
import {
    Position,
    Style
} from "../types";


// Code

/**
 * @class Used for definning a pixel in canvas.
 */
class Pixel {
    
    private _position: Position;

    private _style: Style; 

    /**
     * @constructor
     * 
     * @param position      The position of the pixel
     * 
     * @param style         The style of the pixel
     */
    constructor(position: Position, style: Style) {

        this._position = {
            
            x: Math.round(position.x),

            y: Math.round(position.y)
        };

        this._style = style;
    }

    /**
     * @returns The position of the pixel
     */
    public getPosition(): Position {
        return this._position;
    }
    
    /**
     * @returns The style of the pixel
     */
    public getStyle(): Style {
        return this._style;
    }
};


// Exports
export default Pixel;