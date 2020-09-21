# Delilah Restó

Este es un proyecto desarrollado para el curso de Desarrollo Web FullStack de Acámica.
Es un servicio de Backend - API REST con NodeJS y base de dátos MySQL

## Tecnologías:

- Node JS
- MySQL

## Librerías - Usos:

- bcryptjs: v2.4.3 - Cifrado de la contraseña.
- body-parser: v1.19.0 - Parsear el cuerpo de la petición y respuesta.
- cors: v2.8.5 - Permitir la comunicación con servicios fuera del servidor local.
- dotenv: v8.2.0 - Uso de archivo para variables del sistema.
- express: v4.17.1 - Servicio y comunicaciones mediante endPoints - REST.
- express-validator: v6.6.1 - Validador de los elementos enviados en a los endPoints.
- jsonwebtoken: v8.5.1 - Implementación seguridad a través de Tokens Web en formato JSON.
- mysql2: v2.2.2 - Cliente para NodeJs para la comunicación con la base de dátos MySQL
- sequelize: v6.3 - ORM que permite mapear los objetos y las peticiones a diferentes tipos de bases de Dátos.

## Proyecto

El proyecto levanta un servidor REST comunicado con una base de dátos mysql, el cuál permite un sistema de gestión de usuarios,
platos y pedidos.

### Tablas:

La base de dátos cuenta con 8 tablas para su funcionamiento:

- Descripcion_pedidos.
- Estados.
- Favoritos.
- FormaDePagos.
- Pedidos.
- Platos.
- Roles.
- Usuarios.

## Requisitos

    Para el correcto funcionamiento del servidor es necesario contar con:
        - NodeJS (se desarrolló con node v12.18.3).
        - MySQL (se desarrolló con MariaDB v10.3.23).
        - Nodemon (opcional).

## Instalación

El proyecto incluye los modelos (carpeta modelos), las rutas (carpeta routes), la gestión de la comunicación con la base de dátos (archivo db.js),
uso de variables de entorno DB_HOST, DB_SCHEMA, DB_USER, DB_PASS, SECRET_JWT, APP_PORT. Además de un archivo init.js que pobla las bases de datos:

- Roles:
  - Adminsitrador.
  - Cliente.
- Estados:
  - Nuevo.
  - Confirmado.
  - Preparando.
  - Enviando.
  - Entregado.
- FormaDePagos:
  - Efectivo.
  - Tarjeta.

Para iniciar el servidor, con nodemon:
```
npm run dev
```
Para iniciar el servidor, directamente:
```
node index.js
```

## EndoPoints

Todos los Endpoints se llaman a travéz de la url http://IP:PORT/api/ENDPOINT

### Estados: http://IP:PORT/api/estados

### Formas de Pago: http://IP:PORT/api/formasPago

### Favoritos: http://IP:PORT/api/favoritos

### Pedidos: http://IP:PORT/api/pedidos

### Platos: http://IP:PORT/api/platos

### Roles: http://IP:PORT/api/roles

### Usuarios: http://IP:PORT/api/usuarios
