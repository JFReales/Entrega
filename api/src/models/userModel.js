const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define(
	'User',
	{
		idUser: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: { msg: 'El formato del email es inválido' },
			},
		},
	},
	{
		tableName: 'users',
		timestamps: false,
	}
);

module.exports = User;
