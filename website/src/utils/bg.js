export const BUCKET_URL = 'https://dchqsxvlazultvsphmau.supabase.co/storage/v1/object/public/img/'

export const load_bg = (new_bg = false) => {
  if (new_bg) window.localStorage.setItem('BG_URL', new_bg)
  let url = localStorage.getItem('BG_URL') || ''
  if (document.body.querySelector('video')) document.body.querySelector('video').remove()

  if (url.endsWith('.mp4')) {
    let v = document.createElement('video');
    v.setAttribute('autoplay', 'true');
    v.setAttribute('muted', '');
    v.setAttribute('loop', '');
    let s = document.createElement('source');
    s.setAttribute('src', url);
    s.setAttribute('type', 'video/mp4');
    v.appendChild(s);
    document.body.appendChild(v);
  } else {
    document.body.style = `
      background: url(${url}) no-repeat center center fixed;
      background-size:cover;
    `;
  }
}

