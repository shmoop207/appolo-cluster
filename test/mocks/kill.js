"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createCluster_1 = require("../../lib/createCluster");
(async function () {
    await (0, createCluster_1.createCluster)({
        workers: 3,
        startWorker: async (worker) => {
            process.on('disconnect', function () {
                console.log('disconnect from worker');
            });
        }
    });
})();
//# sourceMappingURL=kill.js.map