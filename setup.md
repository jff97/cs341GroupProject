# Local Project Setup

1. Clone the repository
2. Install the latest LTS version of [Node.js](https://nodejs.org/en/)
3. Install the latest version of NPM (Node Package Manager) by running `npm install npm@latest -g`
4. Go to the backend folder and run `npm install`
5. Go to the frontend folder and run `npm install`
6. Navigate to the backend folder and create a file called `.env` and add the following lines:
    ```
    DB_USER='<YOUR DB USERNAME>'
    DB_PASSWORD='<YOUR DB PASSWORD>'
    DB_HOST='<DB IP ADDRESS>'
    DB_PORT=3306
    ```
7. Run the backend server by running `node index.js` in the backend folder
