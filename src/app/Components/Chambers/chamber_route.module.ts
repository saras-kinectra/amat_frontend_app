import { ChamberComponent } from '../Chambers/Chamber/chambers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './Products/product.component';
 
const routes: Routes = [

    { path: '', component: ChamberComponent },
    { path: 'product', component: ProductComponent },

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ChamberMainRoutingModule { }
