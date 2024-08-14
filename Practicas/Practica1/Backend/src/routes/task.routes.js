// docker run --name <nombre_contenedor> -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=<contraseña> <nombre_imagen (mysql)>
// docker run --name ayd1 -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=super mysql:latest
// docker exec -it <nombre_contenedor> mysql -uroot -p<contraseña>
// docker exec -it ayd1 mysql -uroot -p

const express = require('express');
const router = express.Router();
const moment = require('moment');


router.get('/', (req, res) => {
    res.json('Node APP is running')
});


router.post('')

module.exports = router;