import * as _cluster from 'node:cluster';
import { IOptionsInner} from "./interfaces/IOptions";
import {Utils} from "./utils";

const clusterNode = _cluster as unknown as _cluster.Cluster;

export class Worker {

    private _isStarted: boolean = false;

    constructor(private _options: IOptionsInner) {

    }

    public get id(): number {
        return clusterNode.worker.id
    }

    public async start() {

        if (this._isStarted) {
            return;
        }

        this._isStarted = true;
        await this._options.startWorker(this);

        Utils.log("info", `[cluster] worker ${this.id} started`, this._options.logLevel)

    }

    public disconnect() {

        setTimeout(() => clusterNode.worker.disconnect(), 50).unref()
    }
}