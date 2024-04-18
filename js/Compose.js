export default class Compose {
    constructor(){
        this.parent = null
        this.children =[]

    }
    add(obj){
        obj.parent = this
        this.children.push(obj)
    }
    update(t){
        for(let i = 0; i < this.children.length; i++){
            this.children[i].update(t)
        }
    }
}