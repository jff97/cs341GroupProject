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
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };

module.exports = options