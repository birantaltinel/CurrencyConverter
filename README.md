# CurrencyConverter
Converts amounts between currencies according to the exchange rate at the specified date

Steps:

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
