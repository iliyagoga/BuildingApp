import { makeAutoObservable } from "mobx";
import LinkAble from "../interfaces/LinkAble";

class PrivateLinksStore{
    private _links: LinkAble[]=[];
    constructor(){
            makeAutoObservable(this)
    }

    public getLinks(){
        return this._links;
    }

    public setLinks(links:LinkAble[]){
        this._links=links;
    }
    
}

export default new PrivateLinksStore()