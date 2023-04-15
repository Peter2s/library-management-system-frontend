import {Injectable, OnInit} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {IMembersResponse} from "../../models/IMembersResponse";
import {IMembers} from "../../models/IMembers";
import {IMemberResponse} from 'src/app/models/IMemberResponse';
import {IDeleteMessage} from "../../models/IDeleteMessage";
import {IUpdateMessage} from "../../models/IUpdateMessage";
import {IMemberActivation} from "../../models/IMemberActivation";
import {HttpOptions} from "../../models/IHttp-options";

@Injectable({
    providedIn: 'root'
})
export class MembersService implements OnInit {
    httpHeaders: any = {};

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
    }

    getMembers(): Observable<IMembersResponse> {
        const options: HttpOptions = {
            headers: this.httpHeaders,

        };
        let endpoint = "/members"
        return this.apiService.get<IMembersResponse>(endpoint, options);
    }

    addMember(member: IMembers) {
        const options: HttpOptions = {
            headers: this.httpHeaders,
        };
        return this.apiService.post<IMemberResponse>("/members", member, options);
    }

    getMemberById(id: string | null): Observable<IMemberResponse> {
        return this.apiService.get<IMemberResponse>(`/members/${id}`);
    }

    deleteMemberById(id: number): Observable<IDeleteMessage> {
        return this.apiService.delete<IDeleteMessage>(`/members/${id}`);
    }


    updateMember(member: IMembers): Observable<IUpdateMessage> {
        return this.apiService.patch<IUpdateMessage>(`/members/${member._id}`, member)
    }

    activateMember(member: IMemberActivation): Observable<IUpdateMessage> {
        return this.apiService.post<IUpdateMessage>(`/activation`, member)
    }
    search(data:any){
    return this.apiService.post<IMembersResponse>("/search", data)
    }
}
