<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let celestial = data.celestial;

	const its_url = 'https://in-the-sky.org/solarsystem.php?obj='
	const orbit_url = its_url + celestial.its_id

</script>

<div class="SpaceObject">
	<h1 class="Name" >{celestial.name}</h1>
	{#if celestial.photos[0]}
		<img src={celestial.photos[0]} />
	{/if} 
	<h5 class="Info" >{celestial.about}</h5>
	<div class="Stats">
		{#if celestial.its_id}
			<div class="Orbit" >
				<a href={orbit_url} target="_blank" class="title">Orbit stats</a>
				<div class="Stat" >
					<h5 title="Eccentricity" >{celestial.eccentricity}</h5>
					<h5 title="Avg orbit distance" >{celestial.sun_au} AU</h5>
					<h5 title="Earth days per orbit" >{celestial.sidereal_orbit}</h5>
				</div>
			</div>
		{/if}
	</div>
	<a href="./" class="Back" >Back</a>
</div>
