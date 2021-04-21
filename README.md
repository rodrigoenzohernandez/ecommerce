# ecommerce

Es un ecommerce para una ferretería, cuenta con los siguietes módulos:
- Log In
- Log Out
- Creación de usuarios
- CRUD de productos
- Carrito (_Agregar productos al carrito, editar cantidad, eliminar productos del carrito_)
- Confirmar compra
- Listado de productos por categoría
- Detalle del producto
- Perfil del usuario

## Comenzando 🚀
_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

* Tener instalado [NodeJS](https://nodejs.org/es/)
* Tener instalado [Docker](https://www.docker.com/get-started)
* Tener instalado [DockerCompose](https://docs.docker.com/compose/install/)


### Instalación 🔧


Clonar el proyecto
```
git clone https://github.com/rodrigoenzohernandez/api-weather-web.git
```

Ingresar al directorio del proyecto:
```
cd api-weather-web
```

Ubicarse en el branch de develop:
```
git checkout develop
```

Instalar las dependencias:
```
npm install
```

Levantar el proyecto
```
docker-compose up
```

Crear y popular con información de prueba la base de datos:
```
POST http://localhost:3000/api/setup
```

Crear un usuario desde la UI (_El primer usuario creado tendrá el rol de admin, el resto tendrán el rol de cliente_)
```
http://localhost:3000/register
```

Iniciar sesión
```
http://localhost:3000/login
```

## Rutas

### /api/setup

Si no existe, crea las tablas de la base de datos y las popula con datos de prueba.


## Construido con 🛠️

* [NodeJS](https://nodejs.org/es/) - Entorno en tiempo de ejecución.
* [EJS](https://ejs.co/) - Motor de plantillas.
* [JavaScript](https://www.javascript.com/) - Lenguaje de programación.
* [HTML](https://developer.mozilla.org/es/docs/Web/HTML) - Lenguaje de marcado de hipertexto.
* [CSS](https://developer.mozilla.org/es/docs/Web/CSS) - Hojas de estilo en cascada 
* [Express](https://expressjs.com/es/) - Backend Framework
* [JSON](https://www.json.org/json-en.html) - Formato de texto para el intercambio de archivos
* [npm](https://www.npmjs.com/) - Manejador de paquetes
* [GitFlow](https://www.gitflow.com/) - Flujo de trabajo de git.