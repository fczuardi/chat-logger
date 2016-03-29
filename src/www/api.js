import http from 'http';
import { listen as wsListen } from 'rethinkdb-websocket-server';

let httpServer = http.createServer();
wsListen({httpServer: httpServer, unsafelyAllowAnyQuery: true});
httpServer.listen(8000);
