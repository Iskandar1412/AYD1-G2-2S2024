DROP PROCEDURE IF EXISTS Practica1.CambiarArchived;

DELIMITER $$
$$
CREATE PROCEDURE Practica1.CambiarArchived(
	IN p_NotaID INT,
	IN p_Archived BOOLEAN
)
BEGIN
    UPDATE Notas SET Archived = p_Archived WHERE NotaID = p_NotaID;
END $$
DELIMITER ;