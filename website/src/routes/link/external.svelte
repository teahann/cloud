<script>
  const data = {
    "Andry Konovalov": "https://xairy.io/",
    "Evasion techniques": "https://evasions.checkpoint.com/",
    "Chemicals": "http://www.leonland.de/elements_by_price/en/list",
    "CIS": "https://www.cisecurity.org/advisory",
    "3D Printers": "https://www.matterhackers.com/",
    "Meelo": "https://captmeelo.com/",
    "Cyberpunk": "https://www.cyberpunk.rs/",
    "HackTricks": "https://book.hacktricks.xyz/",
    "h0mbre": "https://h0mbre.github.io/",
    "Miloserdov": "https://miloserdov.org/",
    "NetSec": "https://www.netsecfocus.com/",
    "Shell Storm": "https://shell-storm.org/",
    "Bash": "https://devhints.io/bash",
    "Chemistry": "https://www.geeksforgeeks.org/cbse-class-9-chemistry-notes",
    "Bug Bounty": "https://m0chan.github.io/2019/12/17/Bug-Bounty-Cheetsheet.html",
    "Build": "https://github.com/codecrafters-io/build-your-own-x",
    "Hacking": "https://github.com/vitalysim/Awesome-Hacking-Resources",
    "Malware": "https://github.com/rootkit-io/awesome-malware-development",
    "Security": "https://xapax.github.io/security/",
    "Red Team": "https://github.com/infosecn1nja/Red-Teaming-Toolkit",
    "Raspberry Pi": "https://github.com/thibmaek/awesome-raspberry-pi",
    "OSINT": "https://github.com/jivoi/awesome-osint",
    "OWASP": "https://github.com/OWASP/CheatSheetSeries",
    "Security": "https://github.com/danielmiessler/SecLists",
    "Self Hosted": "https://github.com/awesome-selfhosted/awesome-selfhosted",
    "OpenSSH": "https://en.wikibooks.org/wiki/OpenSSH/Print_version",
    "x86 Assembly": "https://www.cs.virginia.edu/~evans/cs216/guides/x86.html"
  }
</script>

<div id="Links" class="List">
  <a href="./" class="Back">❌</a>
  {#each Object.entries(data) as [name, url]}
    <a href={url} target="_blank">{name}</a>
  {/each}
</div>
