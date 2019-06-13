
import axios from "axios"
import userService from "../services/user.service";
import { User } from "../interfaces/user.interface";

describe("User Service",()=>{
    it("get user 1 ", async ()=>{
        const result = await userService.getUser(1);
        expect((result as User).first_name).toEqual("George");
    })
})
