import { writable } from 'svelte/store';

export const mousePos = writable({ x: 0, y: 0 });
