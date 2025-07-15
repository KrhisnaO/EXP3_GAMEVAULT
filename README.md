# Gamevault

GameVault es una aplicación web desarrollada con Angular que permite explorar, gestionar y comprar juegos de mesa por categoría. Incluye funcionalidades tanto para usuarios como para administradores, como carrito de compras, edición de productos y administración de usuarios.

## 🚀 Tecnologías

- Angular CLI v16.2.16
- TypeScript
- Bootstrap (para estilos)
- LocalStorage (persistencia local y datos)
- Karma + Jasmine
- Compodoc (para generación de documentación)

---

## 🧩 Funcionalidades

### Usuario
- Navegación por categorías: Estrategia, Familiares, Infantiles, Cartas.
- Visualización de juegos con precio, imagen, descripción y detalles técnicos.
- Sistema de carrito de compras (con persistencia por sesión).
- Detalle individual de cada juego.
- Registro, inicio de sesión y compra simulada.

### Administrador
- Agregar o eliminar juegos.
- Agregar o eliminar usuarios.
- Edición de juegos en línea (nombre, precio, descripción, oferta, etc).
- Panel de administración con formularios dinámicos.

---

## 📦 Instalación y ejecución

### 1. Clona el repositorio

```bash
git clone https://github.com/KrhisnaO/GAMEVAULT_S2.git
cd gamevault
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Ejecuta el servidor

```bash
ng serve
```

## 🧪 Pruebas Unitarias
Este proyecto incluye pruebas unitarias para componentes clave utilizando Karma + Jasmine.

Ejecutar las pruebas
```bash
ng test
```
Esto abrirá una ventana en el navegador con los resultados en tiempo real usando Karma.

## 📚 Documentación Técnica
GameVault incluye generación automática de documentación con Compodoc.

Instalar Compodoc
```bash
npm install -g @compodoc/compodoc
```
Generar la documentación
```bash
npx compodoc -p tsconfig.json
```
Servir la documentación en navegador
```bash
npx compodoc -s
```
Esto abrirá un servidor en: http://localhost:8080
