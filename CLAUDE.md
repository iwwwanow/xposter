# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**xposter** is a cross-posting platform that publishes content (text, images, audio) to Telegram, Instagram, and Twitter simultaneously. The primary user interface is a Telegram bot. Scheduled/delayed posts are a core feature, with SQLite used for message queues.

This project is in the **early implementation phase** — architecture is defined but no source code exists yet.

## Architecture

The design follows a hexagonal/ports-and-adapters pattern with two top-level concerns:

**`src/`** — application and domain code:
- `app/telegram-bot-entrypoint` — main entry point (Telegram bot UI); a web interface is planned but not started
- `social-media-account/` — module for managing connected social media accounts (controller → service → repository)
- `publication/` — module for creating and dispatching posts (controller → service → repository + `social-media-client-port` abstraction)

**`adapters/`** — platform-specific implementations (Telegram, Instagram, Twitter) that implement the `social-media-client-port` interface defined in the publication module

**Key architectural note**: `publication.controller` currently calls `social-media-account.controller` directly — this is a known design debt; an event bus should replace that coupling.

## Key Decisions

- SQLite for scheduled post queues
- Platform adapters are isolated from domain logic via the `social-media-client-port` interface
- No tech stack chosen yet — pick one when starting implementation
