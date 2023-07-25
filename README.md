## Appolo Cluster
### run node server with cluster mode

#### install
```javascript
npm install appolo-cluster
```

#### Usage
```javascript
import {createCluser} from 'appolo-cluster';

    createCluser({
        workers: 2,
        retry: Infinity,
        startWorker: () => {
            http.createServer((req, res) => {
                res.writeHead(200);
                res.end(`hello world from worker ${process.pid} on port ${port}`);
            }).listen(3000);
    }
})
```
