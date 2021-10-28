import { Component } from "@angular/core";

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})

export class infoComponent {
    primero: string= 'Paseos';
    infoPrimero:string= 'Animate a acompañarnos en paseos programados en los cuales podrás conocer nuevos lugares y personas.';
    segundo: string= 'Rutas';
    infoSegundo: string= `¿Te gusta realizar rutas largas, en las cuales puedes poner a prueba tu físico?
    Entonces esta actividad es ideal para tí. Cada fin de semana tendremos una ruta con mínimo 120 km.
    `;
    tercero: string= 'Competencias';
    infoTercero: string= `Contando con el mejor equipo de acompañamiento en las rutas, con especialistas en la salud tenemos para tí distintas competencias.
    Anímate a acompañarnos y demuestra todo lo que eres capaz.
    `;
}