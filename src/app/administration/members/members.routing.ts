import { Routes, RouterModule } from '@angular/router';
import {MembersComponent} from "./members.component";



const routes: Routes = [
    {
        path:"", component:MembersComponent
    }
];

export const MembersRoute = RouterModule.forChild(routes);
