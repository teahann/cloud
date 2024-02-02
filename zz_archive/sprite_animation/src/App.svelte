<script>
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import * as player_sprites from './assets/player/index.js'

  onMount(() => {
    init_canvas_size()
    ctx = canvas.getContext('2d')
    user_input = new Controller()
    player = new Player($width, $height)
    animate(0)
  })

  const width = writable()
  const height = writable()
  const pixel_ratio = writable()

  let canvas
  let ctx
  let user_input
  let player

  let current_sprite
  let sprite_offset = 0
  const game = { 'frame': 0, 'frame_stagger': 5 }
  const controls = ['w', 'a', 's', 'd', ' ']

  const imgfy = url => Object.assign(new Image(), { src: url })

  const sprites = {
    'Attack 1': { 'img': imgfy(player_sprites.attack_1), 'x': 128, 'y': 128, 'frames': 5 },
    'Attack 2': { 'img': imgfy(player_sprites.attack_2), 'x': 128, 'y': 128, 'frames': 4 },
    'Attack 3': { 'img': imgfy(player_sprites.attack_3), 'x': 128, 'y': 128, 'frames': 4 },
    'Dead': { 'img': imgfy(player_sprites.dead), 'x': 128, 'y': 128, 'frames': 6 },
    'Flight': { 'img': imgfy(player_sprites.flight), 'x': 128, 'y': 128, 'frames': 6 },
    'Hurt': { 'img': imgfy(player_sprites.hurt), 'x': 128, 'y': 128, 'frames': 3 },
    'Idle': { 'img': imgfy(player_sprites.idle), 'x': 128, 'y': 128, 'frames': 6 },
    'Run': { 'img': imgfy(player_sprites.run), 'x': 128, 'y': 128, 'frames': 7 },
    'Scream': { 'img': imgfy(player_sprites.scream), 'x': 128, 'y': 128, 'frames': 7 },
    'Walk': { 'img': imgfy(player_sprites.walk), 'x': 128, 'y': 128, 'frames': 7 }
  }

  class Controller {
    constructor() {
      this.keys = []
      window.addEventListener('keydown', (e) => {
        if (controls.includes(e.key) && this.keys.indexOf(e.key) === -1) {
          this.keys.push(e.key)
        }
      })
      window.addEventListener('keyup', (e) => {
        if (controls.includes(e.key)) {
          this.keys.splice(this.keys.indexOf(e.key), 1)
        }
      })
    }
  }

  class Player {
    constructor(game_width, game_height) {
      this.game_width = game_width
      this.game_height = game_height
      this.width = 128
      this.height = 128
      this.x = 0
      this.y = this.game_height - this.height
      this.image = sprites['Idle'].img
      this.frame_x = 0
      this.max_frame = sprites['Idle'].frames - 1
      this.fps = 10
      this.frame_timer = 0
      this.frame_interval = 1000 / this.fps
      this.speed = 0
      this.vy = 0
      this.weight = 1
    }
    draw(context) {
      context.drawImage(
        this.image,
        this.frame_x * this.width,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
    update(input, delta_time) {
      // Sprite animation
      if (this.frame_timer > this.frame_interval) {
        this.frame_x >= this.max_frame ? this.frame_x = 0 : this.frame_x++
        this.frame_timer = 0
      } else {
        this.frame_timer += delta_time
      }
      if (this.vy == 0 && this.speed == 0) {
        this.image = sprites['Idle'].img
        this.max_frame = sprites['Idle'].frames - 1
      }
      // Controls
      if (input.keys.indexOf('d') > -1) {
        this.image = sprites['Walk'].img
        this.max_frame = sprites['Walk'].frames -1
        this.speed = 5
      } else if (input.keys.indexOf('a') > -1) {
        this.image = sprites['Walk'].img
        this.max_frame = sprites['Walk'].frames -1
        this.speed = -5
      } else if (input.keys.indexOf('w') > -1 && this.onGround()) {
        this.image = sprites['Run'].img
        this.max_frame = sprites['Run'].frames -1
        this.vy -= 20
      } else {
        this.speed = 0
      }
      // Horizontal movement
      this.x += this.speed
      if (this.x < 0) this.x =0
      else if (this.x > this.game_width - this.width) this.x = this.game_width - this.width
      // Vertical movement
      this.y += this.vy
      if (!this.onGround()) {
        this.vy += this.weight / 2
      } else {
        this.vy = 0
      }
      // Is falling
      if (this.vy > 0) {
        this.image = sprites['Flight'].img
        this.max_frame = sprites['Flight'].frames -1
      }
      if (this.y > this.game_height - this.height) this.y = this.game_height - this.height
    }
    onGround() {
      return this.y >= this.game_height - this.height
    }
  }


  let last_time = 0
  
  const animate = (time_stamp) => {
    const delta_time = time_stamp - last_time
    last_time = time_stamp
    ctx.clearRect(0, 0, $width, $height)
    player.draw(ctx)
    player.update(user_input, delta_time)
    requestAnimationFrame(animate)
  }

  const init_canvas_size = () => {
    width.set(window.innerWidth);
    height.set(window.innerHeight - 6);
    pixel_ratio.set(window.devicePixelRatio);
    if (player instanceof Player) player = new Player($width, $height) 
  }

</script>

<canvas
  bind:this={canvas}
  width={$width * $pixel_ratio}
  height={$height * $pixel_ratio}
  style="width: {$width}px; height: {$height}px;"
/>
<svelte:window on:resize|passive={init_canvas_size} />
