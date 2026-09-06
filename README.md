# Modern Portfolio Website

This repository contains the code for a modern portfolio website.

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Setup and Usage](#setup-and-usage)
- [Contributing](#contributing)
- [License](#license)

## Description

This website is designed as a modern portfolio showcasing various services and links to different platforms and resources.

## Technologies Used

- HTML
- CSS (Bootstrap 4.5.2)
- JavaScript (jQuery 3.5.1, Popper.js 2.5.3, Bootstrap 4.5.2)

## Setup and Usage

### Run locally with Docker

1. Build the image (run this in the project root next to `Dockerfile`):

   ```bash
   docker build -t personal-website .
   ```

2. Run the container, mapping port 80 in the container to port 8082 on your machine:

   ```bash
   docker run --rm -p 8080:80 personal-website
   ```

3. Open your browser and visit:

   ```text
   http://localhost:8080
   ```

The container uses Nginx to serve the static files from this repository.

### Run with Docker Compose

1. Start the site (from the project root):

   ```bash
   docker compose up --build
   ```

2. Open your browser and visit:

   ```text
   http://localhost:8082
   ```

3. Stop and remove the containers and network:

   ```bash
   docker compose down
   ```

### Manual usage (without Docker)

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/modern-portfolio.git
