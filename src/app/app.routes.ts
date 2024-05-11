import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { SobremiComponent } from './sobremi/sobremi.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { ContactoComponent } from './contacto/contacto.component';

export const routes: Routes = [

    {
        path:'Inicio',
        component:InicioComponent   
    },
    {
        path:'AcercaDe',
        component:SobremiComponent   
    },
    {
        path:'Portafolio',
        component:PortafolioComponent  
    },
    {
        path:'Contacto',
        component:ContactoComponent   
    },
    /* ESTE COMPONENTE ULTIMO HACE QUE PUEDA REDIRECCIONAR A INICIO COMO PRIMER 
     ENLACE*/
    {
        path:'',
        redirectTo:'Inicio',
        pathMatch:'full'  
    }
];
