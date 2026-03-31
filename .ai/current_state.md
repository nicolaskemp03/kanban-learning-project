# Project State: Kanban Learning Application
**Date:** 2026-03-22
**Current Phase:** Phase 2 - Backend Foundations & Docker (Wrapping up)
**Goal:** Bootstrap the NestJS application and set up a containerized PostgreSQL database using Docker.

## Technical Decisions
- **Architecture:** Decoupled Client/Server, defined in `architecture.md`.
- **Backend:** Node.js, NestJS, TypeScript.
- **Frontend:** React, TypeScript.
- **Database:** PostgreSQL (Containerized via Docker).
- **AI Tooling:** `.ai` local directory for context persistence.
- **Project Structure:** NestJS scaffolded in root directory.

## Completed Tasks (Phase 2)
1. [x] Bootstrap a new NestJS project using the `@nestjs/cli`.
2. [x] Create and run a PostgreSQL database instance inside a Docker container.
3. [x] Ensure the local development environment can connect to the containerized database (Verified via `docker exec` and `psql`).

## Pending Tasks
1. Select an ORM (Prisma or TypeORM) for database interaction.
2. Initialize the chosen ORM in the NestJS project.
3. Define the initial database schema (Boards, Lists, Tasks).
4. Implement the first CRUD operations (Phase 3).