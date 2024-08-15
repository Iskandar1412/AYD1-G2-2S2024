DROP PROCEDURE IF EXISTS Practica1.ExisteCategoria;

DELIMITER $$
$$
CREATE PROCEDURE Practica1.ExisteCategoria(
    IN p_Categoria VARCHAR(60)
)
BEGIN   
    DECLARE existe INT;

    SELECT COUNT(*) INTO existe
    FROM Categoria
    WHERE Categoria = p_Categoria;

    IF existe > 0 THEN
        SELECT TRUE AS Resultado;
    ELSE
        SELECT FALSE AS Resultado;
    END IF;
END $$
DELIMITER ;