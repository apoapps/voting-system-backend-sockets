# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias
RUN npm install --production

# Expón el puerto en el que se ejecutará tu aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "start.js"]
