import { Injectable, OnInit } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {IMembersResponse} from "../../models/IMembersResponse";
import {IMembers} from "../../models/IMembers";
import { IMemberResponse } from 'src/app/models/IMemberResponse';
import {IDeleteMessage} from "../../models/IDeleteMessage";
import {IUpdateMessage} from "../../models/IUpdateMessage";
import {IMemberActivation} from "../../models/IMemberActivation";

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

  getMemberById(id: string | null): Observable<IMemberResponse> {
    return this.apiService.get<IMemberResponse>(`/members/${id}`);
  }

  deleteMemberById(id: string | null): Observable<IDeleteMessage>{
    return this.apiService.delete<IDeleteMessage>(`/members/${id}`);
  }


  updateMember(id: number|undefined, member: IMembers):Observable<IUpdateMessage> {
    return this.apiService.patch<IUpdateMessage>(`/members/${id}`, member)
  }

  activateMember(member: IMemberActivation):Observable<IUpdateMessage> {
    return this.apiService.post<IUpdateMessage>(`/activation`, member)
  }
}
