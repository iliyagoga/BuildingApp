import axios from "axios"
import list from "./apiLIst.ts";
class Api {
    private hostName:string="";

    constructor(hostName){
        this.hostName=hostName;
    }
    public async getObjects(){
        try {
           const res = await axios.get(this.hostName+list.get.object) 
           return res
        } catch (error) {
            
        }
    };

    
}
export default new Api(list.host)