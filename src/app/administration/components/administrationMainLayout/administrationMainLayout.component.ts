import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-administrationMainLayout',
  templateUrl: './administrationMainLayout.component.html',
  styleUrls: ['./administrationMainLayout.component.css'],
})
export class AdministrationMainLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  sidebarVisible = false;

  toggleSidebar(event: boolean) {
    this.sidebarVisible = event;
  }
}
