"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCluster = void 0;
const _cluster = require("node:cluster");
const cluster_1 = require("./cluster");
const worker_1 = require("./worker");
const utils_1 = require("./utils");
const clusterNode = _cluster;
async function createCluster(options) {
    let optionsParsed = utils_1.Utils.prepareOptions(options);
    if (clusterNode.isWorker) {
        let worker = new worker_1.Worker(optionsParsed);
        await worker.start();
        return;
    }
    const cluster = new cluster_1.Cluster(optionsParsed);
    await cluster.start();
}
exports.createCluster = createCluster;
//# sourceMappingURL=createCluster.js.map