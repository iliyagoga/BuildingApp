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
                object_id:object
            })
            if (res.status>=200 && res.status<300){
                const link=Math.random().toString(36).substring(2, 12);
                await axios.post(this.hostName+list.links,{
                    link,
                    app_id: res.data.id
                })
                return link;
            }
        } catch (error) {
            
        }
    }

    public async getApplicationByLink(link:string){
        try {
            const res = await axios.get(this.hostName+list.links+'?link='+link);
            const app= await axios.get(this.hostName+ list.applications+"/"+res.data[0].app_id+"?_relations=objects")
            return app.data;
        } catch (error) {
            
        }
    }



    
}
export default new Api(list.host)