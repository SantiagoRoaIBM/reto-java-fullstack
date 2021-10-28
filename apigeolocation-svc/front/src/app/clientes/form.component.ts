import { Component, AfterViewInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']

})
export class FormComponent {
    public cliente: Cliente = new Cliente();
    
    public map;
    constructor(private clienteService: ClienteService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        ) {
          this.cliente.locX=activatedRoute.snapshot.params.locX;
          this.cliente.locY=activatedRoute.snapshot.params.locY;
          this.cliente.id=activatedRoute.snapshot.params.id;
        }
  
   
    
    ngOnInit(): void {    
      (mapboxgl as any).accessToken = environment.mapboxToken;
      var map = new mapboxgl.Map({
        container: 'mapa',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [Number(this.activatedRoute.snapshot.params.locY),Number(this.activatedRoute.snapshot.params.locX)],
        zoom:12
        //
      });        
      
      const markerHtml: HTMLElement= document.createElement('div');
      markerHtml.innerHTML=`Latitud: ${this.activatedRoute.snapshot.params.locX}
       Longitud: ${this.activatedRoute.snapshot.params.locY}`
       
      const marker = new mapboxgl.Marker(
        // {
        //   element: markerHtml
        // }        
      )
      .setLngLat([Number(this.activatedRoute.snapshot.params.locY),Number(this.activatedRoute.snapshot.params.locX)],)
      .addTo(map);

      
      console.log(this.cliente.locY);
      }

    public initMap(): void{
       
      
        }
  
  }
  