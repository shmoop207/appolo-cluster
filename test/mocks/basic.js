"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createCluster_1 = require("../../lib/createCluster");
(async function () {
    await (0, createCluster_1.createCluster)({
        workers: 1,
        retry: 2,
        startWorker: async (worker) => {
            console.log('worker');
            process.exit();
        }
    });
})();
//# sourceMappingURL=basic.js.map