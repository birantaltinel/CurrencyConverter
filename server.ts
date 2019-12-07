import * as http from 'http';
import { app } from './app';

const port = process.env.PORT || 3100; //maybe choose a more suitable port later
const server = http.createServer(app);

server.listen(port, () => {
    console.log("Server restarted successfully")
});