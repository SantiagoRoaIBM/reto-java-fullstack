import React from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {actualizarDisplayNameAccion, actualizarFotoAccion} from '../redux/usuarioDucks'
import {utilizarUsuarioDucks} from '../redux/usuarioDucks'

const Perfil = () => {
    const dispatch = useDispatch()

     const usuario = useSelector(store => store.usuario.user)//Acá traemos todo el objeto del usuario
     const loading = useSelector(store => store.usuario.loading) //Se usó el spinner de bootstrap
    // // console.log(usuario)

     const [displayName, setDisplayName] = React.useState(usuario.displayName) //Estado para editar nombre
     const [activarFormulario, setActivarFormulario] = React.useState(false) //Estado para visualizar el formulario

     const botonEditarNombre = () => {
        if(!displayName.trim()){
            console.log('nombre vacío')
            return
        }
         dispatch(actualizarDisplayNameAccion(displayName))
         setActivarFormulario(false)
        }

    // subir imagen
    const [error, setError] = React.useState(false)

    const seleccionarArchivo = (e) => {
        console.log(e.target.files[0])   
        const imagen = e.target.files[0]

        if(imagen === undefined){
            console.log('sin imagen')
            return
        }

        if(imagen.type === 'image/jpeg' || imagen.type === 'image/png'){
            dispatch(actualizarFotoAccion(imagen))       
            setError(false) 
            }else{
            console.log('archivo no válido')
            setError(true)
            return
            }
    }

    return (
        <div className="mt-5 text-center">
            
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} width="100" className="img-fluid rounded" />
                    <h5 className="card-title">Nombre: {usuario.displayName}</h5>
                    <p className="card-text">Email: {usuario.email}</p> 
                    
                    <button 
                        className='btn btn-dark' 
                        onClick={() => setActivarFormulario(true)}
                    >
                        Editar Nombre
                    </button>

                    {
                        error &&
                        <div className="alert alert-warning">
                            Sólo archivos .png o .jpg
                        </div>
                    }

                    <div className="custom-file">
                        <input 
                            type="file" 
                            className="custom-file-input" 
                            id="inputGroupFile01"
                            style={{display:'none'}}
                            onChange={e => seleccionarArchivo(e)}
                            disabled= {loading}
                            />
                        <label className={loading ? "btn btn-dark mt-2 disabled" : "btn btn-dark mt-2" }
                        htmlFor="inputGroupFile01">
                            Actualizar imagen</label>
                    </div>

                </div>
                {
                    loading && 
                    <div className="card-body">
                        <div className="d-flex justify-content-center my-2">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                }
                {
                    activarFormulario && 
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-md-5">
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Recipient's username" 
                                        value={displayName}  //Para que al dar editar ponga en el cuadrito el nombre actual
                                        onChange={ e => setDisplayName(e.target.value)}//Guardamos lo que se escriba en el input
                                    />
                                    <div className="input-group-append">
                                        <button 
                                            className="btn btn-outline-secondary" 
                                            type="button" 
                                            onClick={() => botonEditarNombre()}
                                        >
                                            Actualizar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Perfil