const { Sequelize } = require("sequelize");



const sequelize = new Sequelize('ethereum_db', 'kiosk', 'kiosk', {
    host: 'localhost',
    port: 5432,
    schema: 'ethereum_db',
    dialect: 'postgres',
    // pool: {
    //     max: DB.POOL.MAX,
    //     min: DB.POOL.MIN,
    //     acquire: DB.POOL.ACQUIRE,
    //     idle: DB.POOL.IDLE
    // },
    define: {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        query: { plain: true }
    },
    logging: false
});



const testDbConnection = async () => {
    try {
      return sequelize.authenticate();
      console.log("connection to db is established using sequelize.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

// testDbConnection().then((payload) => {console.log("success:", payload)}).catch(e=> {console.error(e)})
// const a = function() {
//   console.log(12);
//   return 11;
// };
// console.log(a());

//arrey:
const modelDefiners = [
    require('./Wallet.model')
];


//this loop iterates through an arrey of functions. each function takes a sequelize instance as an 
//argument and defines a database model
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

module.exports = sequelize;


// await User.sync();
// console.log("table tron_balance created!");


