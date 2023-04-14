import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/auth/login/login.component';
import {BooksComponent} from './books/books.component';
import {MembersComponent} from './members/members.component';
import {ActivationComponent} from './components/auth/activation/activation.component';
import {
    AdministrationMainLayoutComponent
} from './components/administrationMainLayout/administrationMainLayout.component';
import {AuthGuard} from './guards/auth.guard';
import {LoginGuard} from './guards/login.guard';
import {ReportComponent} from "./dashboard/report/report.component";

const routes: Routes = [
    {
        path: "",
        component: AdministrationMainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {path: "dashboard", component: DashboardComponent},
            {
                path: "books",
                loadChildren: () => import('../administration/books/books.module').then(mod => mod.BooksModule)
            },
            {
                path: "admins",
                loadChildren: () => import('../administration/Admin/Admin.module').then(mod => mod.AdminModule)
            },
            {path: "members", loadChildren: () => import('./members/members.module').then(mod => mod.MembersModule)},
            {
                path: "employees",
                loadChildren: () => import('./employees/employees.module').then(mod => mod.EmployeesModule),
            }
        ],
    },

    {path: "login", component: LoginComponent, canActivate: [LoginGuard]},
    {path: "activation", component: ActivationComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
