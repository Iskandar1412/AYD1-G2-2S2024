DROP PROCEDURE IF EXISTS Practica1.EliminarNota;

DELIMITER $$
$$
CREATE PROCEDURE Practica1.EliminarNota(IN p_NotaID INT)
BEGIN
    DELETE FROM Recordatorios WHERE NotaID = p_NotaID;
    DELETE FROM Notas WHERE NotaID = p_NotaID;
END$$
DELIMITER ;