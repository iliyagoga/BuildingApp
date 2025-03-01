import {makeAutoObservable} from 'mobx'
class ObjectsStore{

    private _objects: object[];
    private _meta: object;



    constructor(){
        makeAutoObservable(this)
    }

    public getObjects(){
        return this._objects;
    }

    public setObjects(objects: object[]){
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