# URL Shortener Microservice

This project is a simple URL Shortener Microservice built with Node.js and Express. It shortens URLs and redirects users to the original URL.

## Features

- Shorten URLs via a web form.
- Redirect from shortened URLs to the original URLs.
- Handle invalid URLs.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

    ```bash
    git clone <your-repository-url>
    ```

2. Change to the project directory:

    ```bash
    cd url-shortener-microservice
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    npm start
    ```

5. Open your browser and go to `http://localhost:3000`.

## Usage

1. **Shorten a URL**:
   - Go to `http://localhost:3000`.
   - Enter a URL in the form and submit it.
   - You'll receive a shortened URL.

2. **Redirect from a Shortened URL**:
   - Use the shortened URL to be redirected to the original URL.

## API Endpoints

- `POST /api/shorturl` - Submit a URL to shorten.
- `GET /api/shorturl/:shortUrl` - Redirect to the original URL from the shortened URL.

## Example

1. Submit `https://www.example.com` to get a short URL.
2. Visit `/api/shorturl/1` to be redirected to `https://www.example.com`.

## License

This project is licensed under the MIT License.
