import axios from "axios";
import { User } from "../interfaces/user.interface";
class UserService{

    async getUser(userId:number){
        const response = await axios.get(`${process.env.API_URL}/users/${userId}`);
        return (response.data.data as User);
    }
}

export default new UserService();