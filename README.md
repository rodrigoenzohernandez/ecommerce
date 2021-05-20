# ecommerce

Is an ecommerce for a hardware store. It has the next modules:

- Log In
- Log Out
- User's CRUD 
- Product's CRUD
- Cart's CRUD (_Add items to cart, modify quantity, delete items from cart_)
- Confirm purchase
- List of products by category
- Product detal
- User profile

## Get started 🚀
_Follow this instructions to locally deploy the project_

### Preconditions 📋

* Install [Docker](https://www.docker.com/get-started)
* Install [DockerCompose](https://docs.docker.com/compose/install/)


### Installation 🔧


Clone the repo
```
git clone https://github.com/rodrigoenzohernandez/ecommerce.git
```

Navigate to project directory
```
cd ecommerce
```

Create files to set the enviroment variables

api.env

_No variables yet_

db.env

```
MYSQL_DATABASE=ecommerce_database
MYSQL_ROOT_PASSWORD=any-password-you-want
PMA_HOST_db
``` 

Local deploy
```
docker-compose up
```

Create and populate database with basic information
```
POST http://localhost:3000/api/setup
```

Create a user (_The first user will have admin role, the rest of the users will have the client role_)
```
http://localhost:3000/register
```

## Endpoints

### /api/setup

If it doesn't exist, creates the database tables and populates them with basic test data.


## Build with 🛠️

* [NodeJS](https://nodejs.org/es/).
* [EJS](https://ejs.co/)
* [JavaScript](https://www.javascript.com/)
* [HTML](https://developer.mozilla.org/es/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/es/docs/Web/CSS)
* [Express](https://expressjs.com/es/)
* [JSON](https://www.json.org/json-en.html)
* [npm](https://www.npmjs.com/)
* [GitFlow](https://www.gitflow.com/)
* [Docker](https://www.docker.com/get-started)
* [DockerCompose](https://docs.docker.com/compose/install/)
