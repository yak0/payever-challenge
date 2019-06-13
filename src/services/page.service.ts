
import axios from "axios";
import { User } from "../interfaces/user.interface";
import { Page } from "../interfaces/page.interface";
class PageService{
    async get(url:string){
        const response = await axios.get(url);
        return (response.data as Page);
    }
}
export default new PageService();