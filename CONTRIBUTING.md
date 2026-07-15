# Contributing to Pollacle

Thank you for your interest in contributing to Pollacle! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally: `git clone https://github.com/YOUR_USERNAME/Pollacle.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Setup

1. Install dependencies: `npm install`
2. Set up environment: `cp .env.example .env.local`
3. Initialize database: `npx prisma migrate dev`
4. Start dev server: `npm run dev`
5. Open http://localhost:3000

## Making Changes

- Use TypeScript for all new code
- Write clear, descriptive commit messages
- Test your changes locally before submitting

## Submitting Changes

1. Push your branch to your fork
2. Create a Pull Request with clear description
3. Address feedback from maintainers
4. Once approved, your PR will be merged

## Reporting Issues

Use GitHub Issues to report bugs or suggest features with:
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Your environment details
- Screenshots if applicable
