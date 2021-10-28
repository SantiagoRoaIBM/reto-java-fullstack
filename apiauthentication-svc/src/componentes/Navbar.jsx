import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' //Se requiere el useSelectro ya que acá tenemos el estado del usuario
import { cerrarSesionAccion } from '../redux/usuarioDucks'
import { withRouter } from 'react-router-dom'

const Navbar = (props) => {

    const dispatch= useDispatch()

    const cerrarSesion =()=>{
        dispatch(cerrarSesionAccion())
        props.history.push('/login')
    }

    const activo = useSelector(store => store.usuario.activo)

    return (
        <div className="navbar navbar-dark bg-dark">
            <a href="http://159.122.186.170:31295/" className="navbar-brand">Bicicletas</a>
            <div>
                <div className="d-flex">
                    {
                        activo ? (//Es necesario poner los dos cositos <> llamados fragment para poder tener 2 parámetros, sino sólo se podrá devolver una cosa
                            <>
                            <NavLink 
                            className="btn btn-dark mr-2" to="/" exact >
                            Inicio
                            </NavLink>
                            <NavLink 
                            className="btn btn-dark mr-2" to="/perfil" exact >
                            Perfil
                            </NavLink>
                            <button
                            className="btn btn-dark"
                            onClick={()=> cerrarSesion()}
                            >
                            cerrar Sesión
                            </button>

                            </>
                        ):(
                            <NavLink 
                            className="btn btn-dark mr-2" 
                            to="/login"
                            exact
                            >
                                Login
                            </NavLink>
                        )
                    }
                    
                                        
                </div>
            </div> 
        </div>
    )
}

export default withRouter(Navbar)