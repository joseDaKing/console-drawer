import mixin from "../utilities/mixin";
import Apply from "./apply";
import Scale from "./scale";
import {Axis} from "../types";

/**
 * Mixin transform class used for fliping the geometric shape
 * @category Transfrom class
 */
@mixin(Apply, Scale)
class Flip {

    /**
     * Flips the geometry on specific axis
     * 
     * @param axis The axis to flip
     */
    protected _flipOnAxis(axis: Axis): void {

        const axisToFlip: "width" | "height" = (
            axis === "x"
            ?
            "width"
            :
            "height"
        );

        this._scaleBasedOnAxis(-this._scale[axisToFlip], axis);

        const method: "applyScaleX" | "applyScaleY" = (
            axis === "x"
            ?
            "applyScaleX"
            :
            "applyScaleY"
        )

        this[method]();
    }

    /**
     * Flips the geometry on x axis
     */
    public flipX(): void {
        this._flipOnAxis("x");
    }

    /**
     * Flips the geometry on y axis
     */
    public flipY(): void {
        this._flipOnAxis("y");
    }
}
interface Flip extends Apply, Scale {}

export default Flip;