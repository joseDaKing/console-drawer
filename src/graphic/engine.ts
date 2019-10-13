// Imports
import Canvas, {
    PixelsMetadataRow,
    PixelsMetadata,
    Metadata
} from "./canvas";

import styles from "ansi-colors";
import { 
    Style
} from "../types";


// Types
type changeCanvasIndexOptions = {
    name: string,
    index: number
};

type Canvases = Record <string, Canvas>;

type CanvasWithIndex = {
    canvas: Canvas,
    index: number
};

type CanvasesWithIndex = Record <string, CanvasWithIndex>;

// Code

/**
 * @class Used for rendering a canvas
 */
class Engine {

    private _canvases: CanvasesWithIndex = {};

    private _canvasAmount: number = 0;

    /**
     * Used for Adding one canvas or multiple canvanses 
     * 
     * @param canvasesToAdd Add one canvas or multipple canvases
     */
    public addCanvas(canvasesToAdd: Canvases): void {
        
        for (const name in canvasesToAdd) {
            
            const canvas: Canvas = canvasesToAdd[name];

            this._canvases[name] = {
                index: this._canvasAmount, 
                canvas
            };

            this._canvasAmount ++;
        }
    }

    /**
     * Used for deleting one canvas or multiple canvanses
     * 
     * @param canvasesToDelete Delete one canvas or multiple canvases
     */
    public deleteCanvas(canvasesToDelete: string[]): void {

        for (const name of canvasesToDelete) {
            
            delete this._canvases[name];

            this._canvasAmount --;
        }

        // Reset index for reaming canvases
        let index = 0;

        for (const name in this._canvases) {

            const {
                canvas
            } = this._canvases[name];

            this._canvases[name] = {index, canvas};

            index ++;
        }
    }

    /**
     * Changes the position for a given canvas
     * 
     * @param options The canvas name to change position and new position to be set
     */
    public changeCanvasIndex(options: changeCanvasIndexOptions): void {

        const {
            name,
            index
        } = options;

        // Canvas name of given index
        let indexCanvasName = this._getCanvasNameByIndex(index);

        // Is canvas name defined
        if (indexCanvasName) {
    
            // Current index of the canvas 
            const currentIndex: number = this._canvases[name].index;
            
            // Swap indexes
            this._canvases[indexCanvasName].index = currentIndex;
    
            this._canvases[name].index = index;
        }
    }

    /**
     * @param index Index of the canvas
     * 
     * @returns The canvas if existing
     */
    private _getCanvasNameByIndex(index: number): string | void {

        for (const name in this._canvases) {

            const {
                index: canvasIndex
            } = this._canvases[name];

            if (canvasIndex === index) {
                return name;
            }
        }
    }

    /**
     * Renders the canvases based on order of the canvases 
     * The canvases will be drawn on top of eachother
     * The upermoste canvas will be drawn on top of all canvases
     */
    public render(): void {

        const pixelMetadata: PixelsMetadata = this._getCanvasesPixelMetadata();

        const {
            size,
            blankStyle
        } = this._getCanvas()[this._canvasAmount - 1].getMetadata();

        const { 
            height,
            width
        } = size;

        let output: string = "";

        for (let y = height - 1; y >= 0; y--) {

            const row: PixelsMetadataRow = pixelMetadata[y];

            let style: Style;

            for (let x = 0; x < width; x++) {

                const doesRowAndCellExist = row && row[x];

                if (doesRowAndCellExist) {

                    const cell = row[x];

                    style = cell;
                }

                else {
                    style = blankStyle;
                }

                const {
                    color,
                    shape
                } = style;

                output += styles[color](shape);

                if (x !== (width - 1)) {
                    output += styles[color](" ");
                }
            }

            output += "\n";
        }

        console.log(output);
    }

    /**
     * Concates all pixelmetadata from all canvases
     * 
     * @returns The concated Pixelmetadata
     */
    private _getCanvasesPixelMetadata(): PixelsMetadata {

        const canvasValues: Canvas[] = this._getCanvas(); 

        const canvasesMetadata: Metadata[] = canvasValues.map(canvas => canvas.getMetadata());

        const canvasesPixelMetadata: PixelsMetadata[] = canvasesMetadata.map(metadata => metadata.pixelsMetadata);

        let concatedPixelMetadata: PixelsMetadata = {};

        for (const pixelMetadata of canvasesPixelMetadata) {
            
            concatedPixelMetadata = this._concatCanvansesPixelMetadata(concatedPixelMetadata, pixelMetadata);
        }

        return concatedPixelMetadata;
    }

    /**
     * 
     * Concats 2 pixel metadata
     * 
     * @param pixelsMetadata1
     * 
     * @param pixelsMetadata2
     */
    private _concatCanvansesPixelMetadata(pixelsMetadata1: PixelsMetadata, pixelsMetadata2: PixelsMetadata): PixelsMetadata {
        pixelsMetadata1 = {
            ...pixelsMetadata2,
            ...pixelsMetadata1
        };

        pixelsMetadata2 = {
            ...pixelsMetadata1,
            ...pixelsMetadata2
        };

        const newPixelMetadata: PixelsMetadata = {};

        for (const row in pixelsMetadata1) {

            const pixelsMetadataRow1: PixelsMetadataRow = pixelsMetadata1[row];

            const pixelsMetadataRow2: PixelsMetadataRow = pixelsMetadata2[row];

            newPixelMetadata[row] = {
                ...pixelsMetadataRow1,
                ...pixelsMetadataRow2
            }
        }

        return newPixelMetadata;
    }

    /**
     * @returns The array Canvas objects 
     */
    private _getCanvas(): Canvas[] {
        
        const canvasValues: Canvas[] = [];

        for (const canvasName in this._canvases) {

            const canvas: Canvas = this._canvases[canvasName].canvas;

            canvasValues.push(canvas);
        }

        return canvasValues;
    }
 };


// Exports
export default Engine;

export {
    Canvases,
    changeCanvasIndexOptions
}