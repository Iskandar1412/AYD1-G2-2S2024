import { useState } from "react";
import axios from 'axios'; // Asegúrate de instalar axios con `npm install axios`

function Pantalla2({ command, carpetasOb, carpetas }) {
    
	  const [titulo, setTitulo] = useState('');
	  const [descripcion, setDescripcion] = useState('');
	  const [etiqueta, setEtiqueta] = useState('');
	  const [etiqueta_guardada, setEtiqueta_guardada] = useState('');
	  const [error, setError] = useState('');

	  const handleSubmit = async (e) => {
		e.preventDefault();

		// Validar que el título no esté vacío
		if (!titulo.trim()) {
		  setError('El título no puede estar vacío.');
		  return;
		}

		setError('');

		// Preparar los datos de la nota
		const nota = {
		  titulo,
		  descripcion,
		  etiqueta,
		  etiqueta_guardada,
		};

		try {
			const response = await axios.post('http://localhost:9200/add-note', nota);
			if (response.data.message==1){
				alert('La nota se ha guardado exitosamente');
			}else{
				alert(response.data.message);
			}

			//setResponseMessage('Información enviada correctamente: ' + response.data.message);
			setError('');

			// Limpiar los campos después de enviar
			setTitulo('');
			setDescripcion('');
			setEtiqueta('');
			setEtiqueta_guardada('');
		} catch (error) {
			setError('Error al enviar la información: ' + error.message);
		}
	  };

    return (
        <>
            <div className="vistas">
				
				<div class="pantalla">
				  <h1>Agregar Nota</h1>
				  <form onSubmit={handleSubmit}>
					<div>
					  <label htmlFor="titulo">Título:</label>
					  <input
						id="titulo"
						type="text"
						value={titulo}
						onChange={(e) => setTitulo(e.target.value)}
					  />
					</div>
					<div>
					  <label htmlFor="descripcion">Descripción:</label>
					  <textarea
						id="descripcion"
						cols="100" 
						rows="5"
						value={descripcion}
						onChange={(e) => setDescripcion(e.target.value)}
					  />
					</div>
					<div>
					  <label htmlFor="etiqueta_guardada">Seleccionar etiquetas guardadas:</label>
					  <input
						id="etiqueta_guardada"
						type="text"
						value={etiqueta_guardada}
						onChange={(e) => setEtiqueta_guardada(e.target.value)}
					  />
					</div>
					
					
					<div>
					  <label htmlFor="etiqueta">Nueva Etiqueta:</label>
					  <input
						id="etiqueta"
						type="text"
						value={etiqueta}
						onChange={(e) => setEtiqueta(e.target.value)}
					  />
					</div>
					
					{error && <p style={{ color: 'red' }}>{error}</p>}
					<button type="submit" class="buttonSendNote">Agregar Nota</button>
				  </form>
				</div>

            </div>
        </>
    );

}

export default Pantalla2;