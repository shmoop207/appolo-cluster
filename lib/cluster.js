"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cluster = void 0;
const _cluster = require("node:cluster");
const utils_1 = require("./utils");
const utils_2 = require("@appolo/utils");
const clusterNode = _cluster;
class Cluster {
    constructor(_options) {
        this._options = _options;
        this._isRunning = false;
        this._isStarted = false;
        this._numberOfFailures = 0;
    }
    async start() {
        if (this._isStarted) {
            return;
        }
        this._isRunning = true;
        this._isStarted = true;
        this._bindEvents();
        if (this._options.startMaster) {
            await this._options.startMaster(this);
        }
        this._fork();
        utils_1.Utils.log("info", `[cluster] started with ${this._options.workers} workers`, this._options.logLevel);
    }
    _bindEvents() {
        this._options.signals.forEach(signal => process.on(signal, () => this.shutdown(signal)));
        clusterNode.on('exit', (worker, code, signal) => this._retry(worker, code, signal));
    }
    shutdown(signal) {
        this._isRunning = false;
        utils_1.Utils.log("info", `[cluster] shutting down (${signal})`, this._options.logLevel);
        setTimeout(() => this._foreKill(signal), this._options.grace).unref();
        Object.values(clusterNode.workers).forEach(worker => worker.disconnect());
    }
    _foreKill(signal) {
        Object.values(clusterNode.workers).forEach(worker => worker.kill(signal));
        process.exit();
    }
    _retry(worker, code, signal) {
        if (!this._isRunning) {
            return;
        }
        this._numberOfFailures++;
        if (this._numberOfFailures > this._options.retry.retires) {
            utils_1.Utils.log("error", `[cluster] too many failures (${this._numberOfFailures - 1}), exiting`, this._options.logLevel);
            this.shutdown('SIGTERM');
            return;
        }
        utils_1.Utils.log("warn", `[cluster] worker ${worker.id} died (${signal}) code (${code}), restarting...`, this._options.logLevel);
        let delay = utils_2.Time.calcBackOff(this._numberOfFailures, this._options.retry);
        setTimeout(() => clusterNode.fork(), delay);
    }
    _fork() {
        for (let i = 0; i < this._options.workers; i++) {
            clusterNode.fork();
        }
    }
}
exports.Cluster = Cluster;
//# sourceMappingURL=cluster.js.map