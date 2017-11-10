# API PROYECTO DELBARRIO.PROVIDENCIA.CL

Versión 1

Template considerando buenas prácticas en el desarrollo de una API, las tecnología usadas son:

* [Express 4](http://expressjs.com/es/)
* Node 8x
* Cors
* Logger
* PostgreSQL
* Morgan (Logs diarios en archivos planos)
* Pg [Repositorio](https://github.com/brianc/node-postgres)
* [Knex](http://knexjs.org) (SQL query builder)
* [Bookshelf.js](http://bookshelfjs.org) (Mapeo objeto-relacional)
* jsonwebtoken [Repositorio](https://github.com/auth0/node-jsonwebtoken)
* [Passport](http://www.passportjs.org/) (Sistema de autenticación basado en estrategias)
* Passport-jwt [Repositorio](https://github.com/themikenicholson/passport-jwt) (Estrategia de Passport para jsonwebtoken)
* bcrypt.js [Repositorio](https://github.com/dcodeIO/bcrypt.js)
* Checkit.js [Repositorio](https://github.com/tgriesser/checkit) (Librería de validación de modelos)

* Test [mochajs](https://mochajs.org/#timeouts)

### Caracteristicas consideradas:
* Estructura de carpeta independiente por Ruta
* Metodos Autodocumentados

___________________________________________________________________________
## INSTALACION  ##

1.- Instalar NodeJS y NPM:

* Para sistemas operativos Linux y Windows [Ingrese Aqui](http://www.w3resource.com/node.js/installing-node.js-windows-and-linux.php)
* Para sistemas operativos OSX [Ingrese Aqui](https://coolestguidesontheplanet.com/installing-node-js-on-macos/). 
* Si necesita utilizar varias versiones de node puede usar [nvm](https://github.com/creationix/nvm)

2.- Instalar dependencias:
```
$ yarn install o npm install
```

3.- Instalar Docker-Composer:
```
[Resumen instalación](https://gist.github.com/mortegac/db6a824fcc94b900672326eabe44464b)
```

4.- Correr migraciones y seed de base de datos:
```
$ npm run-script migrate:run
$ npm run-script seed
```

___________________________________________________________________________
## EJECUCION ENTORNO DE DESARROLLO ##

Para ejecutar el entorno de Desarrollo fue considerado el uso de contenedores en Docker, actualmente fue solamente considerado una instancia de PostgreSQl para gestionar la base de datos.

1.- Instalación y Pre-Requisitos para instalar Docker-Compose`: 
	* [Procedimeinto de instalación](https://docs.docker.com/compose/install/#prerequisites)  

2.- Estructura de carpetas`:  Se considero el uso de la siguiente estructura 
	
```
│   ├── FUENTES
│   └── APIv1
│       ├── README.md
│       ├── app
│       ├── config.js
│       ├── index.js
│       ├── log
│       ├── main.js
│       ├── node_modules
│       ├── package.json
│       ├── test
│       └── yarn.lock
├── docker-compose.yml
├── publicApi
├── publicData
└── publicWww
```
Donde:

* FUENTES				:  Corresponde a la carpeta donde se encuentra el Código fuente de la Aplicación y de la API	

* docker-compose.yml    :  Archivo de configuración YAML, donde se definiden los servicios, redes y Volúmenes. [Más información](https://jsitech1.gitbooks.io/meet-docker/content/archivo_docker-compose_en_detalle.html)  

* publicApi				: Carpeta donde se aloja la versión en ejecución de la API, de esta carpeta se sirve el servicio de docker que levanta una instancia de Node

* publicData			: Carpeta que contiene los archivos fisicos de la Base de Datos 

* publicWww				: Carpeta que contiene los archivos del servidor Web utilizado


___________________________________________________________________________
## DEFINICION DE METODOS HTTP UTILIZADOS EN LA API ##
* GET:      Consultar y leer recursos
* POST:     Permite crear un nuevo recurso
* PUT:      Permite editar un recurso
* DELETE:   Elimina un recurso  
* PATCH:    Permite editar partes concretas de un recurso, recibe los datos mediante x-www-form-urlencode


___________________________________________________________________________
## AUTO-DOCUMENTADOR  ##
* PENDIENTE

___________________________________________________________________________
## TEST  ##
Se considera test a las rutas expuestas, para esto se utilizan los módulos 'mocha', 'chai' y 'axios'. Los test deben ser generados en la carpeta test como se muestra a continuación
```
│   └── API
│       ├── test
│       	├── persona.js
```
* Los test se ejecutan con el comando npm test / yarn test

___________________________________________________________________________
## INFORMACION GENERAL  ##

* [Código de Estado de HTTP](http://librosweb.es/tutorial/los-codigos-de-estado-de-http/)  
