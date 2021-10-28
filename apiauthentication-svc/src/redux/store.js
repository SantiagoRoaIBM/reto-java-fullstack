//Es nuestra tienda. Tendremos todos los estados para que estén disponibles en la aplicación

import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk' //Para hcer promesillas con redux
import {composeWithDevTools} from 'redux-devtools-extension'
 
import pokesReducer from './pokeDucks' //Siempre se debe importar todos los ducks o reducers que se creen
import usuarioReducer, {leerUsuarioAccion} from './usuarioDucks'
 
const rootReducer = combineReducers({ 
    pokemones: pokesReducer, //Acá se llaman todos los archivos duck. En este caso el único que se tiene es pokesDucks
    usuario: usuarioReducer
})
 
export default function generateStore() {//Acá configuramos la extensión de internet
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    leerUsuarioAccion()(store.dispatch)//Como se usa el dispatch es necesario acceder al store. Adicionalmente hay dos paréntesis ya que esa función tiene dos funciones de flecha
    return store
}