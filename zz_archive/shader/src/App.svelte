<script>
  import { onMount } from 'svelte';

  onMount(() => {
    initWebGL();
    resizeCanvas();
  });

  let canvas;
  let gl;
  let animationFrameId;

  const vertexShaderCode = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragmentShaderCode = `
    precision mediump float;

    uniform vec2 iResolution;
    uniform float iTime;

    vec3 palette(float t) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.263, 0.416, 0.557);

      return a + b * cos(6.28318 * (c * t + d));
    }

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
      vec2 uv0 = uv;
      vec3 finalColor = vec3(0.0);
      float alpha = 1.0;
      
      for (float i = 0.0; i < 2.0; i++) {
        uv = fract(uv * 1.5) - 0.5;
        float d = length(uv) * exp(-length(uv0));
        vec3 col = palette(length(uv0) + i * 0.4 + iTime * 0.4);

        d = sin(d * 8.0 + iTime) / 4.0;
        d = abs(d);
        d = pow(0.01 / d, 1.2);

        finalColor += col * d;
      }
      if(length(finalColor) < 0.8) alpha = 0.0;  
      fragColor = vec4(finalColor, alpha);
    }

    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
  `;

  const createShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    return shader;
  };

  const initWebGL = () => {
    gl = canvas.getContext('webgl', { alpha: true });
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderCode);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderCode);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program)
    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, 'position');
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0]),
      gl.STATIC_DRAW
    );

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');
    const iTimeLocation = gl.getUniformLocation(program, 'iTime');

    const setUniforms = () => {
      gl.uniform2f(iResolutionLocation, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.uniform1f(iTimeLocation, performance.now() / 1000);
    };

    const render = () => {
      setUniforms();
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();
  };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

</script>

<svelte:window on:resize={resizeCanvas} />
<canvas bind:this={canvas}></canvas>