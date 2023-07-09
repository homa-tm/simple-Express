const TronWeb = require('tronweb');

async function getTronweb(network) {
  const networks = {
    mainnet: 'https://api.trongrid.io',
    shasta: 'https://api.shasta.trongrid.io',
    nile: 'https://api.nileex.io'
    }
  const api = networks[network]

  
    const tronWeb = new TronWeb(
    fullNode = api,
    solidityNode = api,
    eventServer= api
    );

  return tronWeb;
}

///////////////////////////////////////////////////////
async function getBalance(address, network) {
    try {
      const tronWeb = await getTronweb(network); // Wait for the tronWeb instance
      const balance = await tronWeb.trx.getBalance(address);
      return balance;
      // console.log(`Address: ` , address,`\nNetwork: ` , network, `\nbalance: ${balance} TRX`);
    } catch (error) {
      console.error('Error retrieving address balance:', error);
      throw new Error(error);
    }
  }
  
///////////////////////////////////////////////////////
async function main() {
    
    let address = 'TFt8S2nHp8qUbxEjwUu3axVDJVfmFzFLaE';
    const network = 'shasta';
    getBalance(address, network);

    }

main();

module.exports = { getTronweb , main , getBalance };