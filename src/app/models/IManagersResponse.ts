import { IManagers } from "./IManagers";
export interface IManagersResponse {
    data: Array<IManagers>;
    pagination: {
        total_managers_count:number;
        pages: number;
        current: number;
        limit: number;
    }
}
