# How to run the server locally

Clone the repository

  ```bash
  git clone https://github.com/sital002/agile-board
  ```

Install the dependencies

- Install pnpm (if not installed).

   ```bash
    npm install -g pnpm
    ```

- Install the dependencies

   ```bash
    pnpm install
    ```

Start the database using docker (Make sure you have docker installed)

  ```bash
    docker-compose up -d
  ```

Run the server

  ```bash
    pnpm dev
  ```
  