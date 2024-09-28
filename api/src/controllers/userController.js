const User = require('../models/userModel');
const Invoice = require('../models/invoiceModel');
const { faker } = require('@faker-js/faker');
const { Op } = require('sequelize');

exports.createUser = async (req, res) => {
	try {
		const { username, password, name, email } = req.body;

		const existingUserByEmail = await User.findOne({ where: { email } });
		const existingUserByUsername = await User.findOne({
			where: { username },
		});

		if (existingUserByEmail) {
			return res.status(400).json({ error: 'El email ya está en uso' });
		}

		if (existingUserByUsername) {
			return res
				.status(400)
				.json({ error: 'El username ya está en uso' });
		}

		const newUser = await User.create({ username, password, name, email });

		const invoices = [];
		for (let i = 0; i < 10; i++) {
			const newInvoice = await Invoice.create({
				client: faker.person.fullName(),
				total: parseFloat(faker.commerce.price()),
				date: faker.date.past(),
				userId: newUser.idUser,
			});
			invoices.push(newInvoice);
		}

		res.status(201).json({
			message: 'Usuario creado con éxito y facturas generadas.',
			user: newUser,
			invoices,
		});
	} catch (error) {
		console.error('Error al crear el usuario:', error);
		res.status(500).json({ error: 'Error al crear el usuario' });
	}
};

exports.getUserByID = async (req, res) => {
	try {
		const idUser = req.params.id;
		const user = await User.findByPk(idUser);
		if (!user) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener el usuario' });
	}
};

exports.login = async (req, res) => {
	const { usernameOrEmail, password } = req.body;

	if (!usernameOrEmail || !password) {
		return res
			.status(400)
			.json({ error: 'Faltan username/email y password' });
	}

	try {
		const user = await User.findOne({
			where: {
				[Op.or]: [
					{ username: usernameOrEmail },
					{ email: usernameOrEmail },
				],
			},
		});

		if (!user || user.password !== password) {
			return res.status(401).json({ error: 'Credenciales incorrectas' });
		}

		res.json({ mensaje: 'Inicio de sesión exitoso', user });
	} catch (error) {
		console.error('Error al iniciar sesión:', error);
		res.status(500).json({ error: 'Error al iniciar sesión' });
	}
};

exports.updateUser = async (req, res) => {
	try {
		const idUser = req.params.id;
		const { username, password, name } = req.body;
		const user = await User.findByPk(idUser);
		if (!user) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		user.username = username || user.username;
		user.password = password || user.password;
		user.name = name || user.name;

		await user.save();

		res.status(200).json({
			mensaje: 'Usuario actualizado con éxito',
			user: user,
		});
	} catch (error) {
		res.status(500).json({ error: 'Error al actualizar el usuario' });
	}
};

exports.recoveryRequest = async (req, res) => {
	try {
		const { usernameOrEmail } = req.body;

		const user = await User.findOne({
			where: {
				[Op.or]: [
					{ username: usernameOrEmail },
					{ email: usernameOrEmail },
				],
			},
		});

		if (!user) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		res.status(200).json({
			success: true,
			message:
				'Usuario encontrado. Redirigiendo a la página de recuperación de contraseña.',
			userId: user.idUser,
		});
	} catch (error) {
		console.error(
			'Error en la solicitud de recuperación de contraseña:',
			error
		);
		res.status(500).json({
			error: 'Error en la solicitud de recuperación de contraseña',
		});
	}
};

exports.resetPassword = async (req, res) => {
	const { id } = req.params;
	const { password } = req.body;

	try {
		const user = await User.findByPk(id);
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: 'Usuario no encontrado' });
		}

		user.password = password;
		await user.save();

		res.status(200).json({
			success: true,
			message: 'Contraseña actualizada con éxito',
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error al actualizar la contraseña',
		});
	}
};
