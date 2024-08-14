DROP PROCEDURE IF EXISTS Practica1.ObtenerNotas;

DELIMITER $$
$$
CREATE PROCEDURE Practica1.ObtenerNotas()
BEGIN
    SELECT
        N.NotaID,
        N.Titulo,
        N.Hora,
        N.Fecha,
        N.Pinned,
        N.Archived,
        N.Categoria,
        JSON_ARRAYAGG(
            JSON_OBJECT('RecordatorioID', R.RecordatorioID, 'Recordatorio', R.Recordatorio)
        ) AS Recordatorios
    FROM Notas N
    LEFT JOIN Recordatorios R ON N.NotaID = R.NotaID
    GROUP BY N.NotaID;
END $$
DELIMITER ;