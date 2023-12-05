//Author: Creed Zagrzebski
//Date: October 4 2023
//Class & Methods Explained: This class is used to setup configuration for documenting
const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "CS364 Appointment Scheduler API",
        version: "0.1.0",
        description:
          "A simple CRUD application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        }
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };

module.exports = options