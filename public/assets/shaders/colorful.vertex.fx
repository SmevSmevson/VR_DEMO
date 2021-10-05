// Vertex shader
precision highp float;

//Attributes
attribute vec3 position;

//Uniforms
uniform mat4 worldViewProjection;
uniform float time;


//Entry point
void main(void) {

    //WorldPos
    vec4 output1 = worldViewProjection * vec4(position, 1.0);
    
    //VertexOutput
    gl_Position = output1;

}