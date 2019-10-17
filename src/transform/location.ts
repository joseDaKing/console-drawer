import getLineLength from "../utilities/getLineLength";
import getLineRotation from "../utilities/getLineRotation";
import {Position, Axis} from "../types";
import getLinePositions from "../utilities/getLinePositions";
import DummyData from "./dummyClasses";
import mixin from "../utilities/mixin";

/**
 * Mixin transform class used for changing the location of a geomtric shape
 * @category Transfrom class
 */
@mixin(DummyData)
class Location {

    
    /**
     * Translates (Moves reltavily) the position on specific axis
     * 
     * @param axis The axis to translate on
     * 
     * @param length The length to move
     */
    protected _translateBasedOnAxis(length: number, axis: Axis): void {

        this._origin[axis] += length;

        this._vertices.map((vertice: Position): Position => {
            
            vertice[axis] += length;

            return vertice;
        }); 
    }

    /**
     * Moves the geometry relative from where it is
     * 
     * @param axis The axis to translate on
     * 
     * @param length The length to translate
     */
    public translate(position: Position): void {
        
        this.translateX(position.x);
        
        this.translateY(position.y);
    }

    /**
     * Translates (Moves reltavily) the position on x axis
     * 
     * @param length The length to move
     */
    public translateX(length: number): void {

        this._translateBasedOnAxis(length, "x");
    }

    /**
     * Translates (Moves reltavily) the position on y axis
     * 
     * @param length The length to move
     */
    public translateY(length: number): void {
        
        this._translateBasedOnAxis(length, "y");
    }

    /**
     * @param location The new locatoin on specific axis
     * 
     * @param axis The axis to set the new location on
     */
    protected _setLocationBasedOnAxis(location: number, axis: Axis): void {

        this._vertices = this._vertices.map((vertice: Position): Position => {
            
            const length: number = getLineLength([this._origin, vertice]);

            const rotation: number = getLineRotation([this._origin, vertice]);

            const {
                end: newVertice
            } = getLinePositions({
                position: {
                    ...this._origin,
                    [axis]: location
                },
                rotation,
                length
            });

            return newVertice;
        });

        this._origin[axis] = location;
    }

    /**
     * @param location The new locatoin
     */
    public setLocation(location: Position) {
        
        this.setLocationX(location.x);

        this.setLocationY(location.y);
    }
    
    /**
     * @param location The new x locatoin
     */
    public setLocationX(location: number): void {
        
        this._setLocationBasedOnAxis(location, "x");
    }

    /**
     * @param location The new y locatoin
     */
    public setLocationY(location: number): void {
        
        this._setLocationBasedOnAxis(location, "y");
    }
}
interface Location extends DummyData {}

export default Location;