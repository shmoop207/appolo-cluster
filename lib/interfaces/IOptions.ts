import {Worker} from "../worker";
import {Cluster} from "../cluster";
import {LogLevels} from "../utils";
import {IRetry} from "@appolo/utils";

export interface IOptions {
    workers?: number | "auto"
    grace?: number
    signals?: NodeJS.Signals[]
    startWorker: (worker: Worker) => any
    startMaster?: (cluster: Cluster) => any
    logLevel?: LogLevels
    retry?: Partial<IRetry> | number
}

export interface IOptionsInner extends IOptions{

    retry: IRetry
}

export const Defaults: Partial<IOptions> = {
    workers: 'auto',
    grace: 5000,
    signals: ['SIGTERM', 'SIGINT'],
    logLevel: "info"
}