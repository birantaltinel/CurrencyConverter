# CurrencyConverter

Converts amounts between currencies according to the exchange rate of the specified date published by the European Central Bank at the following link:

<https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml>

The application is written in `TypeScript` and can be run as a standalone Node application or within a Docker container.
Below you can the steps for running it using Docker.

## API

The application exposes a single endpoint `GET /convert` which takes the following `query parameters`:

* `amount`: The amount to be converted as a number. (e.g. 12.35)
* `src_currency`: ISO currency code for the source currency (e.g. EUR, USD, GBP)
* `dest_currency`: ISO currency code for the destination currency (e.g. EUR, USD, GBP)
* `reference_date`: reference date for the exchange rate, in YYYY-MM-DD format. Must be in the last 90 days.

The response of the server is a JSON object in the following structure:

```json
{
    "amount": 20.23,
    "currency": "EUR"
}
```

## Structure of the code

* `/resources` : Downloaded exchange rates and some constants are stored within this folder.
* `/routers` : The entry point for the http requests. The requests are validated within the handler functions, and the response objects are built according to the results from the domain functions.
* `/services` : The service functions that contain the business logic and perform the main required functionalities.
* `/tests` : Unit test modules for the routers and services. Use `npm run test` in order to execute the automated script for running all the unit tests.
* `server.ts` : The main starting point of the application that starts up the server and exposes it via the specified port.
* `app.ts` : The express service that connects request paths to the routers.
* `utils.ts` : Utility functions that are designed to be available throughout the application.

## Installation and Running Steps

1. Make sure to be connected to the internet.
2. Install Docker.
    * On MacOS
        * Using brew:
            `brew cask install docker`
        * or directly from Docker website:
            <https://docs.docker.com/docker-for-mac/install/>
    * On Windows
        * Follow the guide at:
            <https://docs.docker.com/docker-for-windows/install/>
    * On Linux
        * Find your distribution and follow the guide at:
            <https://docs.docker.com/install/>

3. Start Docker.
4. Open the terminal/command line and navigate to the project's root folder.
5. Run the following commands:

`docker build -t currency-converter .`

`docker run -p 3100:3100 currency-converter`

6. The application server should start up within a Docker container and should be available through the port `3100`.
