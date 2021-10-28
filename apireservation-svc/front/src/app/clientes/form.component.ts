import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',

})
export class FormComponent {

  public cliente: Cliente = new Cliente;
  public titulo:string="Reservar/Cancelar";
  public compara: Cliente = new Cliente;

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.compara.usuario=this.activatedRoute.snapshot.params.usuario;
      this.compara.locY=this.activatedRoute.snapshot.params.locY;
      this.compara.locX=this.activatedRoute.snapshot.params.locX;
      this.cliente.id = this.activatedRoute.snapshot.params.id;
      this.cliente.estado= this.activatedRoute.snapshot.params.estado;
     console.log(this.compara.locX)
  }

  

  
  public update():void{
    this.cliente.estado="reservada";
    this.clienteService.update(this.cliente).subscribe(response=>
      { console.log("actualiza")
         this.router.navigate(['/clientes'])
         Swal.fire('Reservado',`Su reserva ha sido realizada con éxito. Para cancelar la reserva es necesario tener la localización en X-Y.`, 'success')
      }
      
    )
  }  

  public cancelar():void{
    if(this.cliente.locX==this.compara.locX && this.cliente.locY==this.compara.locY &&this.cliente.usuario==this.compara.usuario ){
      this.cliente.estado="disponible";
    this.clienteService.update(this.cliente).subscribe(response=>
      { console.log("actualiza")
         this.router.navigate(['/clientes'])
         Swal.fire('Cancelado',`Su reserva ha sido cancelada con éxito. `, 'success')
      }
      
    )
    }else{
      Swal.fire('Error',`Datos incorrectos `, 'warning')
    }
    
  }  
  

}

