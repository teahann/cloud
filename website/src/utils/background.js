import { writable } from 'svelte/store';

const init = {
  degrees: 172,
  color1: 'rgb(41,36,36)',
  color2: 'rgb(0,0,0)'
}

export const background = {
  degrees: window.localStorage.getItem('BG_DEGREES') || init.degrees,
  color1: window.localStorage.getItem('BG_COLOR1') || init.color1,
  color2: window.localStorage.getItem('BG_COLOR2') || init.color2
};

export const init_background = () => {
  document.body.style.background = `
    linear-gradient(${background.degrees}deg,
    ${background.color1},
    ${background.color2})
  `
  window.localStorage.setItem('BG_DEGREES', background.degrees);
  window.localStorage.setItem('BG_COLOR1', background.color1);
  window.localStorage.setItem('BG_COLOR2', background.color2);
}

export const reset_background = () => {
  window.localStorage.removeItem('BG_DEGREES');
  window.localStorage.removeItem('BG_COLOR1');
  window.localStorage.removeItem('BG_COLOR2');
  background.degrees = init.degrees;
  background.color1 = init.color1;
  background.color2 = init.color2;
  init_background()
}
