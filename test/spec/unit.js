"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const child_process_1 = require("child_process");
const path = require("path");
let should = chai.should();
describe("cluster", function () {
    it("should create cluster with max fail 2", async () => {
        const [proc, done] = run(fixture('basic'));
        const [out, time] = await done;
        out.should.contain("worker 2 died (null) code (0), restarting");
        out.should.contain("[cluster] too many failures (2), exiting");
    });
    it("with infinite", async () => {
        const [proc, done] = run(fixture('infinite'));
        setTimeout(() => proc.kill(), 1000);
        const [out, time] = await done;
        out.should.contain("[cluster] started with 2 workers");
        out.match(/\[cluster\] worker/g).length.should.greaterThan(10);
    });
    it("with notify kill to worker", async () => {
        const [proc, done] = run(fixture('kill'));
        setTimeout(() => proc.kill(), 1000);
        const [out, time] = await done;
        out.should.contain("[cluster] started with 3 workers");
        out.match(/disconnect from worker/g).length.should.greaterThan(2);
    });
});
function run(file) {
    const child = (0, child_process_1.spawn)('node', [file], { detached: true });
    const startTime = Date.now();
    let out = '';
    child.stdout.on('data', data => out += data.toString());
    child.stderr.on('data', data => out += data.toString());
    const done = new Promise((resolve, reject) => {
        child.on('close', () => {
            resolve([out, Date.now() - startTime]);
        });
    });
    return [child, done];
}
function fixture(name) {
    return path.join(__dirname, '../mocks/', name);
}
//# sourceMappingURL=unit.js.map