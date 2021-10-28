import React from 'react'
import Detalle from './Detalle'

// hooks react redux
import {useDispatch, useSelector} from 'react-redux' //dispatch servirá para cosumir acción y useSelector para leer arrat


const Pokemones = () => {


    return (//Es necesario usar el dispatch para llamar a la función que se desea tener. en este caso la de obtenerPokeAction
        
        
         <div class="navbar-nav text-center">
              <img class="card-img mt-5" src="ciclas.jpg" width="100" height="300"></img>
            <a href="http://159.122.186.170:31269/"  class="btn btn-outline-primary my-sm-3">Reservar</a>
             </div>
          
    )
}

export default Pokemones