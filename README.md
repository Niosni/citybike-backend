# Citybike backend
This is a backend service to serve a frontend for an [Interview Exercise](https://github.com/solita/dev-academy-spring-2024-exercise).
## How to install
1. Clone this directory onto your local machine and navigate to the repository on command line.
2. Run `npm install`.
3. Create a file `.env` following the instructions in `.env.example`. 
4. Run `npm start` to run the server (or optionally `npm run dev` to launch the development server).

Server is now running in `localhost:PORT` and is ready for use.

### Tests
Use `npm test` to run all tests defined with `Jest`.

## API
Only GET operations were needed for this service. The routes were designed to complete certain frontend functionalities.
| Functionality | Endpoint (api/stations) | Method |
|:-----|-----------|--|
| Show all stations | / | GET |
| Station name and address | /station_id | GET |
| Average distance and duration of journeys starting from a station | /station_id/departures | GET |
| Total number of journeys starting from a station | /station_id/departures/count | GET |
| Total number of journeys ending at a station | /station_id/returns/count | GET |

### Tools and packages used
- `Docker` to run the `PostgreSQL` database
- `Adminer` and `psql` to inspect the database
- `node-postgres` for accessing the database with node
- `Express` for routing the endpoints
- `dotenv` to access environment variables set in .env
- `eslint` to format code in development
- `Jest` and `Supertest` to implement tests
- `nodemon` to restart server automatically in development
