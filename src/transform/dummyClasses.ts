import {Size, Position} from "../types";

// Dummy data for the transform mixin classes
/**
 * @ignore
 */
class DummyData {
    protected _vertices: Position[] = [];

    protected _origin: Position = {x: 0, y: 0};

    protected _scale: Size = {
        width: 1, 
        height: 1
    };

    protected _rotation: number = 0;
    
}

export default DummyData;