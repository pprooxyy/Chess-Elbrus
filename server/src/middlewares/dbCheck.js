const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DEV_DB_URL);

async function checkConnect(req, res, next) {
  try {
    await sequelize.authenticate();
    res.locals.bd = 'Database successfully connected!';
    console.log('Database successfully connected!');
    next();
  } catch (error) {
    console.log('An error occured ==>', error);
    res.send(error);
  }
}

module.exports = checkConnect;
