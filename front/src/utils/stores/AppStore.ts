import {makeAutoObservable} from 'mobx'
interface Application{
    id:string,
    title: string,
    description: string,
    email: string,
    date: string,
    status:string,
    object: object,
    file: string
  
  }
class AppStore{

    private _applications: Application[];
    private _meta: object;



    constructor(){
        makeAutoObservable(this)
    }

    public getApplications():Application[]{
        return this._applications;
    }

    public setApplications(applications: Application[]){
        this._applications = applications;
    }

    public getMeta(){
        return this._meta;
    }

    public setMeta(meta:object){
        this._meta=meta;
    }


}

export default new AppStore()