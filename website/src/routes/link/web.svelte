<script>
  const data = {
    "Built With": "https://builtwith.com/",
    "CSRF Generator": "https://security.love/CSRF-PoC-Genorator/",
    "Codewars": "https://www.codewars.com/",
    "DNS Dumpster": "https://dnsdumpster.com/",
    "DNS Lookup": "https://mxtoolbox.com/DNSLookup.aspx",
    "Default Credz": "https://cirt.net/passwords",
    "Default Routa": "https://bcca.org/routers-default-passwords/",
    "Image2ASCII": "https://github.com/axodotdev/axii",
    "Explain Shell": "https://www.explainshell.com/",
    "Grey Noise": "https://viz.greynoise.io/",
    "IntelX": "https://intelx.io/",
    "Insecam": "http://insecam.org/",
    "Shodan": "https://www.shodan.io/",
    "Web Headers": "https://securityheaders.com/",
    "Whois Lookup": "https://whois.domaintools.com/",
    "Yandex": "https://yandex.com/",
    "ZoomEye": "https://www.zoomeye.org/"
  }
</script>

<div id="Links" class="List">
  <a href="./" class="Back">❌</a>
  {#each Object.entries(data) as [name, url]}
    <a href={url} target="_blank" class="List">{name}</a>
  {/each}
</div>
