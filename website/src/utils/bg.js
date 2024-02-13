export const BUCKET_URL = 'https://dchqsxvlazultvsphmau.supabase.co/storage/v1/object/public/img/'
export const DEFAULT_BG = 'https://dchqsxvlazultvsphmau.supabase.co/storage/v1/object/public/img/Default.webp'

export const load_bg = (new_bg = false) => {
  if (new_bg) window.localStorage.setItem('BG_URL', new_bg)
  let url = localStorage.getItem('BG_URL') || DEFAULT_BG
  document.body.style = `
    background: url(${url}) no-repeat center center fixed;
    background-size:cover;
  `;
}