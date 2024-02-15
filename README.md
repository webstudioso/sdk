[![Webstudio](https://i.ibb.co/ZW2sQTz/Banner-White-BG.png)](https://youtu.be/pcbTbq_MDWQ)

![Production Build](https://github.com/webstudioso/sdk/actions/workflows/production_deploy.yml/badge.svg)
![Branches](./badges/coverage-branches.svg)
![Functions](./badges/coverage-functions.svg)
![Lines](./badges/coverage-lines.svg)
![Statements](./badges/coverage-statements.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)

# [Webstudio SDK](https://webstudio.so)

A library used by the studio editor and user launched projects to manage web3, data handling and parsing and formatting.Designed to be imported as a dependency from CDN in browserscript in both Grapesjs editor and launched web apps e.g https://cdn.jsdelivr.net/npm/webstudio-sdk@1.0.1/dist/main.min.js

## How to use it


You can either import it as `npm` package or as browsercript from CDN. Once imported the library will be available as well in `window.webstudio` scope. Modules available:
- [ethers](https://docs.ethers.org/v6/). A complete and compact library for interacting with the Ethereum Blockchain and its ecosystem
- [web3Modal](https://web3modal.com/). A simple, intuitive wallet login. With this drop-in UI SDK, enable any wallet's users to seamlessly log in to your app and enjoy a smooth, unified experience.
- utils. Functions to format and parse data from other modules used across studio blocks commonly
- modules. Include data management functionalities like calling smart contracts for read/write operations, refreshing UI components, etc.

## Test
`npm run test`

## Build

`npm run build:prod`

## Publish

`npm publish`