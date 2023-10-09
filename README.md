# Voting System Backend

Este repositorio contiene el código y los recursos para el backend del sistema de votación desarrollado para el Ayuntamiento de Mexicali. El objetivo principal de este proyecto es proporcionar la lógica y los servicios necesarios para hacer que el proceso de votación durante las sesiones del consejo sea más eficiente y eficaz.

## Instalación

Sigue estos pasos para configurar el backend del sistema de votación en tu entorno de desarrollo:

1. Clona este repositorio en tu máquina local.
2. Asegúrate de tener Node.js y MongoDB instalados en tu sistema.
3. Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:

MONGODB_URI=<URL_de_conexión_a_MongoDB>

Reemplaza `<URL_de_conexión_a_MongoDB>` con la URL de conexión a tu base de datos MongoDB.

4. Ejecuta `npm install` para instalar todas las dependencias del proyecto.
5. Ejecuta `npm start` para iniciar el servidor backend.

¡El backend del sistema de votación ahora está instalado y en ejecución en tu entorno de desarrollo!

## Características clave

- Administración de usuarios: El backend permite crear y administrar usuarios con diferentes roles, como regidores, diputados y presidente, para otorgar los permisos adecuados en la aplicación.
- Gestión de sesiones de consejo: Se proporcionan servicios para crear y modificar sesiones de consejo, incluyendo la configuración de puntos a tratar y los requisitos de votación.
- Votación en tiempo real: Utilizando la tecnología de WebSockets, se implementa la funcionalidad de votación en tiempo real, permitiendo la actualización instantánea de los resultados de la votación en todos los dispositivos conectados.
- Comunicación bidireccional: El backend se encarga de la comunicación bidireccional entre los diferentes componentes de la aplicación, como el frontend de escritorio, la aplicación de TV y las tablets utilizadas por los participantes en la sesión.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- WebSockets

## Contacto

Si tienes alguna pregunta o consulta relacionada con este proyecto, no dudes en contactarme.

- Nombre: Alejandro Apodaca Cordova (Apoapps)
- Sitio web personal: [apodapps.com](http://apodapps.com)
- Correo electrónico: [alexlink2004@gmail.com](mailto:alexlink2004@gmail.com)

**Nota:** Este proyecto es privado y no acepta contribuciones.
