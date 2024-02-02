<script>
    import { url } from '@roxi/routify'

    let gpu_list = [
        ['Animation','./animation'],
        ['Hardware','./hardware'],
        ['Game of Life','./game_of_life']
    ]

</script>

<main>
    {#each gpu_list as [name, link]}
        <a class="Row" href={ $url(link) } >{name}</a>
    {/each}
</main>
