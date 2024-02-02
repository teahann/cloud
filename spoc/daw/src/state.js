import { writable } from 'svelte/store';

export const current_project = writable('Project 01');
export const volume = writable(0.8);
export const view = writable('');
