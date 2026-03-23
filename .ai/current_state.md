# Project State: Kanban Learning Application
**Date:** 2026-03-22
**Current Phase:** Phase 2 - Backend Foundations & Docker
**Goal:** Bootstrap the NestJS application and set up a containerized PostgreSQL database using Docker.

## Technical Decisions
- **Architecture:** Decoupled Client/Server, defined in `architecture.md`.
- **Backend:** Node.js, NestJS, TypeScript.
- **Frontend:** React, TypeScript.
- **Database:** PostgreSQL (Containerized via Docker).
- **AI Tooling:** `.ai` local directory for context persistence.
- **Project Structure:** TypeScript source in `./src`, compiled JavaScript output to `./dist`.

## Pending Tasks
1. Bootstrap a new NestJS project using the `@nestjs/cli`.
2. Create and run a PostgreSQL database instance inside a Docker container.
3. Ensure the local development environment can connect to the containerized database.