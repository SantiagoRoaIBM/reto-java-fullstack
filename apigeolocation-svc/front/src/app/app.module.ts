import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { RouterModule, Routes } from '@angular/router'; //Para configurar rutas 

//HTTP Client es el mecanismo que tiene angular para la comunicación con el servidor remoto a través de peticiones HTTP
import {HttpClientModule} from '@angular/common/http';

//Modulo para trabajar con firmularios
import { FormsModule } from '@angular/forms';

import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { FormComponent } from './clientes/form.component';



const routes: Routes=[//Arreglo de rutas donde se definen todas las rutas URL de cada componente de la aplicación
  {path: '', redirectTo: '/clientes', pathMatch:'full'},//Se usará como home o página principal y redirige a clientes
  {path: 'clientes',component: ClientesComponent },
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
      
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),//Es necesario pasar la constante que involucra las rutas  
    HttpClientModule,
    FormsModule,
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
