const { sequelize } = require('./sequelize_index');

// TODO: Define Database Relationships Here. Import models and use sequelize methods to define relationship (One-to-One, One-to-Many, Many-to-Many)

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database successfully synchronized');
    }).catch((err) => {
        console.log('Database synchronization failed: ', err);
    });