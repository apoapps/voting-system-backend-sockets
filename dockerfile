# Usar una versión específica de Node.js basada en tu proyecto
FROM node:18.16.1

ENV MONGODB_URI=mongodb://mongo:27017/test

# Establecer el directorio de trabajo dentro de la imagen
WORKDIR /app

# Copiar los archivos de definición del proyecto
COPY package*.json ./

# Instalar las dependencias del proyecto (incluyendo las dependencias para producción y desarrollo si es necesario)
RUN npm install

# Copiar todos los archivos del proyecto al directorio de trabajo en la imagen
COPY . .

# Definir la variable de entorno para el puerto que tu aplicación utilizará
ENV PORT=3001

# Informar a Docker que el contenedor escuchará en el puerto 3001
EXPOSE 3001

# Definir el comando que ejecutará la aplicación
# Asegúrate de que "dev" sea un script definido en tu package.json
CMD [ "npm", "run", "dev" ]
