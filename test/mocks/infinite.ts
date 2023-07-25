import {createCluster} from "../../lib/createCluster";

(async function () {
    await createCluster({
        workers:2,
        startWorker: async (worker) => {
            console.log('worker');
            process.exit();
        }
    })
})();