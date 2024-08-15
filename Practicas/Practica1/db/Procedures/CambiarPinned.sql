DROP PROCEDURE IF EXISTS Practica1.CambiarPinned;

DELIMITER $$
$$
CREATE PROCEDURE Practica1.CambiarPinned(IN p_NotaID INT, IN p_Pinned BOOLEAN)
BEGIN
    UPDATE Notas SET Pinned = p_Pinned WHERE NotaID = p_NotaID;
END$$
DELIMITER ;