import { useState, useEffect } from "react";
import { pathbackend } from '../path';
import axios from 'axios'

function Pantalla3({ cambios, setCambios, setChange }) {

    const [notas3, setNotas3] = useState([]);

    useEffect(() => {
        const ufetchNotas = async () => {
            try {
                setNotas3([]);
                const response = await axios.get(`${pathbackend}/obtain-notes`);
                if (response.status === 200) {
                    setNotas3(response.data.message);
                } else {
                    console.log('Error en la solicitud')
                }
            } catch (e) {
                console.error('Error:', e);
            }
        };

        ufetchNotas();
    }, []);

    useEffect(() => {
        if (cambios) {
            fetchNotas3()
            setChange()
        }
    }, [cambios]);

    const fetchNotas3 = async () => {
        try {
            setNotas3([]);
            const response = await axios.get(`${pathbackend}/obtain-notes`);
            if (response.status === 200) {
                setNotas3(response.data.message);
            } else {
                console.log('Error en la solicitud')
            }
        } catch (e) {
            console.error('Error:', e);
        }
    };

    const HandleDelete = async(e) => {
        const IDNota = e.target.getAttribute('data-value');
        try {
            const response = await fetch(`${pathbackend}/delete-note?id=${IDNota}`, {
                method: 'DELETE',
            })

            const data = await response.json();
            if (data.success) {
                fetchNotas3();
            } else {
                console.log('Error en la solicitud')
            }
        } catch (e) {
            console.error('Error:', e);
        }
    }

    const HandleArchived3 = async(e) => {
        const IDNota = e.target.getAttribute('data-value');
        const VA = e.target.getAttribute('data-caption');

        if (VA === '1') {
            const env = {
                "id": IDNota,
                "archive": false
            }
            try {
                const response = await fetch(`${pathbackend}/update-archived`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(env)
                })

                const data = await response.json();
                if (data.success) {
                    fetchNotas3();
                } else {
                    console.log('Error en la solicitud')
                }
                setCambios();
            } catch (e) {
                console.error('Error:', e);
            }
        }
    }

    return (
        <>
            <div className="vistas">
            <div className='vistapantalla2'>
                        <label className='arch-pul'/><label className='pin-da'>NOTAS ARCHIVADAS</label>
                        <div className='archived-up'>
                            { Array.isArray(notas3) && notas3.map((nota) => (nota.Archived === 1 ? (
                                    <>
                                        <div className='othersb'>
                                            <div className='encabezado-pin'>
                                                <div className='utitle'>
                                                    <label className='titulo-pin'>{nota.Titulo}</label>
                                                </div>
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
                                                        onClick={HandleArchived3}
                                                    >
                                                        <label
                                                            className='uarchive-pin'
                                                            data-value={nota.NotaID}
                                                            data-caption={nota.Archived}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                ): <> </>
                            ))}
                        </div>
                    </div>
            </div>
        </>
    );
}

export default Pantalla3;