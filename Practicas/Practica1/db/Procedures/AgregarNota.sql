DROP PROCEDURE IF EXISTS Practica1.AgregarNota;

DELIMITER $$
$$
CREATE PROCEDURE Practica1.AgregarNota(
    IN p_Titulo VARCHAR(60),
    IN p_Hora TIME,
    IN p_Fecha DATE,
    IN p_Categoria VARCHAR(30),
    IN p_Recordatorios JSON
)
BEGIN
    DECLARE newNotaID INT;
    DECLARE idx INT DEFAULT 0;
    DECLARE totalRecordatorios INT;
    DECLARE recordatorioText VARCHAR(255);
    
    INSERT INTO Notas (Titulo, Hora, Fecha, Categoria)
    VALUES (p_Titulo, p_Hora, p_Fecha, p_Categoria);
    
    SET newNotaID = LAST_INSERT_ID();
    SET totalRecordatorios = JSON_LENGTH(p_Recordatorios);
    
    WHILE idx < totalRecordatorios DO
        SET recordatorioText = JSON_UNQUOTE(JSON_EXTRACT(p_Recordatorios, CONCAT('$[', idx, '].recordatorio')));
        
        IF recordatorioText IS NOT NULL THEN
            INSERT IGNORE INTO Recordatorios (NotaID, Recordatorio)
            VALUES (newNotaID, recordatorioText);
        END IF;
        
        SET idx = idx + 1;
    END WHILE;
END $$
DELIMITER ;