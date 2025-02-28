import {makeAutoObservable} from 'mobx'
class ObjectsStore{
    constructor(){
        makeAutoObservable(this)
    }
}

export default new ObjectsStore()