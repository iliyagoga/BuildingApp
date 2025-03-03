import axios from "axios"
import list from "./apiLIst.ts";
import ObjectsStore from "./stores/ObjectsStore.ts";
import AppStore from "./stores/AppStore.ts";
import Applications from "../components/Applications.jsx";
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

    public async getApplications(){
        try {
           const res = await axios.get(this.hostName+list.applications+"?_relations=objects") 
           AppStore.setApplications(res.data)
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

    public async getApplicationsByFilter(id:string, title:string, description: string, email: string, date:string, status:string, object: number){
        try {
            let body:any[]=[]
            if(id!=null && id.length>0){
                body.push('id='+id+"*");
            }
            if(title!=null && title.length>0){
                body.push('title='+title+"*");
            }
            if(description!=null && description.length>0){
                body.push('description='+description+"*");
            }
            if(email!=null && email.length>0){
                body.push('email='+email+"*");
            }
            if(date!=null && date.length>0){
                body.push('date='+date+"*");
            }
            if(status!=null && status.length>0 && status!="null" ){
                body.push('status='+status);
            }
            const str =body.join("&")

            const res = await axios.get(this.hostName+list.applications+"?"+str+"&_relations=objects")
            AppStore.setApplications(res.data)
        } catch (error) {
            throw error;
        }
    }

    public async register(login:string, email:string, pass:string){
        try {
            const res = await axios.post(this.hostName+list.register,JSON.stringify({
                fullName:login,
                email,
                password: pass
            }), {headers:{Accept:"application/json","Content-Type":"application/json"}})
            document.cookie = "token="+res.data['token'];
            return true;
        } catch (error) {
            if(error.response.data.message==="RESOURCE_USER_ALREADY_EXISTS"){
                throw {message:"Такой пользователь уже авторизирован"}
            }
        }
    }

    public async login(email:string, pass:string){
        try {
            const res =await axios.post(this.hostName+list.login,JSON.stringify({
                email,
                password:pass
            }), {headers:{Accept:"application/json","Content-Type":"application/json"}})
            document.cookie = "token="+res.data['token'];
            return true;
        } catch (error) {

            if(error.response.data.message ==="RESOURCE_INVALID_LOGIN_OR_PASSWORD"){
                throw {message:"Неверные данные"}
            }
        }
    }



    
}
export default new Api(list.host)