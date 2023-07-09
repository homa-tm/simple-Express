const express = require('express');
const { getTronweb , main , getBalance } = require('./tronwebInstance');
const sequelize = require('./models/sequelize.js');
const databaseFile = require('./models/database.js');

const app = express();
const port = 3000;
const network = 'shasta';

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


app.get('/updateBalance/:address', async (req, res) => {
  try {
    //todo validate address createWalletandBalance
    const address = req.params.address;
    const balance = await getBalance(address, network);
    const newWalletRow = await databaseFile.updateBalance(address, balance);
    res.status(200).json({data: newWalletRow});
  } catch (error) {
    console.error('Error executing getBalance function:', error);
    res.status(500).send('An error occurred while calculating the balance');
  }
});


sequelize.sync({ force: false, alter: true})
.then(payload => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port} & network is ${network}`);
  });
}).catch(e => console.error(e));

