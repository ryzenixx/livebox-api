# Contributing

Thanks for your interest in contributing to livebox-api! 🎉

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ryzenixx/livebox-api.git
   cd livebox-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Run examples**
   ```bash
   # Create .env with your Livebox password
   echo "LIVEBOX_PASSWORD=your_password" > .env

   # Run an example
   npm run devices-example
   ```

## Code Style

- Use TypeScript for all new code
- Follow ESLint rules (`npm run lint`)
- Write meaningful commit messages
- Add tests for new features

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting
5. Update documentation if needed
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to your branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Adding New Features

When adding new Livebox API endpoints:

1. Add the method to the appropriate service class
2. Export it from `src/index.ts`
3. Add TypeScript types in `src/types/`
4. Create an example in `examples/`
5. Update the README
6. Add to package.json scripts if needed

## Reporting Issues

- Use GitHub Issues for bugs and feature requests
- Include your Livebox model/firmware version
- Provide code examples when possible
- Check existing issues first

## License

By contributing, you agree that your contributions will be licensed under the MIT License.