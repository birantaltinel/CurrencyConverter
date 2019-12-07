import * as http from 'http';
import { downloadAndSaveExchangeRatesFrom } from './services/exchangeRatesManager';
import { app } from './app';
import { exchangeRatesUrl } from './resources/constants';

const port = process.env.PORT || 3100;
const server = http.createServer(app);

server.listen(port, async () => {
    await downloadAndSaveExchangeRatesFrom(exchangeRatesUrl);
    console.log("Server restarted successfully");
});