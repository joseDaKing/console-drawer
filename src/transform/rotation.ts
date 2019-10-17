import getLineRotation from "../utilities/getLineRotation";
import getLineLength from "../utilities/getLineLength";
import getLinePositions from "../utilities/getLinePositions";
import {Position} from "../types";
import DummyData from "./dummyClasses";
import mixin from "../utilities/mixin";

/**
 * Mixin transform class used for rotating a geometric shape
 * @category Transfrom class
 */
@mixin(DummyData)
class Rotation {

    /**
     * Rotates the geometric shape relatavily from the current rotation
     * 
     * @param degrees the amount of relative rotation in degrees
     */
    public rotate(degrees: number): void {

        this._vertices = this._vertices.map((vertice: Position): Position => {
            
            const rotation: number = getLineRotation([this._origin, vertice]);

            const length: number = getLineLength([this._origin, vertice]);

            const newRotation: number = rotation + degrees;
            
            const {
                end: newVertice
            } = getLinePositions({
                position: this._origin,
                rotation: newRotation,
                length
            });

            return newVertice;
        });

        this._rotation += degrees;
    }

    /**
     * @param degrees The degrees set the rotation tp
     */
    public setRotation(degrees: number): void {

        this.defaultRotation();

        this.rotate(degrees);
    }

    /**
     * Defaults the rotation by setting the rotation to 0 degrees
     */
    public defaultRotation(): void {
        
        this.rotate(-this._rotation);

        this._rotation = 0;
    }
    
}
interface Rotation extends DummyData {};

export default Rotation;