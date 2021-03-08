import { Parser } from "json2csv";

class ParserUtil {

    parseArrayObjectToCsv(values) {
        const parser = new Parser({});
        return parser.parse(values);
    }
}

export default ParserUtil;