import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'Super Admin',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'All',
                        routerLink: '/admin/superAdmins',
                    },
                    {
                        label: 'Create',
                        routerLink: '/admin/super_admin/create',
                    },
                ]
            },
            {
                label: 'Admin',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'All',
                        routerLink: '/admin/admins',
                    },
                    {
                        label: 'Create',
                        routerLink: '/admin/admins/create',
                    },
                ]
            },
            {
                label: 'Employee',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'All',
                        routerLink: '/admin/employee',
                    },
                    {
                        label: 'Delete',
                        routerLink: '/admin/employee/create',
                    },
                ]
            },
            {
                label: 'Members',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'All',
                        routerLink: '/admin/members',
                    },
                    {
                        label: 'Create',
                        routerLink: '/admin/members/create',
                    }
                ]
            },
            {
                label: 'Books',
                icon: 'pi pi-fw pi-book',
                items: [
                    {
                        label: 'All',
                        routerLink: '/admin/books',
                    },
                    {
                        label: 'Create',
                        routerLink: '/admin/books/create',
                    }
                ]
            }
        ];
    }
}
