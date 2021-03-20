# Marvel API

A simple project built with express `Node.js` to demonstrate an API server that serves [Marvel API](https://developer.marvel.com) through Rest API.

## Pre-requisites

1. You must have `Node.js` install on your machine.
2. Alternatively, you'll need to have `Docker` and/or `docker-compose` install for option 2 below.
3. Make a copy of `.env.example` in this project into `.env`, and provide the values accordingly, eg.

      ```
      # application
      BASE_URL=http://gateway.marvel.com/v1/public
      PRIVATE_KEY=your_key
      PUBLIC_KEY=your_key

      # docker
      PORT=8080
      LOG_DIR=/path/to/logs/directory
      ```

---

## How to run?

There are 2 ways to run this application.

### 1. Manual `npm start`

Follow the steps below to run the application

1. Run `npm install`
2. Run `npm start`

### 2. Run with Docker

Execute the following command to run in Docker container.

> Note: Make sure your `.env` file is present and with proper values

```
docker-compose up -d
```

Run `docker-compose ps` or `docker ps`. You should see something like this.

```
      Name                    Command               State           Ports
----------------------------------------------------------------------------------
marvel-api_app_1   docker-entrypoint.sh ./ent ...   Up      0.0.0.0:8080->8080/tcp
```

---

## Unit Tests

Execute the following command to run the unit tests.

```
npm run test
```

---

## Swagger Documentation

After the application is running, you can access the swagger doc via [http://localhost:8080/docs](http://localhost:8080/docs) in your browser.

---

## Caching Strategy

- For simplicity of this application, the in-memory `node-cache` library is used for the caching machanism instead of the more advanced tool like `Redis`.
- For endpoint `/characters`, the cache is determined by the combination of `limit` and `offset`
- Personally I think it's unlikely that Marvel characters will be added on a frequently hourly basis or so. Hence The API results are cached with a `ttl` expiry of 24 hours.