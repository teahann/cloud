<script>
  const playlists = {
    // 'Entertainment 📺': 'https://www.youtube-nocookie.com/embed/krsBRQbOPQ4?si=_CajsA-It5yORXHy',
    'Music 🎵': 'https://www.youtube-nocookie.com/embed/videoseries?si=0vypE9cdPoEECi9B&amp;list=PLKio8DeB65jAXs3BLqnsRvN_AKyOtug6w',
    'Rockets 🚀': 'https://www.youtube-nocookie.com/embed/videoseries?si=Osr5pCQAWM1ZN-6O&amp;list=PLHOSOKcJlCZenQASmyhmQHEUXgST7aJxC',
  }

  let iframe_url = new String()
</script>

<div id="Playlist">
  {#if !iframe_url.length}
    {#each Object.entries(playlists) as [title, url]}
      <button on:click={() => iframe_url = url}>{title}</button>
    {/each}
  {:else}
    <iframe src={iframe_url} allowfullscreen></iframe>
  {/if}
</div>
