import axios from "axios"
import list from "./apiLIst.ts";
import ObjectsStore from "./stores/ObjectsStore.ts";
import AppStore from "./stores/AppStore.ts";
import Applications from "../components/Applications.jsx";
import getCookie from "./functions/getCookie.ts";
import PrivateLinksStore from "./stores/PrivateLinksStore.ts";
class Api {
    private hostName:string="";

    constructor(hostName){
        this.hostName=hostName;
    }
    public async getObjects(){
        try {
           let res:any = await axios.get(this.hostName+list.object)           
            await this.getApplications()
            const appls= AppStore.getApplications()
            res.data.map((obj,i)=>{
                const count=appls.filter(item=>item['object']['id']===obj.id).length

                res.data[i].count=count
            })
           ObjectsStore.setObjects(res.data)
           return true
        } catch (error) {
            
        }
    };

    public async getObjectsByFilter(id:string, title:string, address: string, date:string, count:string, ){
        try {
            let body:any[]=[]
            if(id!=null && id.length>0){
                body.push('id='+id+"*");
            }
            if(title!=null && title.length>0){
                body.push('title='+title+"*");
            }
            if(address!=null && address.length>0){
                body.push('address='+address+"*");
            }
            if(date!=null && date.length>0){
                body.push('date='+date+"*");
            }
            const str =body.join("&")
            const res:any = await axios.get(this.hostName+list.object+"?"+str)
            await this.getApplications()
            const appls= AppStore.getApplications()
            res.data.map((obj,i)=>{
                const count=appls.filter(item=>item['object']['id']===obj.id).length

                res.data[i].count=count
            })
            if(count!=null && count.length>0){
                
                ObjectsStore.setObjects(res.data.filter(item=>Number(item.count)===Number(count)))
            }else{
                ObjectsStore.setObjects(res.data)
            }
           

        } catch (error) {
            throw error;
        }
    }

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

    public async createApplication(title:string, description: string, email: string, date:string, object: number, file: File){
        try {
           if(file){
            const formdata = new FormData();
            formdata.append('file',file);
            const upload = await axios.post(this.hostName+list.upload,formdata
            )
            if(upload.status>200 && upload.status<300){
                const res = await axios.post(this.hostName+list.applications, {
                    title,
                    description,
                    email,
                    date,
                    status:"added",
                    object_id:object,
                    file: upload.data.url
                })
                if (res.status>=200 && res.status<300){
                    const link=Math.random().toString(36).substring(2, 12);
                    await axios.post(this.hostName+list.links,{
                        link,
                        app_id: res.data.id
                    })
                    return link;
                }
            }
           }else{
            const res = await axios.post(this.hostName+list.applications, {
                title,
                description,
                email,
                date,
                status:"added",
                object_id:object,
                file: ""
            })
            if (res.status>=200 && res.status<300){
                const link=Math.random().toString(36).substring(2, 12);
                await axios.post(this.hostName+list.links,{
                    link,
                    app_id: res.data.id
                })
                const check=await this.checkUser();
                if(check){
                    const token=(getCookie('token'))
                    await axios.post(this.hostName+list.applications_users,{email:check, link_id:res.data.id},{headers:{Authorization:"Bearer "+token}})
                }
               
                return link;
            }
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

    public async getApplicationsByFilter(id:string, title:string, description: string, email: string, date:string, status:string, object: string){
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
            const res:any = await axios.get(this.hostName+list.applications+"?_relations=objects&"+str)
            if(object!=null && object.length>0){
                let apps:any=[]
                const regex = new RegExp(`^${object}.*`)
                for(let elem of res.data){
                    console.log(elem)
                    if(regex.test(elem.object.title)){
                        apps.push(elem)
                    }
                }
                AppStore.setApplications(apps)
            }else{
                AppStore.setApplications(res.data)
            }
           

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

    public async checkUser(){
       try {
        const token=(getCookie('token'))
        const res = await axios.get(this.hostName+list.authme,{headers:{Authorization:"Bearer "+token}})
        return res.data.email
       } catch (error) {
        throw false
       }
    }

    public async getPrivateLinks(email:string){
        try {
            const token=(getCookie('token'))
            const res = await axios.get(this.hostName+list.applications_users+"?_relations=links&email="+email,{headers:{Authorization:"Bearer "+token}})
            PrivateLinksStore.setLinks(res.data);

        } catch (error) {
            
        }
    }



    
}
export default new Api(list.host)