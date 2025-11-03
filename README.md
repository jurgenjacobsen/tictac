# TicTac

A modern, local Electron desktop application built with React, TypeScript, and TailwindCSS. This is a multi-page application demonstrating the power of combining Electron with modern web technologies.

## Features

- ⚡ **Fast & Modern**: Built with Electron Forge, React 18, and TypeScript
- 🎨 **Beautiful UI**: Styled with TailwindCSS for a modern, responsive design
- 🚀 **Multi-Page Navigation**: React Router for seamless page transitions
- 💻 **Cross-Platform**: Runs on Windows, macOS, and Linux
- 🔒 **All Local**: No server required - everything runs locally on your machine
- 🛠️ **Type-Safe**: Full TypeScript support for better development experience

## Technologies Used

- **Electron Forge**: Complete toolchain for building Electron apps
- **React 18**: Modern UI library with hooks and concurrent features
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: Declarative routing for React
- **Webpack**: Module bundler configured via Electron Forge

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jurgenjacobsen/tictac.git
cd tictac
```

2. Install dependencies:
```bash
npm install
```

### Development

To start the application in development mode with hot reload:

```bash
npm start
```

This will launch the Electron application with developer tools enabled.

### Building

To package the application for distribution:

```bash
npm run package
```

The packaged application will be available in the `out` directory.

To create distributable installers:

```bash
npm run make
```

### Linting

To check code quality:

```bash
npm run lint
```

## Project Structure

```
tictac/
├── src/
│   ├── pages/          # React page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   └── ContactPage.tsx
│   ├── App.tsx         # Main App component with routing
│   ├── renderer.tsx    # React entry point
│   ├── index.ts        # Electron main process
│   ├── preload.ts      # Preload script
│   ├── index.html      # HTML template
│   └── index.css       # Global styles with Tailwind
├── forge.config.ts     # Electron Forge configuration
├── webpack.*.ts        # Webpack configurations
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # TailwindCSS configuration
└── package.json        # Project dependencies and scripts
```

## Application Pages

The application includes three main pages:

1. **Home** - Welcome page with feature overview
2. **About** - Information about the technologies used
3. **Contact** - Contact form (demonstration)

Navigate between pages using the navigation bar at the top of the application.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.