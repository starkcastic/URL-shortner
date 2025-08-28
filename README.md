# URL Shortener

A simple, full-stack URL shortening service built with HTML, CSS, and vanilla JavaScript on the frontend, and Node.js with Express on the backend.

---

## Features

-   **Shorten Long URLs**: Convert any long URL into a compact, easy-to-share link.
-   **Custom Short Links (Optional)**: Ability to suggest a custom alias for your shortened URL.
-   **Redirection**: Automatically redirects short links to their original destination.
-   **Responsive Design**: A clean and simple user interface that works on all devices.
-   **Link Analytics**: Tracks the number of clicks for each shortened link.

---

## Tech Stack

**Frontend:**
-   HTML5
-   CSS3
-   Vanilla JavaScript (Fetch API for requests)

**Backend:**
-   **Node.js**: JavaScript runtime environment.
-   **Express.js**: Web framework for Node.js.
-   **EJS (or other template engine)**: To serve the HTML page.
-   **MongoDB**: Database to store the original and shortened URLs.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/get-npm) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd your-repo-name
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Create a `.env` file** in the root directory and add the following environment variables (if needed):
    ```
    PORT=3000
    DATABASE_URL=your_database_connection_string
    ```

5.  **Start the server:**
    ```sh
    npm start
    ```

The application should now be running on `http://localhost:3000`.

---

## Usage

1.  Open your web browser and navigate to `http://localhost:3000`.
2.  Paste the long URL you want to shorten into the input field.
3.  Click the "Shorten" button.
4.  The application will provide you with a new, shortened URL.
5.  You can copy the short URL and share it. When someone accesses it, they will be redirected to the original long URL.

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---
