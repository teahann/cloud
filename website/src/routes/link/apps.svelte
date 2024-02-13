<script>
  const data = {
    "Built With": "https://builtwith.com/",
    "CSRF Generator": "https://security.love/CSRF-PoC-Genorator/",
    "Codewars": "https://www.codewars.com/",
    "DNS Dumpster": "https://dnsdumpster.com/",
    "DNS Lookup": "https://mxtoolbox.com/DNSLookup.aspx",
    "Default Passwords": "https://cirt.net/passwords",
    "EXIF": "https://jimpl.com/",
    "Image2ASCII": "https://github.com/axodotdev/axii",
    "Earth Cam": "https://www.earthcam.com/",
    "Explain Shell": "https://www.explainshell.com/",
    "Exploit DB": "https://www.exploit-db.com/google-hacking-database",
    "Face Check": "https://facecheck.id/",
    "Grey Noise": "https://viz.greynoise.io/",
    "Info Sniper": "https://infosniper.net/",
    "IntelX": "https://intelx.io/",
    "Insecam": "http://insecam.org/",
    "OWASP": "https://owasp.org/",
    "Pic2Map": "https://www.pic2map.com/",
    "Python Obfuscator": "https://pyob.oxyry.com/",
    "Router Passwords": "https://bcca.org/routers-default-passwords/",
    "Shodan": "https://www.shodan.io/",
    "Web Headers": "https://securityheaders.com/",
    "Web Obfuscators": "https://php-minify.com/",
    "Whois Lookup": "https://whois.domaintools.com/",
    "Yandex": "https://yandex.com/",
    "ZoomEye": "https://www.zoomeye.org/"
  }
</script>

<div id="Links">
  <a href="./" class="Back">❌</a>
  {#each Object.entries(data) as [name, url]}
    <a href={url} target="_blank" class="List">{name}</a>
  {/each}
</div>
