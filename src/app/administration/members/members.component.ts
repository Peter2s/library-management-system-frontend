import { Component, OnInit } from '@angular/core';
import {IMembers} from "../../models/IMembers";
import {MembersService} from "../services/members.service";
import {LoadingService} from "../../shared/services/loading.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: IMembers[] = [];
  currentPage: number;
  itemsPerPage: number;
  totalRecords: number;
  rowsPerPageOptions: number[];
  subscription: Subscription[] = [];
  constructor(
      private membersService: MembersService,
      public loadingService: LoadingService,
      public route: ActivatedRoute,
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
    this.loadMembers();
  }

  private loadMembers() {
    const url = `/members?page=${this.currentPage}&limit=${this.itemsPerPage}`;
    const sub = this.membersService.getMembers(url).subscribe((data) => {
      this.members = data.data;
      this.subscription.push(sub);
      this.totalRecords = data.pagination.total_members_count;
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.itemsPerPage = event.rows
    this.loadMembers();
  }

  getNumbersArray(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

}
