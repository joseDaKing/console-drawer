// Imports
import {
    Size,
    Position,
    Style
} from "../types";

import Pixel from "./pixel";


// Types
type CanvasConstructorArg = {
    size: Size,
    blankStyle: Style,
}

type PixelsMetadataRow = Record <number, Style>

type PixelsMetadata = Record <number, PixelsMetadataRow>;

type DrawPixelOptions = {
    position: Position,
    style: Style
};

type Metadata = {
    size: Size,
    blankStyle: Style,
    pixelsMetadata: PixelsMetadata
};

type FillBasedOnStyleOption = {
    filter: Style,
    style: Style,
    strict: boolean
}

type EraseBasedOnStyleOption = {
    filter: Style,
    strict: boolean
}

type LoopPixelsMetadataOption = (position: Position, style: Style) => void


type CompareStyleOption = {
    styles: [Style, Style],
    strict: boolean
}

type EraseOptions = {
    pixels: Pixel[],
    strict: boolean
}

type  DrawOptions = Pixel[]


// Code

/**
 * @class Used for createing a canvas that can be drawn on with Pixels
 */
class Canvas {
    
    private _size: Size;

    private _blankStyle: Style;

    private _pixelsMetadata: PixelsMetadata;

    /**
     * @param options Options for the creation of the canvas
     */
    constructor(options: CanvasConstructorArg) {

        const {
            size,
            blankStyle,
        } = options;

        this._size = size;

        this._blankStyle = blankStyle;

        this._pixelsMetadata = {};
    }

    /**
     * Set size of the canvas
     * 
     * @param size New size
     */
    public setSize(size: number): void {
        this._size.height = size;
        this._size.width = size;
    }

    /**
     * Set height of the canvas
     * 
     * @param height New height
     */
    public setHeight(height: number): void {
        this._size.height = height;
    }

    /**
     * Set width of the canvas
     * 
     * @param width New width
     */
    public setWidth(width: number): void {
        this._size.width = width;
    }

    /**
     * Fill canvas with specific style
     * 
     * @param style Style to fill canvas with
     */
    public fillAll(style: Style): void {
        const {
            height,
            width
        } = this._size;

        for (let y = 0; y < height; y++) {

            for (let x = 0; x < width; x++) {

                const position = {x, y};

                this._drawPixel({position, style});
            }
        }
    }

    /**
     * Fills part of the canvas with specific style based on filtering specific style
     * 
     * @param options Style to be filtered and filled with new style
     */
    public fillBasedOnStyle(options: FillBasedOnStyleOption): void {
        
        const {
            filter,
            style,
            strict
        } = options;

        this._loopPixelsMetadata((position, pixelStyle) => {
            
            const isMatching = this._comparePixelStyle({
                styles: [
                    filter,
                    pixelStyle
                ],
                strict
            });

            if (isMatching) {
                this._drawPixel({position, style});
            }
        });
    }

    /**
     * Draws on canvas with help of pixels
     * 
     * @param options Pixels to be drawn and the style for pixels with undefined style 
     */
    public draw(pixels: DrawOptions): void {

        for (const pixel of pixels) {

            const position: Position = pixel.getPosition();

            const {
                x: xPosition,
                y: yPosition
            } = position;

            const {
                height,
                width
            } = this._size;

            const isXpositionInCanvas: boolean = 0 <= xPosition && xPosition < width;

            const isYpositionInCanvas: boolean = 0 <= yPosition && yPosition < height;

            const isPixelInCanvas: boolean = isXpositionInCanvas && isYpositionInCanvas;

            if (isPixelInCanvas) {

                const style = pixel.getStyle();

                this._drawPixel({position, style});
            }
        }
    }

    /**
     * Draw pixel metadata
     * 
     * @param options Draws single pixel metadata based on position and styles
     */
    private _drawPixel(options: DrawPixelOptions): void {
        const {
            position,
            style
        } = options;

        const {
            x: xPosition,
            y: yPosition
        } = position;
        
        // Row
        this._pixelsMetadata[yPosition] = {

            // Copy already defined cells in the row if exist
            ...this._pixelsMetadata[yPosition]
        }

        // Cell
        this._pixelsMetadata[yPosition][xPosition] = style;
    }

    /** 
     * @param positions Positions of pixels to delete
     */
    public erase(options: EraseOptions): void {

        let {
            pixels,
            strict: isStrict
        }  = options;

        for (const pixel of pixels) {
            
            const {x, y} = pixel.getPosition();

            const row = this._pixelsMetadata[x];

            if (row) {

                const cell = row[y];

                if (cell) {

                    const position = {x, y};

                    const isSameStyle = this._comparePixelStyle({
                        styles: [
                            cell, 
                            pixel.getStyle()
                        ],
                        strict: true
                    });

                    if (isStrict && isSameStyle) {
                        this._erasePixel(position);
                    }

                    else {
                        this._erasePixel(position);
                    }
                }
            }
        }
    }

    /**
     * Erases whole canvas
     */
    public eraseAll(): void {
        this._pixelsMetadata = {};
    }

    /**
     * Erases part of the canvas based on style
     * 
     * @param options The style to be eraseed
     */
    public eraseBasedOnStyle(options: EraseBasedOnStyleOption): void {

        const {
            filter,
            strict
        } = options;

        this._loopPixelsMetadata((position, pixelStyle) => {
            
            const isMatching = this._comparePixelStyle({
                styles: [
                    filter,
                    pixelStyle
                ],
                strict
            });

            if (isMatching) {

                this._erasePixel(position);
            }
        });
    }

    /**
     * Erases single pixel metadata based on position
     * 
     * @param position Erases pixel metadata based on position
     */
    private _erasePixel(position: Position): void {
        
        const {x, y} = position;

        delete this._pixelsMetadata[y][x];
        
        const isRowEmpty = Number(Object.keys(this._pixelsMetadata[y])) === y;

        if (isRowEmpty) {

            delete this._pixelsMetadata[y];
        }
    }

    /**
     * Loops trough pixel metadata
     * 
     * @param fn Function to execute when looping trough each pixel metadata
     */
    private _loopPixelsMetadata(fn: LoopPixelsMetadataOption): void {

        for (const y in this._pixelsMetadata) {

            const row: PixelsMetadataRow = this._pixelsMetadata[y];

            for (const x in row) {

                const position = {
                    x: Number(x), 
                    y: Number(y)
                };

                const style: Style = this._pixelsMetadata[y][x];

                fn(position, style);
            }
        }
    }

    /**
     * Compares if 2 pixel are the same
     * 
     * @param options Compare 2 pixel data
     */
    private _comparePixelStyle(options: CompareStyleOption): boolean {
        
        const {
            styles,
            strict: isStrict
        } = options;

        const [style1, style2] = styles;

        const {
            color: style1Color,
            shape: style1Shape
        } = style1;

        const {
            color: style2Color,
            shape: style2Shape
        } = style2; 

        const isColorMatching: boolean = style1Color === style2Color;

        const isShapeMatching: boolean = style1Shape === style2Shape;

        const isMatching: boolean = (
            isStrict ? 
                isColorMatching && 
                isShapeMatching
            :
                isColorMatching || 
                isShapeMatching
        );

        return isMatching;
    }

    /**
     * @returns Metadata that describes the Canvas
     */
    public getMetadata(): Metadata {
        return {
            size: this._size,
            blankStyle: this._blankStyle,
            pixelsMetadata: this._pixelsMetadata,

        };
    }
}


// Exports
export default Canvas;

export {
    CanvasConstructorArg,
    
    PixelsMetadataRow,
    
    PixelsMetadata,
    
    Metadata,
    
    FillBasedOnStyleOption,

    EraseBasedOnStyleOption,
}