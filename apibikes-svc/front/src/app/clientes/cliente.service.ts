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
 
  ruta = "http://159.122.186.170:31793/info";
  getLista(){
      return this.httpClient.get<Cliente[]>(this.ruta+"/list");
    }

  create(cliente:Cliente){
    return this.httpClient.post<Cliente>(this.ruta+"/add",cliente);
  }

  update(cliente:Cliente){
    return this.httpClient.put<Cliente>(this.ruta+"/"+cliente.id+"/update",cliente);
  }

  delete(cliente:Cliente){
    return this.httpClient.delete<Cliente>(this.ruta+"/"+cliente.id+"/delete");
  }
}
