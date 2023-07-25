import {createCluster} from "../../lib/createCluster";

(async function () {
    await createCluster({
        workers:3,
        startWorker: async (worker) => {
            process.on('disconnect', function() {
                console.log('disconnect from worker');
            });
        }
    })
})();