(() => {
  const DOMAIN = {
    protocol: 'https',
    name: 'spoc',
    tld: 'zip',
    subdomains: [
      { label: '🎧', route: 'playlist' },
      { label: 'Blog', route: 'blog' },
      { label: 'Data', route: 'data' },
      { label: 'Foods', route: 'foods' },
      { label: 'Webdaw', route: 'daw' }
    ],
    full_url: (sub) => `${DOMAIN.protocol}://${sub?`${sub}.`:''}${DOMAIN.name}.${DOMAIN.tld}`
  };

  let background = document.querySelector('div');
  const nav = document.querySelector('nav')
  const iframe = document.querySelector('iframe');
  const loading = document.querySelector('img');
  const btn_offset = 2000 / DOMAIN.subdomains.length
  const btn_fadein_duration = btn_offset * 6
  const bg_fade_duration = 1800

  const build_nav = () => {
    DOMAIN.subdomains.forEach((sub, i) => {
      const button = document.createElement('button');
      button.id = sub.route;
      button.innerHTML = sub.label;
      button.style.transition = `opacity ${btn_fadein_duration}ms`;
      button.style.transitionTimingFunction = "cubic-bezier(0.8,0.1,0.6,1);";
      button.onclick = () => tgl_iframe(sub.route);
      nav.appendChild(button);
      setTimeout(() => (button.style.opacity = '1'), i * btn_offset);
    });
    load_bg()
  };

  const tgl_iframe = name => {
    loading.style.display = 'flex';
    iframe.src = iframe.src.includes(name) ? '' : DOMAIN.full_url(name);
    let prev = document.getElementsByClassName('Opened')[0];
    if (prev) prev.classList.remove('Opened');
    let current = (iframe.src.match(/https:\/\/(.*?)\.spoc\.zip\//) || [])[1];
    if (current) document.getElementById(current).classList.add('Opened');
  }

  const replace_bg = (bg_url) => {
    background.addEventListener('transitionend', () => load_bg(bg_url));
    background.style.transition = `opacity ${bg_fade_duration / 2}ms`;
    background.style.opacity = 0;
  }

  const load_bg = (new_bg = null) => {
    if (new_bg) localStorage.setItem('background', new_bg);
    let bg_url = localStorage.getItem('background');
    if (bg_url) {
      let bg_img = new Image();
      bg_img.src = bg_url;
      background.remove();
      bg_img.onload = () => {
        background = document.createElement('div');
        background.style = `
          transition: opacity ${bg_fade_duration}ms;
          background: url(${bg_url}) no-repeat center center fixed;
          background-size:cover;
          opacity: 0;
        `;
        document.body.appendChild(background);
        requestAnimationFrame(() => background.style.opacity = '1');
      }
    }
  }

  const hdl_msg = (e) => {
    if (e.origin === DOMAIN.full_url('data') && typeof e.data === "string") {
      localStorage.getItem('background') ? replace_bg(e.data) : load_bg(e.data)
    }
  }

  window.onload = () => build_nav();
  window.addEventListener("message", (e) => hdl_msg(e));
  iframe.addEventListener('load', () => loading.style.display = 'none');
})();