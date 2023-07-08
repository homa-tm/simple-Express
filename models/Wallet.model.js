const { DataTypes } = require('sequelize');
//const { sequelize } = require("../dbsetup.js");


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
            type: DataTypes.CHAR(50),
            unique: false
        },
        trxBalance: {
            allowNull: true,
            type: DataTypes.BIGINT,
            unique: true
        },
        usdtBalance: {
            allowNull: true,
            type: DataTypes.BIGINT,
            unique: true
        }
    },
    {
        tableName: 'tron_balance'
    });
};

//acc id hamaro 1 bde felan 
// albte as bcknd bgir vali ta nist 1 bde


