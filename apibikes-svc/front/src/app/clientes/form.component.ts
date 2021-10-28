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
  public titulo:string="Añadir bicicleta";


  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    

    //console.log(this.activatedRoute.snapshot.params.id)
      this.cliente.id = this.activatedRoute.snapshot.params.id;
     //console.log(this.cliente.id)
  }

  public create():void{
    this.cliente.estado="disponible";
    this.clienteService.create(this.cliente).subscribe(response=>
      { console.log("entra")
         this.router.navigate(['/clientes'])
         Swal.fire('Nueva bicicleta','Bicicleta creada con éxito', 'success')
      }
      
    )
  }  

  
  public update():void{
    
    this.clienteService.update(this.cliente).subscribe(response=>
      { console.log("actualiza")
         this.router.navigate(['/clientes'])
         Swal.fire('Actualización',`Bicicleta actualizada con éxito`, 'success')
      }
      
    )
  }  
  

}

