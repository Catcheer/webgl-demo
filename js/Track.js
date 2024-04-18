export default class Track {
    constructor(target) {
        this.target = target
        this.start = 0;
        this.parent = null;
        this.timeLen = 5
        this.loop = false;
        this.keyMap = new Map()
    }
    update(t) {
        const { target,start, keyMap, loop, timeLen } = this
        // 本地时间
        let time = t - start;
        if (loop) {
            time = time % timeLen
        }
        for(let [key, fms] of keyMap){
            const  last = fms.length -1;
            if(time<fms[0][0]){
                target[key]= fms[0][1]
            }else if(time>fms[last][0]){
                target[key]= fms[last][1]
            }else{
                target[key]= getBetweenFms(time,fms,last)
            }

        }
    }


}

function getBetweenFms(time,fms,last){
    for(let i=0;i<last;i++){
        let fm1 = fms[i]
        let fm2 = fms[i+1]
        if(time>=fm1[0]&&time<=fm2[0]){
            let t = (time-fm1[0])/(fm2[0]-fm1[0])
            return fm1[1]*(1-t)+fm2[1]*t
        }
    }

}
