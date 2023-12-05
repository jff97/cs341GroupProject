//Author: Creed Zagrzebski
//Date: October 4 2023
//Class & Methods Explained: This class is used to export a database connection to MySQL database
module.exports = {
    database: "development",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 3306
}