# **My Personal Portfolio - 2024 update**

<https://Errec.github.io/my-portfolio-2024/>

You can check the 2016 version at **<https://github.com/Errec/errec-portfolio>**

## Overview

This project sets up a static landing page using Pug, Sass, TypeScript, and is bundled using Parcel. It is hosted on GitHub Pages, with continuous deployment managed through GitHub Actions. The development environment can be containerized using Docker to ensure consistency across different setups.

## Features

- **Pug**: A high-performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers.
- **Sass**: Mature, stable, and powerful professional grade CSS extension language.
- **TypeScript**: A strict syntactical superset of JavaScript that adds static typing.
- **Parcel**: A web application bundler, differentiated by its developer experience. It offers blazing fast performance utilizing multicore processing, and requires no configuration.
- **Yarn**: Fast, reliable, and secure dependency management.
- **Docker**: Supports containerized environments for consistent development and deployment workflows.
- **Live Reload**: Instantly updates the browser when modifications to the code are saved, enhancing the development process.
- **GitHub Pages**: Utilizes GitHub for hosting the final static site, enabling easy access and global reach.

## Prerequisites

Make sure you have the following installed:

- Node.js (version 12.x or higher recommended)
- Yarn
- Docker (optional, for Docker environment support)
- Git (for version control and deployment)

## Setting Up the Project

### Cloning the Repository

```bash
git clone https://github.com/Errec/my-portfolio-2024.git
cd my-portfolio-2024
```

## Installing Dependencies

```bash
yarn install
```

## **Development Workflow**

### Running the Development Server

```bash
yarn start
```

This command will start the development server with live reloading enabled on **<http://localhost:1234>**

## Building the Project

To compile your project into static files for production:
'''bash
yarn build
'''

The output will be stored in the `dist` directory, ready for deployment.

## **Using Docker for Development**

To build the Docker image and run it in Live Sync:

```bash
docker-compose up --build
```

The output will be stored in the dist directory, ready for deployment.This command builds the image (if necessary) and starts the container, applying the configurations set in docker-compose.yml. The --build flag ensures that Docker rebuilds the image if there have been changes to the Dockerfile or to any files not included in the volume (like package.json).

## Using Docker for Development

To build the Docker image and run it:

```bash
docker build -t my-static-site .
docker run -p 8080:80 my-static-site
```

This isolates your development environment to ensure consistency across different machines.

## **Continuous Integration and Deployment**

### GitHub Actions

This project uses GitHub Actions for CI/CD, automatically building and deploying the site to GitHub Pages whenever changes are pushed to the master branch.

### Deploy.yml Workflow

The workflow file `.github/workflows/deploy.yml` manages the deployment process, and it looks like this:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '12'
      - run: yarn install
      - run: yarn build
      - uses: JamesIves/github-pages-deploy-action@4.1.4
        with:
          branch: gh-pages
          folder: dist
```

## Contributing

Contributions are welcome! Feel free to suggest better code implementation, rendering bugs, breaking CSS... Fork the repository and submit a pull request with your suggested changes.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Support

For support, feature requests, or bug reports, please file an issue in the GitHub repository issues section.
