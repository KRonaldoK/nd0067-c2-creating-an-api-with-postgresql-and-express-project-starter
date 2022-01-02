# Storefront backend API

This repository contains the "Storefront backend API" app.

## Installing

`npm install` to resolve dependencies

## package.json file

For Windows 10 system (I'm on Windows 10), use these lines at "scripts" section:

`"watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\"",`

`"test": "npm run tsc & set \"ENV=test\" & db-migrate --env test up & jasmine-ts & db-migrate --env test down",`

For a Unix or macOS based system, use these lines at "scripts" section:

`"watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess 'node ./dist/server.js'",`

`"test": "npm run tsc && ENV=test && db-migrate --env test up && jasmine-ts && db-migrate --env test down",`

## Database

*The database is running on port 5432*

1) Using pgAdmin for PostgresSQL, open psql tool using the menu: Tools -> PSQL Tool.
Current user must be postgres. In psql run the following:

`CREATE USER store_user WITH PASSWORD 'password123';`

`CREATE DATABASE store;`

`CREATE DATABASE store_test;`

2) At the root directory of the project, run:

`db-migrate --env dev up`

## Start and Build

To start the server, run

`yarn watch`

This will kick off the watcher library and start running the application on the port specified in server.ts.

This will also constantly compile the code in background to plain Javascript (compilation in watch mode).

To build/compile the api server just once while the server is down type:

`npm run tsc`

## Running unit tests

Run `npm run test` to execute the unit tests via [jasmine-ts](https://www.npmjs.com/package/jasmine-ts).

*This will run the models unit tests against the store test database, not the dev database*

## Development server (Running)

To start the server, run 

`yarn watch`

This will kick off the watcher library and start running the application on the port specified in server.ts.

or run 

`node dist/server` for a dev server.

*Application will run at port 3000*

## API endpoints

Postman Collection json file (`Storefront API.postman_collection.json`)` for the Storefront API is at the root of the project, ready to be imported into the Postman app workspace.

## dotenv file contents

`POSTGRES_DB=store`

`POSTGRES_TEST_DB=store_test`

`POSTGRES_USER=store_user`

`POSTGRES_PASSWORD=password123`

`ENV=dev`

`BCRYPT_PASSWORD=kaoruvorpal`

`ALT_ROUNDS=10`

`TOKEN_SECRET=crawfish`

