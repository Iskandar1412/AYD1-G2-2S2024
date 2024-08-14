CALL AgregarNota('Título de la nota', '10:00:00', '2024-08-14', 'Trabajo', '[{"categoria_id": 1, "recordatorio": "Recordatorio 1"}, {"categoria_id": 1, "recordatorio": "Recordatorio 2"}]');
CALL ModificarNota(1, 'Nuevo título', '12:30:00', '2024-08-15', 'Personal', '[{"recordatorio": "Nuevo recordatorio"}]');
CALL CambiarPinned(1, TRUE);
CALL CambiarPinned(1, FALSE);
CALL CambiarArchived(1, TRUE);
CALL CambiarArchived(1, FALSE);
CALL EliminarNota(1);