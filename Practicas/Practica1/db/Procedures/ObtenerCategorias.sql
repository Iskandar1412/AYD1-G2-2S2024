DROP PROCEDURE IF EXISTS Practica1.ObtenerCategorias;

DELIMITER $$
$$
CREATE PROCEDURE Practica1.ObtenerCategorias()
BEGIN
    SELECT
        N.CategoriaID,
        N.Categoria
    FROM Categoria N
    GROUP BY N.CategoriaID;
END $$
DELIMITER ;