const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Wallet', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING(34),
            unique: true
        },
        balance: {
            allowNull: true,
            type: DataTypes.BIGINT,
        },
        usdtBalance: {
            allowNull: true,
            type: DataTypes.BIGINT,
           
        }
    },
    {
        tableName: 'tron_balance'
    });
};

//acc id hamaro 1 bde felan 
// albte as bcknd bgir vali ta nist 1 bde


