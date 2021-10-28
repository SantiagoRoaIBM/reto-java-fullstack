import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClienteService {

  constructor(private httpClient : HttpClient) { }

  //private httpHeaders= new HttpHeaders ({'Content-Type':'application/json'})
 
  ruta = "http://159.122.186.170:30709/info";
  getLista(){
      return this.httpClient.get<Cliente[]>(this.ruta+"/list");
      
    }
    
    initMap(cliente:Cliente){

    }
  

  
}
