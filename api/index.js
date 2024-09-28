const express = require('express');
const sequelize = require('./src/config/db');
const router = require('./src/routes');
const cors = require('cors');
const errorHandler = require('./src/handlers/errorHandler');
const PORT = process.env.PORT;
const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	})
);

app.use(express.json());

app.use('/', router);

app.listen(PORT, async () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
	try {
		await sequelize.authenticate();
		console.log('Conexión a la base de datos exitosa.');
	} catch (error) {
		console.error('Error al conectar con la base de datos:', error);
	}
});

app.use(errorHandler);
