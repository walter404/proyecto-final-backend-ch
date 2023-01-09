# BARONI Eneas - Curso CODERHOUSE Backend

Entrega Final del curso de Backend en CoderHouse

eCommerce Backend

## Instalación

1. Forkeá y cloná el repositorio

2. Parado en la raíz del proyecto moverce a la carpeta server con "cd server" y ejecutar 

   ```
   npm install
   ```
    para instalar todas las dependecias del proyecto

3. Ejecutar 

   ```
   node app.js
   ```

    para correr el proyecto. El proyecto estará disponible en http://localhost:8080
    La puerto de escucha esta seteado en el archivo congif.js

4. En una nueva terminal, pararse en la carpeta client y ejecutar 

   
   ```
   npm install
   ```

    para instalar todas las dependecias del proyecto

5. Ejecutar

    ```
    npm start
    ```
    
    para correr el proyecto. El proyecto estará disponible en http://localhost:3000


## Uso

El proyecto cuenta con un sistema de login y registro de usuarios. Para poder acceder a las funcionalidades del mismo es necesario estar logueado.


### Login

Para loguearse se debe ingresar un email y una contraseña válidos. 


### Registro

Para registrarse se debe ingresar un nombre, telefono, email, direccion, edad y una contraseña válidos.


### Productos

Los productos se pueden ver en la vista principal del sitio. Al hacer click en un producto se abre una vista con la información del mismo. En la misma se puede agregar al carrito, seleccionando la cantidad necesaria, o volver a la vista principal.


### Carrito

El carrito de compras se encuentra en la barra de navegación. Al hacer click en el icono del carrito se abre una vista con el contenido del carrito. En la misma se puede eliminar productos o vaciar el carrito y finalizar la compra.
Al finalizar la compra se envia un mail con la orden realizada.


### Profile

El perfil de usuario se encuentra en la barra de navegación. Al hacer click en el icono del perfil se abre una vista con la información del usuario. En la misma se puede acceder a las ordenes y/o cerrar sesión.


### Ordenes

Las ordenes se pueden acceder desde el perfil de usuario. Al hacer click en el link se abre una vista con las ordenes realizadas. En caso de no haber ordenes se muestra un mensaje indicando que no hay ordenes.


### Chat

Para acceder al chat se debe hacer click en el icono del chat flotante en el la punta inferior derecha. Al hacer click se abre una vista con el chat. En la misma se puede enviar mensajes y ver los mensajes recibidos.


## Tecnologías

### Frontend

- React
- React Router
- React Router Dom
- Axios
- socket.io-client

### Backend

- Node.js
- Express
- Socket.io
- Mongoose
- MongoDB
- Nodemailer
- Passport

### Base de datos

- MongoDB



