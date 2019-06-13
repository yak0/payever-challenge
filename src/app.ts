import express from "express";
import userCtl from "./controllers/user.controller";
import errorhandler from "errorhandler";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const router = express.Router();
 
router.get('/api/user/:userId',userCtl.user) 
router.get('/api/user/:userId/avatar',userCtl.avatar)

app.use("/",router);
app.use(errorhandler())
app.listen(process.env.PORT|| 8000,()=>{
    console.log(`server started at http://localhost:${process.env.PORT}`);
});

module.exports = app;