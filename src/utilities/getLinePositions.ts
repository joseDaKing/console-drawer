import { Position } from "../types";

type getLinePositionsOptions = {
    position: Position,
    length: number,
    rotation: number
}

type GetLinePositionsReturnValue = {
    start: Position,
    end: Position
}


/**
 * Gets the start and end position by line length, rotation (degrees) and start position
 * 
 * @param options Options consists of the line length, rotation and start position
 */
const getLinePositions = (options: getLinePositionsOptions): GetLinePositionsReturnValue => {
    
    const {
        position: startPosition,
        length,
        rotation: degrees
    } = options;

    const {
        x: xStart,
        y: yStart
    } = startPosition;
    
    const radians: number = degrees * Math.PI / 180;

    const sinValue: number = Math.sin(radians);

    const cosValue: number = Math.cos(radians);
    
    const width: number = cosValue * length;

    const height: number = sinValue * length;

    const xEnd: number = xStart + width;

    const yEnd: number = yStart + height;

    const endPosition = {x: xEnd, y: yEnd}

    return {
        start: startPosition, 
        end: endPosition
    };
};

export default getLinePositions;

export {
    GetLinePositionsReturnValue,
    getLinePositionsOptions
}