DROP PROCEDURE IF EXISTS Practica1.ModificarNota;

DELIMITER $$
$$
CREATE PROCEDURE Practica1.ModificarNota(
    IN p_NotaID INT,
    IN p_Titulo VARCHAR(60),
    IN p_Hora TIME,
    IN p_Fecha DATE,
    IN p_Categoria VARCHAR(30),
    IN p_Recordatorios JSON
)
BEGIN
    DECLARE idx INT DEFAULT 0;
    DECLARE totalRecordatorios INT;
    DECLARE recordatorioText VARCHAR(255);
    
    UPDATE Notas
    SET Titulo = p_Titulo, Hora = p_Hora, Fecha = p_Fecha, Categoria = p_Categoria
    WHERE NotaID = p_NotaID;
    
    DELETE FROM Recordatorios WHERE NotaID = p_NotaID;
    
    SET totalRecordatorios = JSON_LENGTH(p_Recordatorios);
    
    WHILE idx < totalRecordatorios DO
        SET recordatorioText = JSON_UNQUOTE(JSON_EXTRACT(p_Recordatorios, CONCAT('$[', idx, '].recordatorio')));
        
        IF recordatorioText IS NOT NULL THEN
            INSERT IGNORE INTO Recordatorios (NotaID, Recordatorio)
            VALUES (p_NotaID, recordatorioText);
        END IF;
        
        SET idx = idx + 1;
    END WHILE;
END $$
DELIMITER ;