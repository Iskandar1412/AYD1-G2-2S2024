import { useState, useEffect } from "react";
import axios from 'axios'; // Asegúrate de instalar axios con `npm install axios`

function Pantalla2({ command, carpetasOb, carpetas }) {
    
	  const [titulo, setTitulo] = useState('');
	  const [descripcion, setDescripcion] = useState('');
	  const [etiqueta, setEtiqueta] = useState('');
	  const [ListaEtiquetas, setListaEtiquetas] = useState([]);
	  const [OpcionNuevaEtiqueta, setOpcionNuevaEtiqueta] = useState(0);
	  const [etiqueta_guardada, setEtiqueta_guardada] = useState('');
	  const [error, setError] = useState('');
	  const [ErrorNuevaEtiqueta, setErrorNuevaEtiqueta] = useState('');


	useEffect(() => {
		const fetchCategorias = async () => {
		  try {
			setListaEtiquetas([]);
			const response = await axios.get('http://localhost:9200/obtain-etiq');
			if (response.data.success) {
			  const categoriasExtraidas = response.data.message.map(item => item.Categoria);
			  categoriasExtraidas.push('Crear Nueva Etiqueta');
			  setListaEtiquetas(categoriasExtraidas);
			} else {
			  setError('Error en la respuesta del servidor');
			}
		  } catch (error) {
			setError('Error al obtener las categorías: ' + error.message);
		  }
		};
		fetchCategorias();
	}, []);


	const FuncionfetchCategorias = async () => {
		try {
		  setListaEtiquetas([]);
		  const response = await axios.get('http://localhost:9200/obtain-etiq');
		  if (response.data.success) {
			const categoriasExtraidas = response.data.message.map(item => item.Categoria);
			categoriasExtraidas.push('Crear Nueva Etiqueta');
			setListaEtiquetas(categoriasExtraidas);
		  } else {
			setError('Error en la respuesta del servidor');
		  }
		} catch (error) {
		  setError('Error al obtener las categorías: ' + error.message);
		}
	  };


	const handleEtiquetaChange = (e) => {
		const valorSeleccionado = e.target.value;
		if (valorSeleccionado === 'Crear Nueva Etiqueta') {
		  setOpcionNuevaEtiqueta(1);
		  setEtiqueta_guardada(valorSeleccionado);
		} else {
		  setEtiqueta_guardada(valorSeleccionado);
		  setOpcionNuevaEtiqueta(0);
		}
	  };


	const CrearNuevaEtiqueta = async () => {
		setErrorNuevaEtiqueta('');
        if (!etiqueta.trim()) {
            setErrorNuevaEtiqueta('La nueva etiqueta no puede estar vacía.');
            return;
        }

        try {
            const response = await fetch('http://localhost:9200/create-etiq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: etiqueta.trim() }),
            });

            const data = await response.json();

            if (response.ok) {
                setOpcionNuevaEtiqueta(0); 
                setEtiqueta(''); 
                setErrorNuevaEtiqueta(''); 
				FuncionfetchCategorias();
            } else {
                setErrorNuevaEtiqueta(data.message || 'Error desconocido');
            }
        } catch (error) {
            setErrorNuevaEtiqueta('Error en la conexión con el servidor.');
        }
    };




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

					{OpcionNuevaEtiqueta === 1 && (
						<div className="agregar-nueva-etiqueta">
							<label htmlFor="etiqueta">Nueva Etiqueta:</label>
							<input
								id="nueva_etiqueta"
								type="text"
								value={etiqueta}
								onChange={(e) => setEtiqueta(e.target.value)}
							/>
							<button type="button" onClick={CrearNuevaEtiqueta}>Listo</button>
							{ErrorNuevaEtiqueta && <p style={{ color: 'red' }}>{ErrorNuevaEtiqueta}</p>}
						</div>
					)}
					
					<div>
						<label htmlFor="etiqueta_guardada">Seleccionar etiquetas guardadas:</label>
						<select
						id="etiqueta_guardada"
						value={etiqueta_guardada}
						onChange={handleEtiquetaChange} // Utiliza la función handleEtiquetaChange
						>
						<option value="">Selecciona una etiqueta</option>
						{ListaEtiquetas.map((etiqueta, index) => (
							<option key={index} value={etiqueta}>
							{etiqueta}
							</option>
						))}
						</select>
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