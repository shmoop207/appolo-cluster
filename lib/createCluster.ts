import {Defaults, IOptions} from "./interfaces/IOptions";
import * as _cluster from 'node:cluster';
import {Cluster} from "./cluster";
import {Worker} from "./worker";
import * as os from 'node:os'
import {Utils} from "./utils";

const clusterNode = _cluster as unknown as _cluster.Cluster;

export async function createCluster(options: IOptions) {

    let optionsParsed = Utils.prepareOptions(options);

    if (clusterNode.isWorker) {
        let worker = new Worker(optionsParsed);
        await worker.start();
        return;
    }

    const cluster = new Cluster(optionsParsed);
    await cluster.start();


}

