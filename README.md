# Playwright Automation: Screening Task

Playwright Test + TypeScript tests for:
- https://playwright.dev (docs site)
- https://demo.playwright.dev/todomvc (TodoMVC demo app)

## Project structure

- `pages/TodoPage.ts` – Page Object for TodoMVC
- `tests/docs.spec.ts` – playwright.dev tests
- `tests/todo.spec.ts` – TodoMVC tests (includes a data-driven test)
- `playwright.config.ts` – baseURL, Chromium, HTML report, trace on first retry
- `.github/workflows/playwright.yml` – GitHub Actions CI

## Prerequisites

- Node.js 18 or newer
- Git

## Install

    npm ci
    npx playwright install chromium

## Run the tests

    npx playwright test

## View the HTML report

    npx playwright show-report

## CI

Tests run automatically on every push and pull request via GitHub Actions
(see the Actions tab of the repo).