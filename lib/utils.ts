import {Defaults, IOptions, IOptionsInner} from "./interfaces/IOptions";
import * as os from 'node:os'
import {IRetry} from "@appolo/utils";

const LogLevels = {
    info: 0,
    warn: 1,
    error: 2
}

export type LogLevels = keyof typeof LogLevels;

export class Utils {
    public static log(severity: LogLevels, msg: string, level: LogLevels) {
        if (LogLevels[severity] >= LogLevels[level]) {
            console[severity](msg, level);
        }
    }

    public static prepareOptions(options: IOptions): IOptionsInner {

        options = Object.assign({}, Defaults, options)

        if (options.workers == "auto") {
            options.workers = os.availableParallelism()
        }

        if (!options.retry) {
            options.retry = {retires: Infinity}
        } else if (typeof options.retry == "number") {
            options.retry = {retires: options.retry}
        }

        return options as IOptionsInner;
    }

}