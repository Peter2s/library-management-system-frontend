import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router) { }

  items: MenuItem[];

  sidebarVisible = false;



  @Output() toggleSidebarEvent = new EventEmitter<boolean>();

  toggleSidebar(){
    this.sidebarVisible = !this.sidebarVisible;
    this.toggleSidebarEvent.emit(this.sidebarVisible);
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-user-minus',
            command: () => {
                this.authService.logout();
                this.router.navigate(['/admin/login']);
            }
          }
        ]
      },
    ];
  }


}
