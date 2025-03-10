import {makeAutoObservable} from 'mobx'
interface Objects{
    id:string,
    title:string,
    address:string,
    date:string,
    count:number
}
class ObjectsStore{

    private _objects: Objects[];
    private _meta: object;



    constructor(){
        makeAutoObservable(this)
    }

    public getObjects(){
        return this._objects;
    }

    public setObjects(objects: Objects[]){
        this._objects = objects;
    }

    public getMeta(){
        return this._meta;
    }

    public setMeta(meta:object){
        this._meta=meta;
    }


}

export default new ObjectsStore()