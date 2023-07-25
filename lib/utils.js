"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const IOptions_1 = require("./interfaces/IOptions");
const os = require("node:os");
const LogLevels = {
    info: 0,
    warn: 1,
    error: 2
};
class Utils {
    static log(severity, msg, level) {
        if (LogLevels[severity] >= LogLevels[level]) {
            console[severity](msg, level);
        }
    }
    static prepareOptions(options) {
        options = Object.assign({}, IOptions_1.Defaults, options);
        if (options.workers == "auto") {
            options.workers = os.availableParallelism();
        }
        if (!options.retry) {
            options.retry = { retires: Infinity };
        }
        else if (typeof options.retry == "number") {
            options.retry = { retires: options.retry };
        }
        return options;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map