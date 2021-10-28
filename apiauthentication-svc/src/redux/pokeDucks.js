//Reducer. Se usará metodología Ducks. La estructura es
//Constantes, reducer, acciones 

import axios from "axios"

//Constantes

const dataInicial = {//Inicializamos todos los datos de la res.data
    count: 0,
    next: null,
    previous: null,
    results: []
}

// types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO' //Este es el type. La idea es que sea lo más específico posible
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'
const POKE_INFO_EXITO = 'POKE_INFO_EXITO'

// reducer
export default function pokeReducer(state = dataInicial, action){
    switch(action.type){//en el switch tomamos la acción que va cambiando
        case OBTENER_POKEMONES_EXITO:
            return {
                ...state, ...action.payload //Porque se desea que el payload sea toda la información es decir, con la opción de next y preview que tiene el get.data
            }
        
        case SIGUIENTE_POKEMONES_EXITO:
             return {
                 ...state, ...action.payload 
                }   
        case POKE_INFO_EXITO:
                return {
                    ...state, unPokemon: action.payload 
                }   

        default:
            return state //En caso de que no se envien types o no los pueda leer

    }

}

// actions
export const obtenerPokeAction = () => async (dispatch,getState) => {//En la primera función de flecha se reciben los parámetros
    //Con el dispatch se activa el reducer y con el getState se obtiene la data inicial

    if (localStorage.getItem('offset=0')){//Así no hace peticiones innecesarias a la API ya que tiene los datos
        console.log('datos guardados')
        dispatch(
            {    
                type: OBTENER_POKEMONES_EXITO,
                payload: JSON.parse(localStorage.getItem('offset=0'))
            }
        )
        return //para que al entrar acá salga de la función sin ejecutar el resto
    }

    try {
        console.log('datos API')
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)//Le pasamos la URL. 
        //Como queremos que se pueda modificar el rango de los  pokemones mostrados pasamos el parámetro offset
        dispatch({//El dispatch es necesario para poder activar el switch
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data // Nos devuelve toda la info de la API
        })

        localStorage.setItem('offset=0', JSON.stringify(res.data))//Acá inicialmente queremos guardar los primero 20 pokemones.
        // Cómo debe tener key y value y value debe ser string, realizamos la conversión con el JSON.stringify

    } catch (error) {
        console.log(error)
    }

}

export const siguientePokeAction = () => async(dispatch, getState) => {

    const next= getState().pokemones.next //Toda la info sale del store y nosotros dentro nombramos pokemones a la propiedad

    if (localStorage.getItem(next)){//Así no hace peticiones innecesarias a la API ya que tiene los datos
        console.log('datos guardados')
        dispatch(
            {    
                type: OBTENER_POKEMONES_EXITO,
                payload: JSON.parse(localStorage.getItem(next))
            }
        )
        return //para que al entrar acá salga de la función sin ejecutar el resto
    }

    try {
        const res = await axios.get(next)//por lo que el next corresponde a la URL con los siguientes 20
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload:  res.data
            
        })
        localStorage.setItem(next, JSON.stringify(res.data))

    } catch (error) {
        console.log(error)
    }
}


export const anteriorPokeAction = () => async (dispatch, getState) => {

    const {previous} = getState().pokemones

    if (localStorage.getItem(previous)){//Así no hace peticiones innecesarias a la API ya que tiene los datos
        console.log('datos guardados')
        dispatch(
            {    
                type: OBTENER_POKEMONES_EXITO,
                payload: JSON.parse(localStorage.getItem(previous))
            }
        )
        return //para que al entrar acá salga de la función sin ejecutar el resto
    }

    try {
        console.log('API')
        const res = await axios.get(previous)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(previous, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const unPokeDetalleAccion = (url='https://pokeapi.co/api/v2/pokemon/1/') => async (dispatch, getState) => {//cada pokemon tiene su URL propia
   
    
    if(localStorage.getItem(url)){
        dispatch({
            type: POKE_INFO_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        })
        console.log('local')
        return
    }
    try {
        console.log('Api')
        const res = await axios.get(url)
         console.log(res.data)
         dispatch({
            type: POKE_INFO_EXITO,
            payload: {
                nombre: res.data.name,
                foto: res.data.sprites.front_default,
                alto: res.data.height,
                ancho: res.data.weight
            }
        })
        localStorage.setItem(url, JSON.stringify({//Es necesario pasar a string. La url es la key
            nombre: res.data.name,
            foto: res.data.sprites.front_default,
            alto: res.data.height,
            ancho: res.data.weight
        }))

    } catch (error) {
        console.log(error.response)
    }
}