# Etapa 1: build de Angular
FROM node:lts-alpine AS build
# Establece el directorio de trabajo
WORKDIR /app
# Copia los archivos de configuración de Node.js
COPY package.json package-lock.json ./
# Instala las dependencias de Node.js
RUN npm install

COPY . .
# Compila el proyecto para produccion
RUN npm run build -- --configuration production

# Etapa 2: nginx para servir archivos estáticos
FROM nginx:alpine

# Copia la build de Angular al contenido de Nginx
COPY --from=build /app/dist/gamevault /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
