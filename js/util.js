function initShaders(gl, vs, fs) {
    const x_vertext = document.querySelector(vs).textContent;
    const x_fragment = document.querySelector(fs).textContent;

    const vsObj = gl.createShader(gl.VERTEX_SHADER);
    const fsObj = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vsObj, x_vertext);
    gl.shaderSource(fsObj, x_fragment);
    gl.compileShader(vsObj);
    gl.compileShader(fsObj);
    if (!gl.getShaderParameter(vsObj, gl.COMPILE_STATUS)) {
        alert("Can't compile the vertex shader.");
    }
    if (!gl.getShaderParameter(fsObj, gl.COMPILE_STATUS)) {
        alert("Can't compile the fragment shader.");
        return;
    }
    const p = gl.createProgram();
    gl.attachShader(p, vsObj);
    gl.attachShader(p, fsObj);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        alert("Can't link the shaders-attached program.!!!");
        return;
    }
    gl.useProgram(p);
    const shaderProgram = p;
    gl.program = p;
    return p;
}


export { initShaders };