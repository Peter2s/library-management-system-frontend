import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IMembersResponse } from 'src/app/models/IMembersResponse';

@Injectable({
  providedIn: "root",
})
export class MembersService {
  constructor(private apiService: ApiService) {}
  search(data: any): Observable<IMembersResponse> {
    return this.apiService.post<IMembersResponse>("/members/search", data);
  }
}
