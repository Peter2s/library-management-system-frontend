import { IMembers } from "./IMembers";

export interface IMembersResponse {
  data: Array<IMembers>;
  pagination: {
    total_members_count: number;
    pages: number;
    current: number;
    limit: number;
  };
}
