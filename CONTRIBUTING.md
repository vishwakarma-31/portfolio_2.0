# Contributing Guidelines

## How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write/update tests
5. Run tests (`npm run test:run`)
6. Commit with conventional commits (`git commit -m 'feat: add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`
4. Run the development server: `npm run dev:full` (runs both frontend and backend)
5. For frontend only: `npm run dev`
6. For backend only: `npm run server`

## Code Style

- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Add tests for new features

## Commit Convention

- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Test updates
- chore: Build/config updates