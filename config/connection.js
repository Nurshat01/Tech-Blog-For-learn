
require('dotenv').config();


const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306, 
      dialectOptions: {
        decimalNumbers: true,
      },
    });


module.exports = sequelize;

console.log('---> Database Name from .env:', process.env.DB_NAME);
console.log('---> Database User from .env:', process.env.DB_USER);
console.log('---> Database Password from .env:', process.env.DB_PW);
