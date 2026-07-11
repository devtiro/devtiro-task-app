# Task App UI

The user interface for the Devtiro Task App build. It's a React app, built with Vite and TypeScript.

**You don't need to run this directly.** From the repository root, `docker compose up` builds this
into an image and runs it for you — no Node install required. See the root [README](../README.md).

## Running it directly

If you'd rather run it without Docker, you'll need Node 20 or later:

```bash
npm install
npm run dev
```

It runs on http://localhost:3000 and proxies `/api` calls to the Spring Boot app on port 8080, which
needs to be running.

## How it talks to the backend

In the Docker image, nginx serves the built app and proxies `/api/` through to the backend. The host
and port come from the `BACKEND_HOST` and `BACKEND_PORT` environment variables, which the
`docker-compose.yml` at the repository root sets for you.
