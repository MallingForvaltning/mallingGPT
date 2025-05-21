# 🐳 Build Docker Image

This guide shows how to build and run the API using Docker.

## Build

From the repository root run:

```bash
docker build -t azurechat-api .
```

The image installs dependencies, builds the Next.js project and produces a production container.

## Run

To start the container, supply your environment variables and expose port `3000`:

```bash
docker run --env-file ./src/.env -p 3000:3000 azurechat-api
```

The API will now be reachable at `http://localhost:3000`.

For information on the required variables, see [Environment variables](./9-environment-variables.md).

