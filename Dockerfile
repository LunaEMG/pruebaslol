# 1. Usamos un sistema base ligero que ya tiene Node.js instalado
FROM node:18-alpine

# 2. Creamos la carpeta donde vivirá nuestro código dentro del contenedor
WORKDIR /app

# 3. Copiamos los archivos que listan nuestras dependencias (package.json)
COPY package*.json ./

# 4. Instalamos las dependencias (Express) dentro del contenedor
RUN npm install

# 5. Copiamos el resto de nuestro código (el archivo index.js)
COPY . .

# 6. Indicamos el puerto de red que usará el contenedor
EXPOSE 3000

# 7. El comando final para arrancar nuestro servidor
CMD ["node", "index.js"]