"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCluster = exports.Worker = exports.Cluster = void 0;
var cluster_1 = require("./lib/cluster");
Object.defineProperty(exports, "Cluster", { enumerable: true, get: function () { return cluster_1.Cluster; } });
var worker_1 = require("./lib/worker");
Object.defineProperty(exports, "Worker", { enumerable: true, get: function () { return worker_1.Worker; } });
var createCluster_1 = require("./lib/createCluster");
Object.defineProperty(exports, "createCluster", { enumerable: true, get: function () { return createCluster_1.createCluster; } });
//# sourceMappingURL=index.js.map