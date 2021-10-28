import { Component } from "@angular/core";
import { environment } from "../../environments/environment";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']

})
export class HeaderComponent {
    public crudUrl: string
    public mapaUrl: string
    public loginUrl: string 
    title: string = 'Bicicleta'
    constructor() {
        this.crudUrl = environment.backendVar.crudUrl 
        this.mapaUrl = environment.backendVar.mapaUrl
        this.loginUrl = environment.backendVar.loginUrl
    }
    navigate(url:string){
        window.location.href = url;
    }
}



