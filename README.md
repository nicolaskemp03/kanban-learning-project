# Kanban Learning Project: Python to Full-Stack TypeScript

This repository is a AI-driven learning project that I decided to test in order to get me from a python developer to an actual full-stack developer that is able to produce a web-App using up to date frameworks.

For this I'm using AI not as a coding engine, but as a teacher. As I say, it is an experiment that has been working great as far as I'm concerned.

Not a single line of code in this repository has been written by AI. All the code it is human-written.

If you wish to try this yourself you can find all the prompts in the `.ai/` folder. And if you wish to see the actual building process. All of the chats with AI are saved in `.ai/sessions/` along with summaries so you can check the process in depth.

**DISCLAIMER**: By no means am I trying to disregard the importance of human teaching. Rather, I am trying to seek the potential of AI to make a middle-ground between self-teaching and actual teaching.

---

# AI-Written in-depth explanation

## 🎯 The Objective
This project is a dedicated, AI-guided learning curriculum designed to facilitate a transition from Python development to a strict, statically-typed JavaScript/TypeScript ecosystem. The end goal is to build a full-stack Kanban project manager (similar to Trello or ClickUp) from scratch to master modern web engineering principles.

## 🧠 Pedagogical Structure: The 7 Phases
The project is built in a strict sequential order to respect the learning curve and ensure fundamental concepts are mastered before adding framework abstractions.

- **Phase 0: Rosetta Stone** (Completed) - Mapping Python concepts to TypeScript (Syntax, Types, Event Loop).
- **Phase 1: Pure TypeScript Sandbox** (Completed) - Building CLI tooling without frameworks to understand the compiler and runtime.
- **Phase 2: Backend Foundations & Docker** (Completed) - NestJS bootstrapping, PostgreSQL containerization, and ORM integration.
- **Phase 3: Core API & Database Integration** (Current) - Implementing RESTful endpoints and CRUD operations for Boards, Lists, and Tasks.
- **Phase 4: Frontend Translation & Foundations** - Moving to React, mastering functional components, Hooks, and the Virtual DOM.
- **Phase 5: Integration & State Management** - Connecting React to NestJS, handling CORS, and implementing complex Drag-and-Drop state.
- **Phase 6: DevOps & Delivery** - Finalizing multi-stage Dockerfiles and project documentation.

## 🛠 Tech Stack
- **Language:** TypeScript (Strict Mode)
- **Backend:** Node.js & NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Frontend:** React (Functional Components & Hooks)
- **State Management:** Zustand
- **Infrastructure:** Docker & Docker Compose
- **Environment:** Nix / NixOS

## 🤖 The AI Mentor Protocol: "Zero-Code Mandate"
This project follows a strict interaction protocol defined in `.ai/persona.md`. The AI acts as a **Socratic Technical Mentor**. 

**The Rule:** The AI is forbidden from generating, completing, or fixing functional code. Every line of code in this repository has been written by the developer based on conceptual guidance, documentation research, and architectural reviews provided by the mentor.

## 📂 Project Organization
- `/src` - NestJS Backend Source.
- `/prisma` - Database schema and migrations.
- `/.ai` - Meta-directory containing architectural decisions, curriculum context, and session logs.
- `/z_archive_phase_01` - Archived code from the initial TypeScript sandbox phase.

---
*Built with ❤️ and a lot of Socratic questioning.*
