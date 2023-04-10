import { Injectable, OnInit } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {IMembersResponse} from "../../models/IMembersResponse";
import {IMembers} from "../../models/IMembers";

@Injectable({
  providedIn: 'root'
})
export class MembersService implements OnInit{

  constructor(private apiService: ApiService) { }
  ngOnInit() {
  }

  getMembers(url:string): Observable<IMembersResponse> {

    return this.apiService.get<IMembersResponse>(url);
  }

  addMember(member: IMembers) {
    return this.apiService.post<IMembersResponse>("/members", member);
  }

  getMemberById(id: string | null): Observable<IMembers> {
    return this.apiService.get<IMembers>(`/members/${id}`);
  }



}
