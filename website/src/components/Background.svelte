<script>
  import { onMount, onDestroy } from 'svelte';

  onMount(() => {
    ctx = canvas.getContext('2d');
    resize_canvas();
    window.addEventListener('resize', resize_canvas);
  });

  onDestroy(() => reset());

  let canvas;
  let ctx;
  let bubbles = [];
  let resizeListener;
  let animationFrameId;
  let animationInterval;
  const bubble_color = 'rgba(128,128,128,0.37)'
  const speed_multiplier = 1;
  const minBubbleDelay = 240;
  const pixelPerBubble = 10000;

  const reset = () => {
    cancelAnimationFrame(animationFrameId);
    clearInterval(animationInterval);
  }

  const resize_canvas = () => {
    const oldWidth = canvas.width;
    const oldHeight = canvas.height;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    bubbles.forEach(bubble => {
      bubble.x = (bubble.x / oldWidth) * canvas.width;
      bubble.y = (bubble.y / oldHeight) * canvas.height;
    });
    reset();
    adjustBubbles();
    animate();
  }

  const adjustBubbles = () => {
    const maxBubbles = Math.floor(canvas.width * canvas.height / pixelPerBubble);
    // console.log('Max Bubbles:', maxBubbles)
    const numExistingBubbles = bubbles.length;
    if (maxBubbles > numExistingBubbles) {
      createAdditionalBubbles(maxBubbles - numExistingBubbles);
    } else if (maxBubbles < numExistingBubbles) {
      bubbles = bubbles.slice(0, maxBubbles);
    }
  }

  const createAdditionalBubbles = (numBubbles) => {
    const create_bubble = () => {
      const x = Math.random() * canvas.width;
      const y = canvas.height + Math.random() * 100 + (i * 2);
      const radius = Math.random() * 8;
      const speed = Math.random() * speed_multiplier;
      bubbles.push({ x, y, radius, speed });
      // if (bubbles.length % 3 === 0) console.log('Bubbles:', bubbles.length)
    }
    let i = 0;
    animationInterval = setInterval(() => {
      create_bubble();
      i++;
      if (i === numBubbles) clearInterval(animationInterval);
    }, Math.random() + minBubbleDelay);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(bubble => {
      bubble.y -= bubble.speed;
      if (bubble.y < -bubble.radius) {
        bubble.y = canvas.height + bubble.radius;
        bubble.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fillStyle = bubble_color;
      ctx.fill();
    });
    animationFrameId = requestAnimationFrame(animate);
  }

</script>

<canvas id="Background" bind:this={canvas}></canvas>