<script>
  import pdfs from './pdfs.json'

  const BUCKET = 'https://dchqsxvlazultvsphmau.supabase.co/storage/v1/object/public/pdf/'
  const create_link = (name) => `${BUCKET}${name}.pdf`
</script>

<div class="Generic List">
  <header>
    <h2 class="Title"><a href="./index">Links</a> - PDFs</h2>
    <h4 class="Date">01/21/2024</h4>
  </header>
  <div class="Content">
    {#each pdfs as filename}
      <a href={create_link(filename)} target="_blank">{filename}</a>
    {/each}
  </div>
  <a href="./index" class="Back">Back</a>
</div>
