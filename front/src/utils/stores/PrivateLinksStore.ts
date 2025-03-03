import { makeAutoObservable } from "mobx";

class PrivateLinksStore{
    private _links: object[]=[];
    constructor(){
            makeAutoObservable(this)
    }

    public getLinks(){
        return this._links;
    }

    public setLinks(links:object[]){
        this._links=links;
    }
    
}

export default new PrivateLinksStore()