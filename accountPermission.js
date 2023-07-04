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

const shastaHttpProvider = TronWeb.providers.HttpProvider;
const shastafullNode = new HttpProvider('https://api.shasta.trongrid.io');
const shastasolidityNode = new HttpProvider('https://api.shasta.trongrid.io');
const shastaeventServer = new HttpProvider('https://api.shasta.trongrid.io');

const shastatronweb = new TronWeb(
  shastafullNode,
  shastasolidityNode,
  shastaeventServer,
);

///////////////////////////////////////////////////////
async function getBalance(address) {
    try {
      const balanceNile = await niletronweb.trx.getBalance(address) / 1000000;
      const balanceMain = await tronweb.trx.getBalance(address) / 1000000;
      const balanceShasta = await shastatronweb.trx.getBalance(address) / 1000000;

      console.log(`Address: ` , address, `\nAddress balance: ${balanceNile} TRX, nile \nAddress balance: ${balanceShasta} TRX, shasta net\nAddress balance: ${balanceMain} TRX, main net`);
    } catch (error) {
      console.error('Error retrieving address balance:', error);
    }
  }
  
///////////////////////////////////////////////////////

async function updateAccountPermissionTrongrid() {
  // ownerAddress should be hex
  let ownerAddress = '4140dadc4ae6a8ecf9c071453b6c05c28a7d50e97f';
  let ownerPermission = { type: 0, permission_name: 'owner' };
  ownerPermission.threshold = 2;
  ownerPermission.keys = [];

  let activePermission = { type: 2, permission_name: 'active' };
  activePermission.threshold = 2;
  activePermission.operations = '7fff1fc0037e0000000000000000000000000000000000000000000000000000';
  activePermission.keys = [];

  //address should be hex. use this link: 
  //https://www.btcschools.net/tron/tron_tool_base58check_hex.php
  ownerPermission.keys.push({ address: '4140dadc4ae6a8ecf9c071453b6c05c28a7d50e97f', weight: 1 });
  ownerPermission.keys.push({ address: '414c18ec3dd2822b587b23b5adf09368ed9835ee0c', weight: 1 });
  ownerPermission.keys.push({ address: '41fb65ef52cb52bdb604631b194902285025a9d6ed', weight: 1 });


  activePermission.keys.push({ address: '4140dadc4ae6a8ecf9c071453b6c05c28a7d50e97f', weight: 1 });
  activePermission.keys.push({ address: '414c18ec3dd2822b587b23b5adf09368ed9835ee0c', weight: 1 });
  activePermission.keys.push({ address: '41fb65ef52cb52bdb604631b194902285025a9d6ed', weight: 1 });



  try {
    const updateTransaction = await niletronweb.transactionBuilder.updateAccountPermissions(ownerAddress, ownerPermission, null, [activePermission]);
    console.log(`Transaction built successfully. Owner Address(hex): ${ownerAddress}`);
    return updateTransaction;
  } catch (error) {
    console.error('Error building transaction:', error);
  }
}
///////////////////////////////////////////////////////


async function signTransaction(rawData, privateKey) {
  try {
    const transaction = await niletronweb.trx.multiSign(rawData, privateKey, 0);
    console.log('Transaction signed successfully.', privateKey);
    //console.log(transaction);
    return transaction;
  } catch (error) {
    console.error('Error signing transaction:', error);
    console.log(privateKey);
    throw error;
  }
}

///////////////////////////////////////////////////////
async function main() {
    
    let address = 'TFt8S2nHp8qUbxEjwUu3axVDJVfmFzFLaE';
    getBalance(address);

    let rawData = await updateAccountPermissionTrongrid();
    //console.log('transaction created for owner address');



    // in order to protect pvkeys, a getPrivateKey or getSignature function could be
    // placed here. this function can get the signature from the frontend and send it
    // to signTransaction(rawData, privateKey) 
    // or the signTransaction(rawData, privateKey) function could change.
    const privateKeys = [
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', //TFt8S2nHp8qUbxEjwUu3axVDJVfmFzFLaE
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' //TGuaDJhFwMn38StgyQjYKcT3zqSmTEDufj
    ];

    
    for (let i = 0; i < privateKeys.length; i++) {
      console.log(`Signiture number ${i+1} : `);
      rawData = await signTransaction(rawData, privateKeys[i]);
      }
  const signedTransaction = rawData;
  console.log(`Signiture Complete`);
  //console.log(`Signiture Complete`, signedTransaction);
  const broadcast = await niletronweb.trx.broadcast(signedTransaction);
  console.log(`broadcasted to blockchain: `, broadcast);
}

main();


//make sure all tronweb instances are main net or all of them are nile. 
//this code executes an operation and uses 100 trx 

//this is not tested yet, it may work. 
//const rawTransaction = await shastatronweb.trx.sendRawTransaction(signedTransaction);
//console.log(`the transaction on the network is:`, rawTransaction);

