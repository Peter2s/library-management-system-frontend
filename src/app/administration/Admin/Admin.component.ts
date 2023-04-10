import { Component, OnInit } from "@angular/core";
import { IManagers } from "../../models/IManagers";
import { AdminsService } from "../services/admins.service";
import { LoadingService } from "../../shared/services/loading.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
@Component({
  selector: "app-Admin",
  templateUrl: "./Admin.component.html",
  styleUrls: ["./Admin.component.css"],
})
export class AdminComponent implements OnInit {
  admins: IManagers[] = [];
  currentPage: number;
  itemsPerPage: number;
  totalRecords: number;
  rowsPerPageOptions: number[];
  subscription: Subscription[] = [];

  constructor(
    private adminsService: AdminsService,
    public loadingService: LoadingService,
    public route: ActivatedRoute
  ) {
    this.currentPage = 1;
    this.itemsPerPage = 4;
    this.totalRecords = 0;
    this.rowsPerPageOptions = [
      this.itemsPerPage,
      this.itemsPerPage * 2,
      this.itemsPerPage * 5,
      this.itemsPerPage * 10,
    ];
  }

  ngOnInit() {
    this.currentPage = this.route.snapshot.queryParams["page"] || 1;
    this.itemsPerPage = this.route.snapshot.queryParams["limit"] || 8;
    this.loadAdmins();
  }

  private loadAdmins() {
    const url = `/admins?page=${this.currentPage}&limit=${this.itemsPerPage}`;
    const sub = this.adminsService.getAdmins(url).subscribe((data) => {
      this.admins = data.data;
      this.subscription.push(sub);
      this.totalRecords = data.pagination.total_managers_count;
    });
  }
  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.itemsPerPage = event.rows;
    this.loadAdmins();
  }
  getNumbersArray(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
