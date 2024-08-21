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
        const { titulo, categoria, recordatorios } = req.body;
        if (!titulo, !categoria, !recordatorios) {
            return res.status(400).json({ success: false, message: 'Campos no llenados' });
        } else {
            const [existeCategoria] = await pool.query('CALL ExisteCategoria(?)', categoria);
            // console.log(existeCategoria[0][0].Resultado);
            if (!existeCategoria[0][0].Resultado) {
                return res.status(400).json({ success: false, message: 'Categoria no existente' });
            } else {    
                const [exists] = await pool.query('CALL ExisteNota(?)', titulo);
                // console.log(exists[0][0].Mensaje);
                if (exists[0][0].Mensaje == true) {
                    return res.status(400).json({ success: false, message: 'Titulo de la nota ya existente' });
                } else {
                    await pool.query('CALL AgregarNota(?, ?, ?)', [titulo, categoria, recordatorios]);
                }
                const [datos] = await pool.query('CALL ObtenerNotas()');
                return res.json({ success: true, message: datos[0] });
            }
        }
    } catch (e) {
        return res.status(400).json({ success: false, message: 'Error en la Solicitud' })
    }
});

router.put('/update-note', async (req, res) => {
    try {
        const { id, titulo, categoria, recordatorios } = req.body;
        if (!titulo, !categoria, !recordatorios) {
            return res.status(400).json({ success: false, message: 'Campos no llenados' });
        }

        const [existeCategoria] = await pool.query('CALL ExisteCategoria(?)', categoria);
        // console.log(existeCategoria[0][0].Resultado);
        if (!existeCategoria[0][0].Resultado) {
            return res.status(400).json({ success: false, message: 'Categoria no existente' });
        }
        
        const [existeReg] = await pool.query('CALL VerificarNotaID(?, ?)', [id, titulo]);
        if (existeReg[0][0].Resultado) {
            await pool.query('CALL ModificarNota(?, ?, ?, ?)', [id, titulo, categoria, recordatorios]);
        } else {
            const [exists] = await pool.query('CALL ExisteNota(?)', [titulo]);
            if (exists[0][0].Mensaje) {
                return res.status(400).json({ success: false, message: 'Título de la nota ya existente' });
            } else {
                await pool.query('CALL ModificarNota(?, ?, ?, ?)', [id, titulo, categoria, recordatorios]);
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

router.delete('/delete-note', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID no valido' });
        }
        const [existeID] = await pool.query('CALL ExisteID(?)', id);
        if (existeID[0][0].Resultado) {
            await pool.query('CALL EliminarNota(?)', id);
        } else {
            return res.status(400).json({ success: false, message: 'Registro no existente' });
        }
        const [datos] = await pool.query('CALL ObtenerNotas()');
        return res.json({ success: true, message: datos[0] });
    } catch (e) {
        return res.status(400).json({ success: false, message: 'Error en la solicitud' });
    }
});

// Etiquetas
router.get('/obtain-etiq', async (req, res) => {
    try {
        const [validacion] = await pool.query('CALL ObtenerCategorias()');
        return res.json({ success: true, message: validacion[0] });
    } catch (e) {
        return res.status(400).json({ success: false, message: 'Internal Server Error' })
    }
});

router.post('/create-etiq', async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ success: false, message: 'Campo Vacio' });
        }
        
        const [existeCategoria] = await pool.query('CALL ExisteCategoria(?)', nombre);
        if (existeCategoria[0][0].Resultado) {
            return res.status(400).json({ success: false, message: 'Categoria ya existente' });
        }

        await pool.query('CALL AgregarCategoria(?)', nombre);
        const [respuesta] = await pool.query('CALL ObtenerCategorias()');
        return res.json({ success: true, message: respuesta[0] })
    } catch (e) {
        return res.status(400).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;