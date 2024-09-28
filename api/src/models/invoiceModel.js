const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Invoice = sequelize.define(
	'Invoice',
	{
		idInvoice: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		client: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		total: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: 'idUser',
			},
			allowNull: false,
		},
	},
	{
		tableName: 'invoices',
		timestamps: false,
	}
);

User.hasMany(Invoice, { foreignKey: 'userId' });
Invoice.belongsTo(User, { foreignKey: 'userId' });

module.exports = Invoice;
