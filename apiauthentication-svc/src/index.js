import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
//Antes estaban en el app pero ahora las necesitamos para hacer el provider y acceder acá a todas las características
import {Provider} from 'react-redux'  //Para que todos los componentes puedan leer al App.js y a la tienda. Es necesario envolver todo en esto
import generateStore from './redux/store'

const store = generateStore() //Devuelve toda la tienda

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
      <App />
    </Provider> 
  </React.StrictMode>,
  document.getElementById('root')
);

