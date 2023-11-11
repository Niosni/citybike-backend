# Citybike backend // Citybike app
Citybike app built to showcase HSL city bike data with a backend and frontend projects. This repository is the working repository for the backend, but also contains the the most recent build of the frontend in `/dist` built from the [frontend repository](https://github.com/Niosni/citybike-frontend). 

The data used was given in a [pre-assignment excercise repository](https://github.com/solita/dev-academy-spring-2024-exercise) for a Dev Academy developer role at Solita.

_Only this repository is needed to run the application. For development enviroment using frontend and backend separately, check the [instructions](https://github.com/Niosni/citybike-backend#development-environment) further down._

## How to install and run
1. Running this app requires `npm` package manager and as such, make sure you have [node.js](https://nodejs.org/en) installed.
2. Follow the instructions on [database repository](https://github.com/solita/dev-academy-spring-2024-exercise/tree/main#instructions-for-running-the-database) to run the database. `Docker` is required to run the database.
3. Clone this directory onto your local machine and navigate to the repository on command line.
4. Rename `.env.example` to `.env`.
5. Run `npm install`.
7. Run `npm start` to run the server

Server is now running in `localhost:3001` by default and is ready for use.

### Troubleshooting and assinging different ports
1. Make sure you don't use localhost ports `3001` and `5432` for anything else, as those are the default ports used in this project for the backend and the database respectively.
2. If port `3001` does not work for you, assign a new port in `.env` for the variable `PORT`.
3. By default the database is running in port `5432` defined in `docker-compose.yml` in the [database](https://github.com/solita/dev-academy-spring-2024-exercise) folder. If you have that port already reserved, you can change the external port in `docker-compose.yml` and rebuild the Docker container _(assume you want to use port 5433 for example, define the external port as following:_ `ports: - 5433:5432` _)._ You also then need to change the `PGPORT` variable in `.env` in this repository to match the new port you set for the database.

### Tests
Use `npm test` to run the **integration tests** defined for the backend with `Jest`. As described, the tests assume the database is running and test for various cases from proper error messages to prevention of SQL injection.

## API
Only GET operations were used to satisfy the functional requirements. The routes were designed to complete certain frontend functionalities. All data is served as JSON and serves all the relevant data you might need.
| Content | Endpoint (api/stations) | Method |
|:-----|-----------|--|
| All stations | / | GET |
| Single station details | /station_id | GET |
| All journeys started from a station | /station_id/departures | GET |
| All journeys ended at a station | /station_id/returns | GET |

## Development environment
If you want to run the backend and [frontend](https://github.com/Niosni/citybike-frontend) separately in a development environment, run `npm run dev` on the root of both repositories. The backend script `npm run build:ui` **assumes the repositories are located in the same parent folder**.

### Tools and packages used
- `Docker` to run the `PostgreSQL` database
- `Adminer` and `psql` to inspect the database
- `node-postgres` for accessing the database with node
- `Express` for routing the endpoints
- `dotenv` to access environment variables set in .env
- `eslint` to format code in development
- `Jest` and `Supertest` to implement tests
- `nodemon` to restart server automatically in development
