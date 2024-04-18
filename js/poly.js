const defAttr = () => ({
    gl: null,
    size: 2,
    count: 0,
    types: ['OPTIONS'],
    geoData: [],
    vertices: [],
    attrName: 'a_position',
    circleDot:false,
    u_IsPoints:null,

})


export default class Poly {
    constructor(attr) {
        Object.assign(this, defAttr(), attr)
        this.init()
    }
    init() {
        const { gl, attrName ,size,circleDot} = this
        if (!gl) {
            return
        }
        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        this.updateBuffer()
        const a_position = gl.getAttribLocation(gl.program, attrName)
        gl.vertexAttribPointer(a_position,size, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(a_position)
        
        if(circleDot){
            this.u_IsPoints = gl.getUniformLocation(gl.program, 'u_IsPoints')
        }
    }

    updateBuffer() {
        const { gl,vertices} = this
        if (!gl) {
            return
        }
        this.updataCount()
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    }
    updataCount(){
        this.count = this.vertices.length/this.size
    }
    addVertices(...vertices) {
         this.vertices.push(...vertices)
         this.updateBuffer()
    }
    popVertices() {
        const len = this.vertices.length
        
        this.vertices.splice(len-this.size,this.size)
        this.updateBuffer()
    }
    setVertices(ind,...params){
        const {size} = this
        let i = ind*size
        params.forEach((item,index)=>{
            this.vertices[i+index] = item
          
        })
    }
    updataVertices(params){
       const {geoData} =this

       const  arr =[]

       geoData.forEach(data=>{
        params.forEach(key=>{
            arr.push(data[key])
        })
       })
       this.vertices = arr

    }

    draw(types = this.types){
        const { gl,count,circleDot} = this
        if (!gl) {
            return
        }
      
        for(let type of types){
            if(circleDot){
                gl.uniform1f(this.u_IsPoints,type==='POINTS')
            }
            gl.drawArrays(gl[type], 0, count)
        }
    }

}