/**
 * A mixin decorator used for mixin classes instead of extending
 * @category Graphic class
 * @param sources The classes to mixin
 */
const mixin = (...sources: object[]): Function => (target: object): void => {

    sources
    .forEach(source => {
        
        Object
        .getOwnPropertyNames((<any>source)
        .prototype).forEach(name => {
            
            Object.defineProperty((<any>target)
            .prototype, name, (<any>Object)
            .getOwnPropertyDescriptor((<any>source).prototype, name));
        });
    });
}

export default mixin;