import { Request, Response } from "express";
import { NextFunction } from "connect";
import userService from "../services/user.service";
import { User } from "../interfaces/user.interface";
import imageService from "../services/image.service";
import Fs from "fs";
class UserController{

    public user = [this.getUser,this.responseUser];
    public avatar = [this.getUser,this.getAvatar,this.responseAvatar];
    
    constructor(){
   
    }

    getUser(req:Request,res:Response,next:NextFunction){
        
        userService.getUser(req.params.userId)
            .then((user:User)=>{
                res.locals.user = user;
                next();
            })
            .catch(e=>{
                next(e);
            });
    }

    getAvatar(req:Request,res:Response,next:NextFunction){
        const {avatar} = res.locals.user;
        imageService.getImage(avatar).then(path=>{
            res.locals.path = path;
            next();
        }).catch(e=>{
            next(e);
        });

    }

    responseAvatar(req:Request,res:Response,next:NextFunction){
        Fs.readFile(res.locals.path,{encoding:'base64'},(err,data)=>{
            if(err){
               next(err);
            }
            res.send(data);
        })
    }

    responseUser(req:Request,res:Response,next:NextFunction){
        res.json(res.locals.user);
    }


}

export default new UserController();