import mixin from "../utilities/mixin";
import Apply from "./apply";
import Flip from "./flip";
import Location from "./location";
import Rotation from "./rotation";
import Scale from "./scale";

/**
 * A mixin class used for transforming geometric shape
 * @category Transfrom class
 */
@mixin(Apply, Flip, Location, Rotation, Scale)
class Transform {}
interface Transform extends Apply, Flip, Location, Rotation, Scale {};

export default Transform;