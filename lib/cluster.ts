import * as _cluster from 'node:cluster';
import {IOptionsInner} from "./interfaces/IOptions";
import {Utils} from "./utils";
import {Time} from "@appolo/utils";

const clusterNode = _cluster as unknown as _cluster.Cluster;

export class Cluster {
    private _isRunning: boolean = false;
    private _isStarted: boolean = false;

    private _numberOfFailures: number = 0;

    constructor(private _options: IOptionsInner) {

    }

    public async start() {

        if (this._isStarted) {
            return;
        }

        this._isRunning = true;
        this._isStarted = true;

        this._bindEvents();

        if (this._options.startMaster) {
            await this._options.startMaster(this);
        }

        this._fork()

        Utils.log("info", `[cluster] started with ${this._options.workers} workers`, this._options.logLevel);
    }

    private _bindEvents() {
        this._options.signals.forEach(signal => process.on(signal, () => this.shutdown(signal)))
        clusterNode.on('exit', (worker: _cluster.Worker, code: number, signal: string) => this._retry(worker, code, signal))
    }

    public shutdown(signal: NodeJS.Signals) {
        this._isRunning = false;

        Utils.log("info", `[cluster] shutting down (${signal})`, this._options.logLevel);

        setTimeout(() => this._foreKill(signal), this._options.grace).unref();

        Object.values(clusterNode.workers).forEach(worker => worker.disconnect())
    }

    private _foreKill(signal: NodeJS.Signals) {
        Object.values(clusterNode.workers).forEach(worker => worker.kill(signal))

        process.exit()
    }

    private _retry(worker: _cluster.Worker, code: number, signal: string) {
        if (!this._isRunning) {
            return
        }

        this._numberOfFailures++;

        if (this._numberOfFailures > this._options.retry.retires) {
            Utils.log("error", `[cluster] too many failures (${this._numberOfFailures - 1}), exiting`, this._options.logLevel);
            this.shutdown('SIGTERM')
            return
        }

        Utils.log("warn", `[cluster] worker ${worker.id} died (${signal}) code (${code}), restarting...`, this._options.logLevel);
        let delay = Time.calcBackOff(this._numberOfFailures, this._options.retry);
        setTimeout(() => clusterNode.fork(), delay)

    }

    private _fork() {
        for (let i = 0; i < this._options.workers; i++) {
            clusterNode.fork()
        }
    }
}

