// docker run --name <nombre_contenedor> -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=<contraseña> <nombre_imagen (mysql)>
// docker run --name ayd1 -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=super mysql:latest
// docker exec -it <nombre_contenedor> mysql -uroot -p<contraseña>
// docker exec -it ayd1 mysql -uroot -p

const express = require('express');
const router = express.Router();
const moment = require('moment');
const pool = require('../database/db');


router.get('/', (req, res) => {
    res.json('Node APP is running')
});


router.get('/obtain-notes', async(req, res) =>{
    try {
        const [validacion] = await pool.query('CALL ObtenerNotas()');
        // console.log(validacion);
        res.json({ success: true, message: validacion[0] });
    } catch (e) {
        res.status(400).json({ success: false, message: 'Internal Server Error' })
    }
});

router.post('/add-note', (req, res) => {
    try {
        const { titulo, hora, fecha, categoria, recordatorios } = req.body;

        console.log(titulo);
        console.log(hora);
        console.log(fecha);
        console.log(categoria);
        console.log(recordatorios);

        
        res.json({ success: true, message: 'Aprobado' })
    } catch (e) {
        res.status(400).json({ success: false, message: 'Internal server error' })
    }
});

module.exports = router;