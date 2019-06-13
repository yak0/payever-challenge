import { User } from "./user.interface";

export interface Page{
    page:number,
    per_page:number,
    total:number,
    total_pages:number,
    data:[User]
}