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
                label: 'Dashboard',
                icon: 'pi pi-fw pi-file',
                routerLink: '/admin/dashboard',
            },
            {
                label: 'Super Admin',
                icon: 'pi pi-fw pi-file',
                routerLink: '/admin/superAdmins',
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
                items: [
                    {
                        label: 'Current-borrowed ',
                        icon: 'pi pi-fw pi-book',
                        routerLink: '/admin/members/current-borrowed',
                    },
                    {
                        label: 'Borrow history ',
                        icon: 'pi pi-fw pi-book',
                        routerLink: '/admin/members/borrow-history',
                    },
                    {
                        label: 'Read history',
                        icon: 'pi pi-fw pi-book',
                        routerLink: '/admin/members/read-history',
                    }
                    ]
            },
            {
                label: 'Books',
                icon: 'pi pi-fw pi-book',
                routerLink: '/admin/books',
                items: [
                    {
                        label: 'new',
                        icon: 'pi pi-fw pi-book',
                        routerLink: '/admin/books/new',
                    },
                    {
                        label: 'late ',
                        icon: 'pi pi-fw pi-book',
                        routerLink: '/admin/books/late',
                    },
                    {
                        label: 'available ',
                        icon: 'pi pi-fw pi-book',
                        routerLink: '/admin/books/available',
                    },
                    {
                        label: 'borrowing ',
                        icon: 'pi pi-fw pi-book',
                        routerLink: '/admin/books/borrowing',
                    },
                    {
                        label: 'reading ',
                        icon: 'pi pi-fw pi-book',
                        routerLink: '/admin/books/reading',
                    },
                    ]
            }
        ];
    }
}
