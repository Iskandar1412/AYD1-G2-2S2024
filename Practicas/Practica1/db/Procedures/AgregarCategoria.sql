DROP PROCEDURE IF EXISTS Practica1.AgregarCategoria;

DELIMITER $$
$$
CREATE PROCEDURE Practica1.AgregarCategoria(
    IN p_Categoria VARCHAR(60)
)
BEGIN
    INSERT INTO Categoria (Categoria)
    VALUES (p_Categoria);
END $$
DELIMITER ;