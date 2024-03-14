<script lang="ts">
  import '$styles/main.scss'
  import "@phosphor-icons/web/regular";
  import "@phosphor-icons/web/bold";
  import "@phosphor-icons/web/fill";
  import { mousePos } from '$lib/stores';
</script>

<slot />

<svelte:window
  on:mousemove={(e) => {
    mousePos.set({ x: e.clientX, y: e.clientY });
  }}
/>