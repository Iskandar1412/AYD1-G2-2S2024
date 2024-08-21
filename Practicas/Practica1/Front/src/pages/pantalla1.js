import React, { useEffect, useState } from 'react';
import { pathbackend } from '../path';
import axios from 'axios'

function Pantalla1({ cambios, setCambios, setChange, change2 }) {
    const [filtro, setFiltro] = useState('Sin Filtro');
    const [notas, setNotas] = useState([]);
    const [notas2, setNotas2] = useState([]);
    const [notaTemp, setNotaTemp] = useState([]);

    const [OpcionNuevaEtiqueta2, setOpcionNuevaEtiqueta2] = useState(0);
    const [etiqueta_guardada2, setEtiqueta_guardada2] = useState('');
    const [ErrorNuevaEtiqueta2, setErrorNuevaEtiqueta2] = useState('');
    const [etiqueta2, setEtiqueta2] = useState('');
    const [error2, setError2] = useState('');
    const [ListaEtiquetas2, setListaEtiquetas2] = useState([]);
    const [titulo2, setTitulo2] = useState('');
    const [descripcion2, setDescripcion2] = useState('');

    useEffect(() => {
        const ufetchNotas = async () => {
            try {
                setNotas([]);
                setNotas2([]);
                const response = await axios.get(`${pathbackend}/obtain-notes`);
                if (response.status === 200) {
                    setNotas(response.data.message);
                    setNotas2(response.data.message);
                } else {
                    console.log('Error en la solicitud')
                }
            } catch (e) {
                console.error('Error:', e);
            }
        };

        ufetchNotas();
    }, []);

    const fetchNotas = async () => {
        try {
            setNotas([]);
            setNotas2([]);
            const response = await axios.get(`${pathbackend}/obtain-notes`);
            if (response.status === 200) {
                setNotas(response.data.message);
                setNotas2(response.data.message);
            } else {
                console.log('Error en la solicitud')
            }
        } catch (e) {
            console.error('Error:', e);
        }
    };

    const HandlePinnedValue = async(e) => {
        const IDNota = e.target.getAttribute('data-value');
        const VF = e.target.getAttribute('data-caption');

        const env = {
            "id": IDNota,
            "pin": false
        }
        if (VF === '0') {
            env.pin = true
        } else {
            env.pin = false
        }
        try {
            const response = await fetch(`${pathbackend}/update-pin`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(env)
            })

            const data = await response.json();
            if (data.success) {
                fetchNotas();
            } else {
                console.log('Error en la solicitud')
            }
        } catch (e) {
            console.error('Error:', e);
        }
    }

    const HandleDelete = async(e) => {
        const IDNota = e.target.getAttribute('data-value');
        try {
            const response = await fetch(`${pathbackend}/delete-note?id=${IDNota}`, {
                method: 'DELETE',
            })

            const data = await response.json();
            if (data.success) {
                fetchNotas();
            } else {
                console.log('Error en la solicitud')
            }
        } catch (e) {
            console.error('Error:', e);
        }
    }

    const HandleArchived = async(e) => {
        const IDNota = e.target.getAttribute('data-value');
        const VA = e.target.getAttribute('data-caption');

        if (VA === '0') {
            const env = {
                "id": IDNota,
                "archive": true
            }
            try {
                const response = await fetch(`${pathbackend}/update-archived`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(env)
                })

                const data = await response.json();
                if (data.success) {
                    fetchNotas();
                } else {
                    console.log('Error en la solicitud')
                }
                setCambios();
            } catch (e) {
                console.error('Error:', e);
            }
        }
    }

    const MostrarModifyNote = async (e) => {
        const valor = e.target.getAttribute('data-value');
        setNotaTemp(JSON.parse(valor));
    }

    useEffect(() => { }, [notaTemp])

    const HandleCerrar = () => {
        setNotaTemp(null);
        setEtiqueta2('');
        setTitulo2('');
        setDescripcion2('');
        setEtiqueta_guardada2('')
    }

    const manejarCambioFiltro = (nuevoFiltro) => {
        setFiltro(nuevoFiltro);
    };

    // Categorias
    useEffect(() => {
        const FehandleUpdateCategory = async () => {
            try {
                setListaEtiquetas2([]);
                const response = await axios.get(`${pathbackend}/obtain-etiq`);
                if (response.status === 200) {
                    const categoriae = response.data.message.map(item => item.Categoria);
                    categoriae.push('Crear Nueva Etiqueta');
                    setListaEtiquetas2(categoriae);
                } else {
                    setError2('Error al obtener categorias')
                }
            } catch (e) {
                setError2('Error al obtener categorias:', e)
            }
        }

        FehandleUpdateCategory();
    }, [])

    useEffect(() => {
        if (ErrorNuevaEtiqueta2 || error2) {
            const timer = setTimeout(() => {
                setErrorNuevaEtiqueta2('');
                setError2('');
            }, 3000);

            return () => clearTimeout(timer); 
        }
    }, [ErrorNuevaEtiqueta2, error2]);

    const handleEtiquetChange = (e) => {
        const valor = e.target.value;
        if (valor === 'Crear Nueva Etiqueta') {
            setOpcionNuevaEtiqueta2(1);
            setEtiqueta_guardada2(valor);
        } else {
            setEtiqueta_guardada2(valor);
            setOpcionNuevaEtiqueta2(0);
        }
    }

    const handleUpdateCategory = async () => {
        try {
            setListaEtiquetas2([]);
            const response = await axios.get(`${pathbackend}/obtain-etiq`);
            if (response.status === 200) {
                const categoriae = response.data.message.map(item => item.Categoria);
                categoriae.push('Crear Nueva Etiqueta');
                setListaEtiquetas2(categoriae);
            } else {
                setError2('Error al obtener categorias')
                return;
            }
        } catch (e) {
            setError2('Error al obtener categorias:', e)
        }
    }

    const CrearNuevaEt = async () => {
        setErrorNuevaEtiqueta2('');
        if (!etiqueta2.trim()) {
            setErrorNuevaEtiqueta2('El campo no puede estar vacio');
            return;
        }

        try {
            const response = await fetch(`${pathbackend}/create-etiq`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: etiqueta2.trim() }),
            });

            const data = await response.json();

            if (response.ok) {
                setOpcionNuevaEtiqueta2(0);
                setEtiqueta2('');
                setErrorNuevaEtiqueta2('');
                handleUpdateCategory();
            } else {
                setErrorNuevaEtiqueta2(data.message || 'Error desconocido')
            }
            change2();
        } catch (e) {
            setErrorNuevaEtiqueta2('Error en la conexión con el servidor:', e)
        }
    }

    useEffect(() => {
        if (notaTemp) {
            if (!titulo2) {
                setTitulo2(notaTemp.Titulo);
            }
            if (!descripcion2) {
                setDescripcion2(Array.isArray(notaTemp.Recordatorios) 
                ? notaTemp.Recordatorios.map(rec => rec.Recordatorio).join('\n') 
                : '');
            }
        }
    }, [notaTemp]);

    const handleModifyData = async (e) => {
        e.preventDefault();
        if (!etiqueta2) {
            alert('Etiqueta no seleccionada')
            return;
        }

        const recordatoriosArray = descripcion2
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)

        const recordatoriosToJSON = recordatoriosArray.map(recordatorio => ({
            recordatorio: recordatorio
        }))

        const newa  =  {
            "id": notaTemp.NotaID,
            "titulo": titulo2,
            "categoria": etiqueta2,
            "recordatorios": JSON.stringify(recordatoriosToJSON)
        }

        try {
            const response = await fetch(`${pathbackend}/update-note`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newa)
            })

            const data = await response.json();
            if (data.success) {
                fetchNotas();
                HandleCerrar();
            } else {
                console.log("Error")
                return;
            }
        } catch (e) {
            console.log('Error en la solicitud:', e)
        }
    }

    useEffect(() => {
        if (cambios) {
            fetchNotas();
            handleUpdateCategory();
            setChange();
        }
    }, [cambios]);

    const botonEstilo = {
        backgroundColor: filtro === 'Sin Filtro' ? '#FF5733' : '#4CAF50',
        color: 'white',
        padding: '10px',
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px'
    };

    return (
        <>
            <div className="vistas">
                <div className="dropdown">
                    <button className="dropbtn" style={botonEstilo}><label className='filter' /></button>
                    <div className="dropdown-content">
                        <button onClick={() => manejarCambioFiltro('Sin Filtro')}>Sin Filtro</button>
                        <button onClick={() => manejarCambioFiltro('Etiquetas')}>Etiquetas</button>
                    </div>
                </div>

                { filtro === 'Sin Filtro' && (
                    <>
                        <div className='vistapantalla1'>
                            <label className='pin-pul'/><label className='pin-da'>Pinned</label>
                            <div className='pinned-up'>
                                { Array.isArray(notas) && notas.map((nota) => (
                                    nota.Pinned === 1 && nota.Archived === 0 ? (
                                        <>
                                            <div className='othersd'>
                                                <div className='encabezado-pin'>
                                                    <div className='utitle'>
                                                        <label className='titulo-pin'>{nota.Titulo}</label>
                                                    </div>
                                                    <button 
                                                        className='ulike-pin'
                                                        data-value={nota.NotaID}
                                                        data-caption={nota.Pinned}
                                                        onClick={HandlePinnedValue}
                                                    >
                                                        <label
                                                            className='ulik-p'
                                                            data-value={nota.NotaID}
                                                            data-caption={nota.Pinned}
                                                        />
                                                    </button>
                                                </div>
                                                <div className='recordatorios-pin'>{ Array.isArray(nota.Recordatorios) && nota.Recordatorios.map((recordatorio) => (
                                                    <>
                                                        - { recordatorio.Recordatorio } <br/>
                                                    </>
                                                ))}</div>
                                                <div className='final-pin'>
                                                    <div className='etiqueta-pin'><label className='etiq-p' /><label className='et-p'>{nota.Categoria}</label></div>
                                                    <div className='pin-botones'>
                                                        <button
                                                            data-value={nota.NotaID}
                                                            onClick={HandleDelete}
                                                        >
                                                            <label 
                                                                className='delete-pin'
                                                                data-value={nota.NotaID} 
                                                            />
                                                        </button>
                                                        <button
                                                            data-value={JSON.stringify(nota)}
                                                            onClick={MostrarModifyNote}
                                                        >
                                                            <label
                                                                className='modify-pin'
                                                                data-value={JSON.stringify(nota)}
                                                            />
                                                        </button>
                                                        <button
                                                            data-value={nota.NotaID}
                                                            data-caption={nota.Archived}
                                                            onClick={HandleArchived}
                                                        >
                                                            <label
                                                                className='archive-pin'
                                                                data-value={nota.NotaID}
                                                                data-caption={nota.Archived}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : ( <></> )
                                ))}
                            </div>
                            <label className='recent-pul'/><label className='pin-da'>Recents</label>
                            <div className='pinned-up'>
                                {Array.isArray(notas) && 
                                    notas
                                        .sort((a, b) => a.Categoria.localeCompare(b.Categoria))
                                        .map((nota) => (
                                    nota.Pinned === 0 && nota.Archived === 0 ? (
                                        <>
                                            <div className='othersd'>
                                                <div className='encabezado-pin'>
                                                    <div className='utitle'>
                                                        <label className='titulo-pin'>{nota.Titulo}</label>
                                                    </div>
                                                    <button 
                                                        className='like-pin'
                                                        data-value={nota.NotaID}
                                                        data-caption={nota.Pinned}
                                                        onClick={HandlePinnedValue}
                                                    >
                                                        <label
                                                            className='lik-p'
                                                            data-value={nota.NotaID}
                                                            data-caption={nota.Pinned}
                                                        />
                                                    </button>
                                                </div>
                                                <div className='recordatorios-pin'>{ Array.isArray(nota.Recordatorios) && nota.Recordatorios.map((recordatorio) => (
                                                    <>
                                                        - { recordatorio.Recordatorio } <br/>
                                                    </>
                                                ))}</div>
                                                <div className='final-pin'>
                                                    <div className='etiqueta-pin'><label className='etiq-p' /><label className='et-p'>{nota.Categoria}</label></div>
                                                    <div className='pin-botones'>
                                                        <button
                                                            data-value={nota.NotaID}
                                                            onClick={HandleDelete}
                                                        >
                                                            <label 
                                                                className='delete-pin'
                                                                data-value={nota.NotaID} 
                                                            />
                                                        </button>
                                                        <button
                                                            data-value={JSON.stringify(nota)}
                                                            onClick={MostrarModifyNote}
                                                        >
                                                            <label
                                                                className='modify-pin'
                                                                data-value={JSON.stringify(nota)}
                                                            />
                                                        </button>
                                                        <button
                                                            data-value={nota.NotaID}
                                                            data-caption={nota.Archived}
                                                            onClick={HandleArchived}
                                                        >
                                                            <label
                                                                className='archive-pin'
                                                                data-value={nota.NotaID}
                                                                data-caption={nota.Archived}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : ( <> </> )
                                ))}
                            </div>
                        </div>
                    </> 
                )}
                { filtro === 'Etiquetas' && (
                    <div className='vistapantalla2'>
                        <label className='arch-pul'/><label className='pin-da'>Organizar por Etiquetas</label>
                        <div className='archived-up'>
                            { Array.isArray(notas2) && notas.map((nota) => (
                                nota.Pinned === 1 && nota.Archived === 0 ? (
                                    <>
                                        <div className='othersb'>
                                            <div className='encabezado-pin'>
                                                <div className='utitle'>
                                                    <label className='titulo-pin'>{nota.Titulo}</label>
                                                </div>
                                                <button 
                                                    className='ulike-pin'
                                                    data-value={nota.NotaID}
                                                    data-caption={nota.Pinned}
                                                    onClick={HandlePinnedValue}
                                                >
                                                    <label
                                                        className='ulik-p'
                                                        data-value={nota.NotaID}
                                                        data-caption={nota.Pinned}
                                                    />
                                                </button>
                                            </div>
                                            <div className='recordatorios-pin'>{ Array.isArray(nota.Recordatorios) && nota.Recordatorios.map((recordatorio) => (
                                                <>
                                                    - { recordatorio.Recordatorio } <br/>
                                                </>
                                            ))}</div>
                                            <div className='final-pin'>
                                                <div className='etiqueta-pin'><label className='etiq-p' /><label className='et-p'>{nota.Categoria}</label></div>
                                                <div className='pin-botones'>
                                                    <button
                                                        data-value={nota.NotaID}
                                                        onClick={HandleDelete}
                                                    >
                                                        <label 
                                                            className='delete-pin'
                                                            data-value={nota.NotaID} 
                                                        />
                                                    </button>
                                                    <button
                                                        data-value={nota.NotaID}
                                                        data-caption={nota.Archived}
                                                        onClick={HandleArchived}
                                                    >
                                                        <label
                                                            className='archive-pin'
                                                            data-value={nota.NotaID}
                                                            data-caption={nota.Archived}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                ) : nota.Pinned === 0 && nota.Archived === 0 ? (
                                    <>
                                        <div className='othersb'>
                                            <div className='encabezado-pin'>
                                                <div className='utitle'>
                                                    <label className='titulo-pin'>{nota.Titulo}</label>
                                                </div>
                                                <button 
                                                    className='like-pin'
                                                    data-value={nota.NotaID}
                                                    data-caption={nota.Pinned}
                                                    onClick={HandlePinnedValue}
                                                >
                                                    <label
                                                        className='lik-p'
                                                        data-value={nota.NotaID}
                                                        data-caption={nota.Pinned}
                                                    />
                                                </button>
                                            </div>
                                            <div className='recordatorios-pin'>{ Array.isArray(nota.Recordatorios) && nota.Recordatorios.map((recordatorio) => (
                                                <>
                                                    - { recordatorio.Recordatorio } <br/>
                                                </>
                                            ))}</div>
                                            <div className='final-pin'>
                                                <div className='etiqueta-pin'><label className='etiq-p' /><label className='et-p'>{nota.Categoria}</label></div>
                                                <div className='pin-botones'>
                                                    <button
                                                        data-value={nota.NotaID}
                                                        onClick={HandleDelete}
                                                    >
                                                        <label 
                                                            className='delete-pin'
                                                            data-value={nota.NotaID} 
                                                        />
                                                    </button>
                                                    <button
                                                        data-value={nota.NotaID}
                                                        data-caption={nota.Archived}
                                                        onClick={HandleArchived}
                                                    >
                                                        <label
                                                            className='archive-pin'
                                                            data-value={nota.NotaID}
                                                            data-caption={nota.Archived}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : <> </>
                            ))}
                        </div>
                    </div>
                )}
                <>
                    {(notaTemp?.NotaID !== undefined) && (
                        <>
                            <div className='modal' style={{backgroundColor: 'rgba(52, 58, 64, 0.9)'}}>
                                <div className='boton-exit'>
                                    <button onClick={HandleCerrar} className='button-x' />
                                </div>
                                <div className='contenido-modal'>
                                    <div className='contenidoCent'>
                                        <h2>Modificar Datos Nota # {notaTemp.NotaID}</h2>
                                        

                                        <div className='datos'>
                                            <div className='etiqueta-titulo'>
                                                <label className='etiquetas-modal'><b>Titulo</b></label>
                                                <input
                                                    className='input-title'
                                                    type='text'
                                                    value={titulo2}
                                                    placeholder={notaTemp.Titulo}
                                                    onChange={(e) => setTitulo2(e.target.value || notaTemp.Titulo)} 
                                                />
                                            </div>
                                            <div className='etiqueta-descripcion'>
                                                <div className='titulo-etiquetas-sec'>
                                                    <label className='etiquetas-modal segonda'><b>Descripcion</b></label>
                                                </div>
                                                <textarea
                                                    className='input-content'
                                                    value={ descripcion2 }
                                                    onChange={(e) => setDescripcion2(e.target.value || notaTemp.Recordatorios.map(rec => rec.Recordatorio).join('\n'))}
                                                    placeholder={notaTemp.Recordatorios.map(rec => rec.Recordatorio).join('\n')}
                                                />
                                            </div>
                                            <div className='caja-etiquetas'>
                                                <div className='titulo-caja-etiquetas'>
                                                    <label className='etiquetas-modal2'><b>Seleccionar Etiqueta</b></label>
                                                </div>
                                                <div className='contenido-caja-etiquetas'>

                                                    {OpcionNuevaEtiqueta2 === 1 && (
                                                        <div className='anuevaetiqueta'>
                                                            <input 
                                                                className='input-etiqueta-nueva'
                                                                type='text'
                                                                value={etiqueta2}
                                                                onChange={(e) => setEtiqueta2(e.target.value)}
                                                            />
                                                            <button onClick={CrearNuevaEt}>Crear</button>
                                                            {ErrorNuevaEtiqueta2 && <p className='errornuevae'>{ErrorNuevaEtiqueta2}</p>}
                                                        </div>
                                                    )}
                                                    <select 
                                                        value={etiqueta_guardada2}
                                                        onChange={
                                                            (e) => {
                                                                handleEtiquetChange(e);
                                                                setEtiqueta2(e.target.value)
                                                            }
                                                        }
                                                        className='selecten'
                                                    >
                                                        <option value=''>Selecciona una etiqueta</option>
                                                        {ListaEtiquetas2.map((etiqueta, index) => (
                                                            <option key={index} value={etiqueta}  >{etiqueta}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <button onClick={handleModifyData} className='button-save' />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            </div>
        </>
    );
}

export default Pantalla1;