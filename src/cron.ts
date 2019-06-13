import Path from "path";
import Fs from "fs";
import pageService from "./services/page.service";
import { Page } from "./interfaces/page.interface";
class Cron{
    currentPage:number = 0;
    interval:any;
    path:string;
    constructor(){
        this.path = Path.resolve(__dirname,"pages.json");

    }
    start(){
        this.interval = setInterval(()=>{
             pageService.get(`${process.env.API_URL}/users?page=${this.currentPage}`)
             .then(page=>{
                this.save(page);
                if(page.page>=page.total_pages){
                    clearInterval(this.interval);
                }else{
                    this.currentPage++;
                }
         
             });
        },60000)
    }

    save(page:Page){
    
        Fs.appendFile(this.path, page.data.map(u=>JSON.stringify(u)).join("\n"), err=> {
            if (err) throw err;
            console.log(`Saved! Page: ${page.page}, Users: ${page.data.length}`);
        });
    }

}

new Cron().start();
