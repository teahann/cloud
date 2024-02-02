<script lang=ts>
  import { AI } from './openai.ts'
  import { writable } from 'svelte/store'

  const bots = {
    'GPT3': 'gpt-3.5-turbo',
    'GPT4': 'gpt-4',
    'Nightly': 'gpt-4-0613',
    'Max':'gpt-3.5-turbo-16k'
  }

  let bot: string = Object.values(bots)[0]
  let user_input: string = new String()

  const msgs = writable(new Array())
  const add_msg = (msg) => msgs.set([ ...$msgs, msg ])
  const check_send = (e) => { if (e.keyCode === 13) send() }

  const send = async () => {
    add_msg({ "role": "user", "content": user_input })
    user_input = new String()

    try {
      let params = {
        "model": bot,
        "messages": $msgs,
        "temperature": 0.7,
        "max_tokens": 2048,
        "top_p": 1,
        "n": 1,
        "presence_penalty": 0,
        "frequency_penalty": 0,
      }
      const res = await AI.txt_gen(params)
      add_msg(res.data.choices[0].message)
    } catch (error) {
      add_msg('Server', 'error 🥲')
    }
  }
  
</script>


<div class="Glass">
  
  <div class="Bots">
    {#each Object.entries(bots) as [name, id] }
      <button on:click={() => bot = id} class:Selected={bot === id} >
        {name}
      </button>
    {/each}
  </div>

  <input autofocus
    bind:value={user_input}
    on:keyup={check_send}
    placeholder="Enter message"
  />

  <div class="Messages">
    {#each $msgs as msg}
      <div class={`Message ${msg.role}`} >
        <p class="Content" >{msg.content}</p>
        <p class="Role" >{msg.role}</p>
      </div>
    {/each}
  </div>

</div>
