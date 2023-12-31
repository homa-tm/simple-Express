const sequelize = require('./sequelize');


async function updateBalance(address, balance) {
  try{
    const wallet = await sequelize.models.Wallet.findOne({ where: {address: address} });
    if (!wallet) {
      return await sequelize.models.Wallet.create({address: address, balance: balance});
    }

    await sequelize.models.Wallet.update(
    {balance: balance}, 
    {where: {address: wallet.address}});
    
    return sequelize.models.Wallet.findOne({ where: {address: address} });
} catch (error) {
  console.error('Error retrieving address balance:', error);
  throw Error(error);}}


module.exports = {updateBalance};


// async function createWallet(address) {}
// async function updateBalanceofExistingWallet(address) {}


// const sequelize = require('./sequelize');
// async function addRowToDepositEvent(accountId, BlockNum, toAddress, token, transactionId, value) {
//     await sequelize.models.DepositEvent.create(
//         {
//             accountId: accountId,
//             blockNumber:blockNum,
//             eventDateTime: new Date(),
//             toAddress: toAddress
//         }
//     );
// }


// async function addRowToColdWalletWithdraw(walletAddress, tokenAddress, priority) {
//     const result = await sequelize.models.ColdWalletWithdraw.findAll({
//       where: sequelize.and({address: walletAddress},
//         {tokenContractAddress: tokenAddress}, sequelize.or({status: ['WITHDRAW_IN_PROGRESS', 'WAITING_FOR_WITHDRAWAL']}))
//     });
  
//     if (result.length === 0) {
//       return await sequelize.models.ColdWalletWithdraw.create(
//         {address: walletAddress, status: "WAITING_FOR_WITHDRAWAL", tokenContractAddress: tokenAddress, priority: priority}
//       );
//     }
//   }

