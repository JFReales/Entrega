exports.validateUser = (req, res, next) => {
	const { username, password, name, email } = req.body;

	if (!username || !password || !name || !email) {
		return res.status(400).json({
			error: 'Faltan campos obligatorios: usuario, contraseña, nombre y email son requeridos',
		});
	}

	next();
};
