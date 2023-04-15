import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

    items: MenuItem[];

    checked: boolean;

    ngOnInit() {
        if(localStorage.getItem('role') == 'Super Admin'){
            this.checked = true;
        }
        else{
            this.checked = false;
        }
        this.items = [
            {
                label: 'Super Admin',
                icon: 'pi pi-fw pi-file',
                routerLink: '/admin/superAdmins',
                visible: this.checked
            },
            {
                label: 'Admin',
                icon: 'pi pi-fw pi-pencil',
                routerLink: '/admin/admins',
            },
            {
                label: 'Employee',
                icon: 'pi pi-fw pi-user',
                routerLink: '/admin/employees',
            },
            {
                label: 'Members',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/admin/members',
            },
            {
                label: 'Books',
                icon: 'pi pi-fw pi-book',
                routerLink: '/admin/books',
            }
        ];
    }
}
