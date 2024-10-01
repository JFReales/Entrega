Facturación App - README

Descripción

Esta es una aplicación de facturación que permite a los usuarios registrarse, iniciar sesión, ver una lista de facturas y realizar otras acciones como recuperación de contraseña y cambio de tema (dark/light). El backend está construido con Node.js y Express, mientras que el frontend utiliza React. La base de datos es PostgreSQL.

Estructura del Proyecto
Backend:

Framework: Node.js con Express

Base de datos: PostgreSQL

ORM: Sequelize

Librerías:

. dotenv: Manejo de variables de entorno

. axios: Solicitudes HTTP desde el frontend

. faker: Generación de datos aleatorios para la base de datos (facturas)

. bcrypt: Encriptado de contraseñas del usuario


Frontend:

Librería: React
. Librerías utilizadas:
axios: Para realizar peticiones HTTP al backend
styled-components: Para estilos personalizados
react-router-dom: Para manejo de rutas
react-modal: Para manejar modales

Funcionalidades:
Registro e inicio de sesión de usuarios
Listado de facturas con búsqueda y ordenación
Cambio de contraseña con recuperación por correo
Cambio de tema (light/dark)

Requisitos
. Requisitos mínimos:
Node.js: v14.x o superior
npm: v6.x o superior
PostgreSQL: v12.x o superior
Es necesario tener PostgreSQL instalado y configurado. Se recomienda configurar un usuario y una base de datos específica para esta aplicación.
. Requisitos opcionales:
Visual Studio Code o cualquier otro editor de código para facilitar la edición y ejecución del proyecto.

Variables de entorno:
Crear un archivo .env en la raíz del proyecto con la siguiente configuración:

# Configuración de la base de datos

DB_NAME=<nombre_de_la_base_de_datos>
DB_USER=<usuario_postgres>
DB_PASSWORD=<contraseña_postgres>
DB_HOST=localhost
DB_PORT=5433

# Configuración del servidor

PORT=3000

Instalación
Backend
Clona este repositorio:

git clone <URL_DEL_REPOSITORIO>
cd api

Instala las dependencias del backend:

npm install

Inicia la base de datos PostgreSQL y asegúrate de crear la base de datos y el usuario en PostgreSQL con los mismos valores que están en tu archivo .env.

Ejecuta el backend:

npm start

Frontend
Cambia al directorio client:

cd client

Instala las dependencias del frontend:

npm install

Inicia el servidor de desarrollo del frontend:

npm start

Uso

Abre tu navegador y accede a http://localhost:3000.
Regístrate como un nuevo usuario o inicia sesión si ya tienes una cuenta.
Después de iniciar sesión, verás una lista de facturas generadas aleatoriamente.
Puedes utilizar el buscador para filtrar las facturas y cambiar el tema entre light/dark.

Tecnologías Utilizadas

Backend:
. Node.js
. Express
. PostgreSQL
. Sequelize
. Faker.js

Frontend:
. React
. Axios
. React Router
. Styled Components
. React Modal
