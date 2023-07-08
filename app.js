const express = require('express');
const { getTronweb , main , getBalance } = require('./tronwebInstance');
const sequelize = require('./models/sequelize.js');


const app = express();
const port = 3000;
const network = 'shasta';

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/updateBalance/:address', async (req, res) => {
  try {
    const address = req.params.address;
    //todo validate address
    const balance = await getBalance(address, network);
    //address
    //balance
    //call insert function from database.js
    //todo save address and trx balance into db
    res.status(200).json({data: balance});
  } catch (error) {
    console.error('Error executing getBalance function:', error);
    res.status(500).send('An error occurred while calculating the balance');
  }
});




sequelize.sync({ force: false, alter: true})
.then(payload => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(e => console.error);

