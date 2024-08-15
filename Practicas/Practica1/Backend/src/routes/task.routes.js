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

router.get('/obtain-notes', async (req, res) =>{
    try {
        const [validacion] = await pool.query('CALL ObtenerNotas()');
        // console.log(validacion);
        return res.json({ success: true, message: validacion[0] });
    } catch (e) {
        return res.status(400).json({ success: false, message: 'Internal Server Error' })
    }
});

router.post('/add-note', async (req, res) => {
    try {
        const { titulo, hora, fecha, categoria, recordatorios } = req.body;
        if (!titulo, !hora, !fecha, !categoria, !recordatorios) {
            return res.status(400).json({ success: false, message: 'Campos no llenados' });
        } else {
            const [exists] = await pool.query('CALL ExisteNota(?)', titulo);
            // console.log(exists[0][0].Mensaje);
            if (exists[0][0].Mensaje == true) {
                return res.status(400).json({ success: false, message: 'Titulo de la nota ya existente' });
            } else {
                await pool.query('CALL AgregarNota(?, ?, ?, ?, ?)', [titulo, hora, fecha, categoria, recordatorios]);
                try {
                    const [datos] = await pool.query('CALL ObtenerNotas()');
                    return res.json({ success: true, message: datos[0] });
                } catch (exception) {
                    return res.status(400).json({ success:false, message: 'Internal Server Error' });
                }
            }
        }
    } catch (e) {
        return res.status(400).json({ success: false, message: 'Error en la Solicitud' })
    }
});

router.put('/update-note', async (req, res) => {
    try {
        const { id, titulo, hora, fecha, categoria, recordatorios } = req.body;
        if (!titulo || !hora || !fecha || !categoria || !recordatorios) {
            return res.status(400).json({ success: false, message: 'Campos no llenados' });
        }

        const [existeReg] = await pool.query('CALL VerificarNotaID(?, ?)', [id, titulo]);
        if (existeReg[0][0].Resultado) {
            await pool.query('CALL ModificarNota(?, ?, ?, ?, ?, ?)', [id, titulo, hora, fecha, categoria, recordatorios]);
        } else {
            const [exists] = await pool.query('CALL ExisteNota(?)', [titulo]);
            if (exists[0][0].Mensaje) {
                return res.status(400).json({ success: false, message: 'Título de la nota ya existente' });
            } else {
                await pool.query('CALL ModificarNota(?, ?, ?, ?, ?, ?)', [id, titulo, hora, fecha, categoria, recordatorios]);
            }
        }

        const [datos] = await pool.query('CALL ObtenerNotas()');
        return res.json({ success: true, message: datos[0] });
    } catch (e) {
        return res.status(400).json({ success: false, message: 'Error en la solicitud' });
    }
});

router.put('/update-pin', async (req, res) => {
    try {
        const { id, pin } = req.body;
        await pool.query('CALL CambiarPinned(?, ?)', [id, pin]);
        const [datos] = await pool.query('CALL ObtenerNotas()');
        return res.json({ success: true, message: datos[0] });
    } catch (e) {
        return res.status(400).json({ success: false, message: 'Error en la solicitud' });
    }
});

router.put('/update-archived', async (req, res) => {
    try {
        const { id, archive } = req.body;
        await pool.query('CALL CambiarArchived(?, ?)', [id, archive]);
        const [datos] = await pool.query('CALL ObtenerNotas()');
        return res.json({ success: true, message: datos[0] });
    } catch (e) {
        return res.status(400).json({ success: false, message: 'Error en la solicitud' });
    }
});

module.exports = router;