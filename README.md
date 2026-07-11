# Devtiro Task App Build

This repo contains the project as-built in the Devtiro Task App build video.

The Task App is a todo list application built with Spring Boot 4 and the H2 database. The user
interface is provided for you as a Docker image, so you only build the backend.

You're invited to use this as a reference as you build along.

## The Build Guide

The full step-by-step write-up of the build lives in
[docs/task-app-v2-combined.md](docs/task-app-v2-combined.md). It covers the project brief, the domain
and architecture design, and then builds the app up feature by feature.

The build was also published as a PDF book. That PDF is no longer available, and it isn't included in
this repo. The Markdown guide above is the complete build.

## What's In This Repo

| Path                 | Contents                                                  |
| -------------------- | --------------------------------------------------------- |
| `docs/`              | The build guide and its images                            |
| `src/`               | The Spring Boot app, as built in the video                |
| `ui/`                | The React UI, provided for you — Docker builds it for you |
| `docker-compose.yml` | Builds and runs the UI, which talks to your app on 8080   |

## Running It

You'll need JDK 25 and Docker.

```bash
# Run the Spring Boot app
./mvnw spring-boot:run

# Build and start the UI, in a second terminal
docker compose up -d
```

The UI is then available at http://localhost:3000 and expects your app on port 8080. Docker Compose
builds the UI image from the source in `ui/` — the first run takes a minute or two, then it's cached.
You don't need Node installed, and you don't need to know React.

The app uses an in-memory H2 database, so there's no database to run — but the data is gone when you
stop it.

> [!WARNING]
> This project is pinned to **Java 25** and **Spring Boot 4.0.x**. It was built and tested against
> those versions only. Other versions of Spring Boot and Java may require changes to the code and
> configuration in this repo, and the guide's instructions may no longer match what you see.

> [!CAUTION]
> **This is intended for your local development environment only.** It is not production-ready. It
> uses an in-memory database with the H2 console enabled, and has no authentication.

> [!IMPORTANT]
> This is a teaching project. It's written to demonstrate how a Spring Boot application is designed
> and built, following the same practices I'd use on real work — a layered architecture, DTOs and
> mappers at the API boundary, constructor injection, and centralised error handling.
>
> That said, its scope is deliberately limited to what the build covers. It may contain bugs, and
> some things a production system would need — authentication, a persistent database, a full test
> suite — are out of scope by design rather than by oversight.

## Licence

This repo is licensed in two parts.

**The code** — everything outside `docs/` — is [MIT licensed](LICENSE). Use it, change it, build on
it, no strings attached.

**The build guide** — everything in [`docs/`](docs/LICENSE) — is licensed under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). You're welcome to share it,
translate it, and build on it, but please credit Devtiro, don't sell it or put it behind a paywall,
and keep any adaptations under the same licence.

Copyright © 2025 Devtiro Ltd.
