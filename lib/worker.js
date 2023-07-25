"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const _cluster = require("node:cluster");
const utils_1 = require("./utils");
const clusterNode = _cluster;
class Worker {
    constructor(_options) {
        this._options = _options;
        this._isStarted = false;
    }
    get id() {
        return clusterNode.worker.id;
    }
    async start() {
        if (this._isStarted) {
            return;
        }
        this._isStarted = true;
        await this._options.startWorker(this);
        utils_1.Utils.log("info", `[cluster] worker ${this.id} started`, this._options.logLevel);
    }
    disconnect() {
        setTimeout(() => clusterNode.worker.disconnect(), 50).unref();
    }
}
exports.Worker = Worker;
//# sourceMappingURL=worker.js.map