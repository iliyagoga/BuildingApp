import {makeAutoObservable} from 'mobx'
import ApplicationAble from '../interfaces/ApplicationInAble.ts';

class AppStore{

    private _applications: ApplicationAble[];
    private _meta: object;



    constructor(){
        makeAutoObservable(this)
    }

    public getApplications():ApplicationAble[]{
        return this._applications;
    }

    public setApplications(applications: ApplicationAble[]){
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