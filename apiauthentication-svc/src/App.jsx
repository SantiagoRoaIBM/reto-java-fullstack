import React from "react";
import Pokemones from "./componentes/Pokemones";
import Navbar from "./componentes/Navbar";
import Login from "./componentes/Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import {auth} from './firebase'
import Perfil from "./componentes/Perfil";


function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {

    const fetchUser=()=>{
      auth.onAuthStateChanged(user => {//Lee la info del usuario
        console.log(user)
        if(user){
            setFirebaseUser(user)
        }else{
            setFirebaseUser(null)
        }
    })

    }

    fetchUser()
    
}, [])

  const RutaPrivada = ({component, path, ...rest}) => {
    if(localStorage.getItem('usuario')){//Si esxiste el usuario
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
      if(usuarioStorage.uid === firebaseUser.uid){//Confirma que el usuario tenga un registro en la base de datos
        console.log('son iguales')
        return <Route component={component} path={path} {...rest} />
      }else{
        console.log('no exite')
        return <Redirect to="/login" {...rest} />
      }
    }else{// Si no existe devuelva a login
      return <Redirect to="/login" {...rest} />
    }
  }

  return firebaseUser !== false ?(
    <Router>

    <div className="container mt-3">

     
      <Navbar />

      <Switch>
        <RutaPrivada component={Pokemones} path="/" exact/>
        <RutaPrivada component={Perfil} path="/perfil" exact/>
        <Route component={Login} path="/login" exact/>
      </Switch>

        
      </div>
      </Router>    
  ): (<div> Cargando... </div> )
}

export default App;
