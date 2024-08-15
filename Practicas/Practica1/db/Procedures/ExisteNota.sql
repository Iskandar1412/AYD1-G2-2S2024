DROP PROCEDURE IF EXISTS Practica1.ExisteNota;

DELIMITER $$
$$
CREATE PROCEDURE Practica1.ExisteNota(
    IN p_Titulo VARCHAR(60)
)
BEGIN
    DECLARE tituloExiste INT;
    
    SELECT COUNT(*) INTO tituloExiste
    FROM Notas
    WHERE Titulo = p_Titulo;
    
    IF tituloExiste > 0 THEN
        SELECT TRUE AS Mensaje;
    ELSE
        SELECT FALSE AS Mensaje;
    END IF;
END $$
DELIMITER ;