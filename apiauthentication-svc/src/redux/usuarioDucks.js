//Los archivos ducks deben tener data inicial, types, reducer y acciones
//El payload modifica el state

import {auth,firebase, db, storage} from '../firebase'

//Data inicial

const dataInicial={
    loading: false,//Para deshabilitar botones
    activo: false //indica si el usuario está activo o no
}

//Types
const LOADING ='LOADING'
const USUARIO_ERROR='USUARIO_ERROR'
const USUARIO_EXITO='USUARIO_EXITO'
const CERRAR_SESION='CERRAR_SESION'

//Reducer
export default function usuarioReducer(state = dataInicial, action){//con el action hacemos el switch

    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case USUARIO_ERROR:
            return {...dataInicial}    
            case USUARIO_EXITO:
                return {...state, loading: false, user:action.payload, activo: true}
                case CERRAR_SESION:
                    return {...dataInicial}
        default:
            return {...state}
    }

}

//Action 
export const ingresoUsuarioAccion = ()=> async (dispatch) =>{
    dispatch({
        type: LOADING
    })
    try {
        
        const provider = new firebase.auth.GoogleAuthProvider();
        const res= await auth.signInWithPopup(provider)

        const usuario={
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL
        }

        const usuarioDB = await db.collection('usuarios').doc(usuario.email).get()//Para acceder a labase de datos y comprobar que exista el usuario
        console.log(usuarioDB)

        if (usuarioDB.exists){//Cuando existe el usuario
            console.log('existe')
            dispatch({
                type: USUARIO_EXITO,
                payload: usuarioDB.data()//Nos trae todo el objeto creado
            })
    
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))


        } else{//Cuando no existe el usuario
            console.log('para guardar')
            await db.collection('usuarios').doc(usuario.email).set(usuario)//Para guardar el usuario en la base de datos
        
            dispatch({
                type: USUARIO_EXITO,
                payload: usuario
            })
    
            localStorage.setItem('usuario', JSON.stringify(usuario))
    
        
        }


        
    } catch (error) {
        console.log(error)
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const leerUsuarioAccion = () => (dispatch) => {
    if(localStorage.getItem('usuario')){
        dispatch({
            type: USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem('usuario'))
            // payload: {
            //     user: JSON.parse(localStorage.getItem('usuario'))
            // }
        })
    }
}

export const cerrarSesionAccion = () => (dispatch) => {
    auth.signOut()
    dispatch({
        type: CERRAR_SESION
    })
    localStorage.removeItem('usuario')
}

export const actualizarDisplayNameAccion = (nombreActualizado) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().usuario //Para acceder directamente al user
    console.log(user)
    try {
        await db.collection('usuarios').doc(user.email).update({
            displayName: nombreActualizado
        })
        const usuarioEditado = {
            ...user,
            displayName: nombreActualizado
        }
        dispatch({
            type: USUARIO_EXITO,
            payload: usuarioEditado
        })
        localStorage.setItem('usuario', JSON.stringify(usuarioEditado))
    } catch (error) {
        console.log(error)
    }
}

export const actualizarFotoAccion = (imagen) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().usuario

    try {

        const refImagen =await storage.ref().child(user.email).child('foto perfil')//Child indica la carpeta en la que se van a guardar las fotos y luego para guardar la foto de perfil
        await refImagen.put(imagen)//El put permite guardar la imagen elegida
        const urlDescarga = await refImagen.getDownloadURL() //Obtenemos la URL

        await db.collection('usuarios').doc(user.email).update({
            photoURL: urlDescarga
        })

        const usuarioEditado = {
            ...user,
            photoURL: urlDescarga
        }
        dispatch({
            type: USUARIO_EXITO,
            payload: usuarioEditado
        })
        localStorage.setItem('usuario', JSON.stringify(usuarioEditado))

        
    } catch (error) {
        console.log(error)
    }

}
