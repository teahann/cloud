// runs after initial page load
export const load_bg = (new_bg = '') => {
  if (new_bg.length > 0) window.localStorage.setItem('BG_URL', new_bg)
  let url = localStorage.getItem('BG_URL') || ''

  if (url.endsWith('.mp4')) {
    document.body.style.background = 'unset'
    if (document.body.querySelector('video')) document.body.querySelector('video').remove()
    let video = document.createElement('video');
    let source = document.createElement('source');
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    source.src = url;
    source.type = 'video/mp4';
    video.appendChild(source);
    document.body.appendChild(video);
  } else {
    document.body.style = `
      background: url(${url}) no-repeat center center fixed;
      background-size:cover;
    `;
  }
}
