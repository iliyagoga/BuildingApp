import {makeAutoObservable} from 'mobx'
class AppStore{

    private _applications: object[];
    private _meta: object;



    constructor(){
        makeAutoObservable(this)
    }

    public getApplications(){
        return this._applications;
    }

    public setApplications(applications: object[]){
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