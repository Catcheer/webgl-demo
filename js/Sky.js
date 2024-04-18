export default class Sky {
    constructor(gl){
        this.gl = gl
        this.children = []

    }
    add(obj){
        obj.gl= this.gl
        this.children.push(obj)
    }
    updataVertices(params){
        this.children.forEach(child=>{
            child.updataVertices(params)
        })
    }
    draw(){
        this.children.forEach(child=>{
            child.init()
            child.draw()
        })
    }
    }
