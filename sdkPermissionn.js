const TronWeb = require('tronweb');

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://api.trongrid.io');
const solidityNode = new HttpProvider('https://api.trongrid.io');
const eventServer = new HttpProvider('https://api.trongrid.io');

const tronweb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
);
//////////////////////////

const nileHttpProvider = TronWeb.providers.HttpProvider;
const nilefullNode = new nileHttpProvider('https://api.nileex.io');
const nilesolidityNode = new nileHttpProvider('https://api.nileex.io');
const nileeventServer = new nileHttpProvider('https://api.nileex.io');

const niletronweb = new TronWeb(
    nilefullNode,
    nilesolidityNode,
    nileeventServer,
);
///////////////////////////////////////////////////////

const address = 'TFt8S2nHp8qUbxEjwUu3axVDJVfmFzFLaE'; 

/////////////////

async function getBalance(address) {
    try {
      const balance = await niletronweb.trx.getBalance(address) / 1000000;
      console.log(`Address balance: ${balance} TRX`);
    } catch (error) {
      console.error('Error retrieving address balance:', error);
    }
  }
  
  getBalance(address);

////////////////////


const sdk = require('api')('@tron/v4.7.1#9z8dqalio8v8gy');

async function updateAccountPermissions() {
  try {
    const response = await sdk.accountpermissionupdate({
      owner_address: 'TFt8S2nHp8qUbxEjwUu3axVDJVfmFzFLaE',
      actives: [
        {
          type: 2,
          permission_name: 'TRX',
          threshold: 2,
          operations: '7fff1fc0037e0000000000000000000000000000000000000000000000000000',
          keys: [
            { address: 'TFt8S2nHp8qUbxEjwUu3axVDJVfmFzFLaE', weight: 1 },
            { address: 'TGuaDJhFwMn38StgyQjYKcT3zqSmTEDufj', weight: 1 }
          ]
        }
      ],
      owner: {
        type: 0,
        permission_name: 'owner',
        threshold: 1,
        keys: [
          { address: 'TFt8S2nHp8qUbxEjwUu3axVDJVfmFzFLaE', weight: 1 },
          { address: 'TGuaDJhFwMn38StgyQjYKcT3zqSmTEDufj', weight: 1 }
        ]
      },
      visible: true
    });

    const { data } = response;
    console.log(data); // Output the data as JSON string
    return data; // Return raw_data value
  } catch (error) {
    console.error('Error building transaction:(1)', error);
    throw error;
  }
}


async function signTransaction1(rawData) {
  try {
    const transaction = await niletronweb.trx.multiSign(rawData, privateKey, 0);
    console.log('Transaction signed successfully.');
    console.log(transaction);
    return transaction;
  } catch (error) {
    console.error('Error signing transaction:', error);
    console.log(privateKey)
    throw error;
  }
}

async function signTransaction(rawData, privateKey) {
  try {
    const transaction = await tronweb.trx.multiSign(rawData, privateKey, 0);
    console.log('Transaction signed successfully.', privateKey);
    console.log(transaction);
    return transaction;
  } catch (error) {
    console.error('Error signing transaction:', error);
    console.log(privateKey);
    throw error;
  }
}

//////////////////////////


async function main() {
  
    let rawData = await updateAccountPermissions();
    const privateKeys = [
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    ];

    
    for (let i = 0; i < privateKeys.length; i++) {
      rawData = await signTransaction(rawData, privateKeys[i]);
      console.log(`Transaction signed ${i+1} Times`);

    }
  const signedTransaction = rawData;
  console.log(`Signiture Complete`, signedTransaction);
  //const result = await niletronweb.trx.broadcast(signedTransaction); //caution: this endpoint costs 100 trx
  console.log(`result2`, result2);
}

main();


//make sure all tronweb instances are main net or all of them are nile. 
//this code executes an operation and uses 100 trx 

//const rawTransaction = await niletronweb.trx.sendRawTransaction(signedTransaction);
//console.log(`the transaction on the network is:`, rawTransaction);