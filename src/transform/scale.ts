import getLineHeight from "../utilities/getLineHeight";
import {Position, Size, Axis, LinePosition} from "../types";
import getLineWidth from "../utilities/getLineWidth";
import DummyData from "./dummyClasses";
import mixin from "../utilities/mixin";

/**
 * Mixin transform class used for scaling a geometric shape
 * @category Transfrom class
 */
@mixin(DummyData)
class Scale {
    
    /**
     * 
     * @param scale The new scale on specific axis
     * 
     * @param axis The axis to scale
     */
    protected _scaleBasedOnAxis(scale: number, axis: Axis): void {

        const lengthType: "width" | "height" = (
            axis === "x"
            ? 
            "width" 
            : 
            "height"
        );

        const prevScale: number = this._scale[lengthType]; 

        const origin: number = this._origin[axis];

        this._vertices = this._vertices.map((vertice: Position): Position => {
            
            // Vertice position on specific axis
            const verticePosition: number = vertice[axis];

            const getLength: (positions: LinePosition) => number = (
                axis === "x"
                ?
                getLineWidth
                :
                getLineHeight
            );

            // Length between origin and vertice
            const length: number = getLength([this._origin, vertice]);

            // original length between origin and vertice on specific axis
            const originalLength: number = 1 / prevScale * length;

            if (verticePosition < origin) {

                vertice[axis] = origin - originalLength * scale;
            }

            if (origin < verticePosition) {

                vertice[axis] = origin + originalLength * scale;
            }

            return vertice;
        });

        // Set new scale on specific axis for the geometry
        this._scale[lengthType] = scale;
    }
    
    /**
     * @param scale The new scale
     */
    public scale(scale: Size): void {
        
        this.scaleY(scale.height);

        this.scaleX(scale.width)
    }

    /**
     * @param scale The new scale on x axis
     */
    public scaleX(scale: number): void {
        
        this._scaleBasedOnAxis(scale, "x");
    }

    /**
     * @param scale The new scale on y axis
     */
    public scaleY(scale: number): void {
        
        this._scaleBasedOnAxis(scale, "y");
    }

    /**
     * Defaults scale by settings scale to 1
     */
    public defaultScale(): void {

        this.scaleY(1);
        
        this.scaleX(1);
    }
}
interface Scale extends DummyData {}

export default Scale;