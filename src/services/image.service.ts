import axios from "axios";
import Path from "path";
import Fs from "fs";
class ImageService{

    private filename:string = "";

    constructor(){
        const path = Path.resolve(__dirname,"../","images");
        if(!Fs.existsSync(path)){
            Fs.mkdirSync(path);
        }
    }
    async getImage(url:string){
        this.filename = (url.split("/").pop() as string);
        const path = Path.resolve(__dirname,"../","images",this.filename);
        if(!this.exists()){
            await this.download(url,path)
        }
        return path;
 
    }

    async download(url:string,path:any){
        const writer = Fs.createWriteStream(path) 
        const response = await axios({
            url:url,
            method:'GET',
            responseType:'stream'
        })
        response.data.pipe(writer);
        return new Promise((resolve,reject)=>{
            writer.on('finish',resolve);
            writer.on('error',reject);
        })
    }


    exists(){
        const path = Path.resolve(__dirname,"../","images",this.filename);
        return Fs.existsSync(path);
    }
}

export default new ImageService();