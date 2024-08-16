import { useState, useEffect } from "react";
import '../page2.css';
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
		  setEtiqueta(valorSeleccionado);
		} else {
		  setEtiqueta(valorSeleccionado);
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
    
        if (!titulo.trim() || !descripcion.trim() || !etiqueta.trim()) {
            setError('Todos los campos deben estar llenos.');
            return;
        }
            
        const lineas = descripcion.split('\n').map(line => line.trim()).filter(line => line);
        const recordatorios = lineas.map(linea => ({ recordatorio: linea }));
        
        const recordatoriosToJSON = JSON.stringify(recordatorios);
        
        const nota = {
            titulo,
            categoria: etiqueta,
            recordatorios: recordatoriosToJSON
        };
    
        console.log(nota);
    
        try {
            const response = await fetch('http://localhost:9200/add-note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nota)
            });
    
            const data = await response.json();
    
            if (data.success) {
                setTitulo('');
                setDescripcion('');
                setEtiqueta('');
                setError('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Error al enviar la información: ' + error.message);
        }
    };
    



    return (
        <>
            <div className="vistas">
				<div className="pantalla2-container"> 
                <h1 className="form-title">Agregar Nota</h1>
                <form className="note-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="form-group">
                        <label htmlFor="titulo" className="form-label">Título:</label>
                        <input
                            id="titulo"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className="form-input"
                            aria-describedby="titulo-help"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion" className="form-label">Descripción:</label>
                        <textarea
                            id="descripcion"
                            cols="100"
                            rows="5"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="form-textarea"
                            aria-describedby="descripcion-help"
                        />
                    </div>

                    {OpcionNuevaEtiqueta && (
                        <div className="new-tag-container">
                            <label htmlFor="nueva_etiqueta" className="form-label">Nueva Etiqueta:</label>
                            <input
                                id="nueva_etiqueta"
                                type="text"
                                onChange={(e) => setEtiqueta(e.target.value)}
                                className="form-input"
                                aria-describedby="nueva_etiqueta-help"
                            />
                            <button type="button" onClick={CrearNuevaEtiqueta} className="button-new-tag">Listo</button>
                            {ErrorNuevaEtiqueta && <p className="error-message">{ErrorNuevaEtiqueta}</p>}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="etiqueta_guardada" className="form-label">Seleccionar etiquetas guardadas:</label>
                        <select
                            id="etiqueta_guardada"
                            value={etiqueta}
                            onChange={handleEtiquetaChange}
                            className="form-select"
                            aria-describedby="etiqueta_guardada-help"
                        >
                            <option value="">Selecciona una etiqueta</option>
                            {ListaEtiquetas.map((etiqueta, index) => (
                                <option key={index} value={etiqueta}>
                                    {etiqueta}
                                </option>
                            ))}
                        </select>
                    </div>

                    
                    <button type="submit" className="button-submit" onClick={handleSubmit}>Agregar Nota</button>
                    {error && <p className="error-message">{error}</p>}
                </form>

				</div>
            </div>

        </>
    );

}

export default Pantalla2;