INVENTORY BACKEND API
==================================================

Este es el backend para el sistema de gestion de inventario. 
Permite la administracion de usuarios, categorias y productos.

INSTALACION Y EJECUCION
--------------------------------------------------

Sigue estos pasos para ejecutar el proyecto:

1. Clonar el repositorio:
   git clone https://github.com/Easd99/inventory-back
  
2. cd inventory-back

3. Instalar dependencias:
   npm install

4. Ejecutar el proyecto (Modo Produccion):
   npm run start:prod

DOCUMENTACION (SWAGGER)
--------------------------------------------------

Una vez que el servidor este corriendo, puedes acceder a la documentacion 
de la API en la siguiente direccion:

http://localhost:5000/docs

FUNCIONALIDADES PRINCIPALES
--------------------------------------------------

El sistema gestiona las siguientes entidades:

- Users: Gestion de usuarios y autenticacion.
- Categories: Clasificacion de productos.
- Products: Manejo de inventario, stock y precios.