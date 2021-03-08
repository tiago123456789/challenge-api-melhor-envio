import { v4 } from "uuid";

class UuidUtil {

    get() {
        return v4();
    }
}

export default UuidUtil;