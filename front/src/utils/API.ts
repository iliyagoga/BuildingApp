import axios from "axios"
import list from "./apiLIst.ts";
import ObjectsStore from "./stores/ObjectsStore.ts";
import AppStore from "./stores/AppStore.ts";
class Api {
    private hostName:string="";

    constructor(hostName){
        this.hostName=hostName;
    }
    public async getObjects(page: number = 1,limit:number=10){
        try {
           const res = await axios.get(this.hostName+list.object+"?page="+page+"&limit="+limit) 
           ObjectsStore.setObjects(res.data.items)
           ObjectsStore.setMeta(res.data.meta)
           return true
        } catch (error) {
            
        }
    };

    public async getApplications(page: number = 1,limit:number=10){
        try {
           const res = await axios.get(this.hostName+list.applications+"?page="+page+"&limit="+limit) 
           AppStore.setApplications(res.data.items)
           AppStore.setMeta(res.data.meta)
           return true
        } catch (error) {
            
        }
    };

    public async updateApplication(id:number,status:string){
        try {
            const res = await axios.patch(this.hostName+list.applications+"/"+id,{status})
            return true
        } catch (error) {
            
        }
    }

    public async createApplication(title:string, description: string, email: string, date:string, object: number){
        try {
            const res = await axios.post(this.hostName+list.applications, {
                title,
                description,
                email,
                date,
                status:"added",
                id_object:object
            })
            return 
        } catch (error) {
            
        }
    }


    
}
export default new Api(list.host)