import DummyData from "./dummyClasses";
import mixin from "../utilities/mixin";

/**
 * Mixin transform class used for applying the Transformation of the geometric shape
 * @category Transfrom class
 */
@mixin(DummyData)
class Apply{

    /**
     * Apply the transformation
     */
    public applyTransformation(): void {
        this.applyRotation();
        this.applyScale();
    }

    /**
     * Apply the rotation
     */
    public applyRotation(): void {
        this._rotation = 0;
    }

    /**
     * Apply the scale
     */
    public applyScale(): void {
        
        this.applyScaleX();

        this.applyScaleY();
    }

    /**
     * Apply the scale x
     */
    public applyScaleX(): void {
        this._scale.width = 1;
    }

    /**
     * Apply the scale y
     */
    public applyScaleY(): void {
        this._scale.height = 1; 
    }
}
interface Apply extends DummyData {}

export default Apply;