// Fragment shader
precision highp float;

//Uniforms
uniform float time;
uniform vec2 screenSize;


//Entry point
void main(void) {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/vec2(500, 500);// screenSize.xy;

    // Time varying pixel color
    vec3 col = 0.5 * cos(time + uv.xyx + vec3(1,2,4));

    // Output to screen
    gl_FragColor = vec4(col, 1.0);
}