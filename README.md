INVENTORY BACKEND API
==================================================

Este es el backend para el sistema de gestion de inventario. 
Permite la administracion de usuarios, categorias y productos.

ESTRUCTURA DEL PROYECTO
--------------------------------------------------
El proyecto sigue una arquitectura modular con versionamiento de controladores:
```
src
├── auth
│   ├── dto
│   ├── guards
│   ├── strategies
│   └── v1 (Controladores API v1)
├── categories
│   ├── dto
│   ├── entities
│   └── v1
├── products
│   ├── dto
│   ├── entities
│   └── v1
├── users
├── config
├── migrations
├── app.module.ts
└── main.ts
```

INSTALACION Y CONFIGURACION
--------------------------------------------------

Sigue estos pasos para configurar y ejecutar el proyecto:

1. Clonar el repositorio:
   git clone https://github.com/Easd99/inventory-back
   

2. cd inventory-back

3. Instalar dependencias:
   npm install

4. Configurar Variables de Entorno:
   Crea un archivo llamado ".env" en la raiz del proyecto. 
   Puedes copiar el contenido del archivo ".env-example" que ya viene incluido.
   
   Es necesario definir las siguientes variables:

   PORT=
   NODE_ENV=
   DB_CONNECTION=
   DB_HOST=
   DB_PORT=
   DB_DATABASE=
   DB_USERNAME=
   DB_PASSWORD=
   JWT_SECRET=
5. Hacer build del proyecto
   npm run build
6. Ejecutar el proyecto (Modo Produccion):
   npm run start:prod

DOCUMENTACION (SWAGGER)
--------------------------------------------------

Una vez que el servidor este corriendo, puedes acceder a la documentacion 
de la API en la siguiente direccion:

http://localhost:5000/docs

FUNCIONALIDADES PRINCIPALES
--------------------------------------------------

El sistema gestiona las siguientes entidades:

- Users: Gestion de usuarios y autenticacion (Guards y Strategies).
- Categories: Clasificacion de productos.
- Products: Manejo de inventario, stock y precios.
