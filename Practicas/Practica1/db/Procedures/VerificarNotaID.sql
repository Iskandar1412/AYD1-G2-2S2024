DROP PROCEDURE IF EXISTS Practica1.VerificarNotaID;

DELIMITER $$
$$
CREATE PROCEDURE Practica1.VerificarNotaID(
	IN p_NotaID INT,
    IN p_Titulo VARCHAR(60)
)
BEGIN
    DECLARE notaExiste INT;
    
    SELECT COUNT(*) INTO notaExiste
    FROM Notas
    WHERE NotaID = p_NotaID AND Titulo = p_Titulo;
    
    IF notaExiste > 0 THEN
        SELECT TRUE AS Resultado;
    ELSE
        SELECT FALSE AS Resultado;
    END IF;
END $$
DELIMITER ;