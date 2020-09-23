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
platos, favoritos, roles, pedidos, estados y metodos de pago.

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

Los archivos sql se encuentran en la carpeta SQL Files.

## Requisitos

    Para el correcto funcionamiento del servidor es necesario contar con:
        - NodeJS (se desarrolló con node v12.18.3).
        - MySQL (se desarrolló con MariaDB v10.3.23).
        - Nodemon (opcional).

## Instalación

Para instalar las dependencias necesarias usamos, en la ruta del archivo package.json:

```
npm install
```

El proyecto incluye los modelos (carpeta modelos), las rutas (carpeta routes), la gestión de la comunicación con la base de dátos (archivo db.js),
uso de variables de entorno DB_HOST, DB_SCHEMA, DB_USER, DB_PASS, SECRET_JWT, APP_PORT. Además de un archivo init.js que pobla las tablas:

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

Las tablas son creadas automáticamente al momento de subir el servidor y sincronizarse con la base de datos.

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
Todos necesitan autenticacion con Json web token, es decir que en la cabecera se debe enviar la llave valor:

```
Key: Authorization
Valor: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjUsInJvbCI6MiwiaWF0IjoxNjAwNjU5NjUzLCJleHAiOjE2MDA2NjMyNTN9.I1h-jgcLVqB2nK7xVPE_ELHRflzIvgZ6ox0we65PCQ0
```

Excepto los default:

- POST/usuarios/register
  Request application/json
  ```
  // Campo de rol es adicional sólo si se es admin se pone el valor 1, si no, el default es 2
  {
    "usuario": "cliente2",
    "nombre": "Keanu",
    "apellido": "Reves",
    "email": "cliente2@reverbnation.com",
    "telefono": "379-339-0649",
    "direccion": "2017 hollywood Str",
    "password": "cliente123"
    "rol":1
  }
  ```
- POST/usuarios/login
  Request application/json
  ```
  // Sólo es necesario un campo de email, o uno de usuario
  {
    "usuario": "cliente2" || "email": "cliente2@reverbnation.com",
    "password": "cliente123"
  }
  ```

Los siguientes son los verbos y los request que reciben (si lo requieren):

### Estados: http://IP:PORT/api/estados

administrador

- GET/estados
- POST/estados
  Request application/json

  ```
  {
    "nombre":"Devuelto"
  }
  ```

- GET/estados/{id}
- PUT/estados/{id}
  Request application/json
  ```
  {
    "nombre":"Cancelado"
  }
  ```
  DELETE/estados/{id}

Cliente

- GET/estados
- GET/estados/{id}

### Formas de Pago: http://IP:PORT/api/formasPago

administrador

- GET/formasPago
- POST/formasPago
  Request application/json
  ```
    {
      "nombre":"Tarjeta Debito"
    }
  ```
- GET/formasPago/{id}
- PUT/formasPago/{id}
  Request application/json
  ```
    {
      "nombre":"Tarjeta Debito"
    }
  ```
- DELETE/formasPago/{id}

Cliente

- GET/formasPago
- GET/formasPago/{id}

### Favoritos: http://IP:PORT/api/favoritos

administrador

- GET/favoritos
- POST/favoritos
  Request application/json
  ```
    {
      "usuario":2
      "plato":10
    }
  ```
- GET/favoritos/{id}
- PUT/favoritos/{id}
  Request application/json
  ```
    {
      "usuario":2
      "plato":10
    }
  ```
- DELETE/favoritos/{id}

Cliente

- GET/favoritos
- POST/favoritos
  Request application/json
  ```
    {
      "plato":10
    }
  ```
- GET/favoritos/{id}
- DELETE/favoritos/{id}

### Pedidos: http://IP:PORT/api/pedidos

administrador

- GET/pedidos
- POST/pedidos
  Request application/json
  ```
     {
        "usuario": 3,
        "formaPago": 1,
        "platos":
          [{
            "id":10,
            "cantidad":1
          },
          {
            "id":11,
            "cantidad":2
          }
        ]
      }
  ```
- GET/pedidos/{id}
- PUT/pedidos/{id}
  Request application/json
  ```
    {
      "usuario": 3,
      "formaPago": 2
    }
  ```
- DELETE/pedidos/{id}

Cliente

- GET/pedidos
- GET/pedidos/{id}

### Platos: http://IP:PORT/api/platos

administrador

- GET/platos
- POST/platos
  Request application/json
  ```
    {
        "nombre": "Picada",
        "precio": 21200,
        "descripcion": "125 gramos de lomo de res, 160 gramos de pollo y crujientes cascos de papa acompañado de un delicioso aderezo.",
        "imagen": "https://dummyimage.com/150x150/000/fff"
    }
  ```
- GET/platos/{id}
- PUT/platos/{id}
  Request application/json
  ```
    {
        "nombre": "Picada",
        "precio": 21200,
        "descripcion": "125 gramos de lomo de res, 160 gramos de pollo y crujientes cascos de papa acompañado de un delicioso aderezo.",
        "imagen": "https://dummyimage.com/150x150/000/fff"
    }
  ```
- DELETE/platos/{id}

Cliente

- GET/platos
- GET/platos/{id}

### Roles: http://IP:PORT/api/roles

administrador

- GET/roles
- POST/roles
  Request application/json
  ```
  {
    "nombre":"Administrador"
  }
  ```
- GET/roles/{id}
- PUT/roles/{id}
  Request application/json
  ```
  {
    "nombre":"Administrador"
  }
  ```
- DELETE/roles/{id}

### Usuarios: http://IP:PORT/api/usuarios

administrador

- GET/usuarios/
- GET/usuarios/{id}
- PUT/usuarios/{id}
  Request application/json
  ```
  {
    "usuario": "cliente2",
    "nombre": "Keanu",
    "apellido": "Reves",
    "email": "cliente2@reverbnation.com",
    "telefono": "379-339-0649",
    "direccion": "2017 hollywood Str",
    "password": "cliente123"
    "rol":1
  }
  ```
- DELETE/usuarios/{id}

cliente

- PUT/usuarios/{id}
  //Si un usuario cliente envía el campo rol, este será descartado y no podrá editarlo, además sólo puede etidar su propio usuario
  Request application/json

      ```
      {
        "usuario": "cliente2",
        "nombre": "Keanu",
        "apellido": "Reves",
        "email": "cliente2@reverbnation.com",
        "telefono": "379-339-0649",
        "direccion": "2017 hollywood Str",
        "password": "cliente123"
        "rol":1
      }
      ```

- DELETE/usuarios/{id}
