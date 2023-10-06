const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const sequelize = require('./dataAccessLayer');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swagger_options = require('./configs/swagger');
const { logger } = require('./logging');

// Routers
const appointmentRoutes = require('./routes/AppointmentRoutes');
const userRoutes = require('./routes/UserRoutes');
const authRoutes = require('./routes/AuthRoutes');

// Ensure the express app uses these modules
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(helmet({
    contentSecurityPolicy: false,
}))
app.use(cookieParser())

// Checks the database connection
async function assertDatabaseConnectionOk() {
    logger.info('Checking database connection')
    try {
        await sequelize.authenticate()
        logger.info('Database connection OK!')
    } catch (error) {
        logger.error('Unable to connect to the database')
        logger.error(error.message)
        process.exit(1)
    }
}

// Initializes the server
async function init() {
    await assertDatabaseConnectionOk();

    // Setup Routes
    app.use('/api/user', userRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/appointment', appointmentRoutes);

    // Swagger Integration
    const specs = swaggerJsdoc(swagger_options);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    // Error handlers
    app.use((req, res) => res.status(404).send("404 NOT FOUND"))
    app.use((err, req, res, next) => {
        logger.error(err)
        logger.error(err.stack)
        if(err.code) {
            res.status(err.code).send(err.message)
        } else {
            res.status(500).send(err.message)
        }
    })

    app.listen(5000, () => {
        logger.info('Server is running on port 5000')
    });
}

init();



