<script lang="ts">
  import * as THREE from 'three'
  import * as SC from 'svelte-cubed'
  import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
	import { onMount } from "svelte";
  import { mousePos } from '$lib/stores';

  const dracoLoader = new DRACOLoader();
  const loader = new GLTFLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  dracoLoader.setDecoderConfig({ type: 'js' });
  loader.setDRACOLoader(dracoLoader);

  let model : THREE.BufferGeometry | null = null;
  let spot = new THREE.SpotLight();
  spot.position.set(0, 0, 8);
    
  onMount(() => {
    loader.load("/graces-draco2.glb", (gltf : GLTF) => {
      model = (gltf.scene.children[0] as THREE.Mesh).geometry;
    });
  });

  SC.onFrame(() => {
    // follow mouse with light
    spot.position.x = lerp((spot.position.x -0.5), $mousePos.x / 250, 0.1)
    spot.position.y = lerp((spot.position.y), $mousePos.y / 250, 0.1)
  });

  function lerp(v0 : number, v1 : number, t : number) {
    return v0 * (1 - t) + v1 * t
  }
</script>

<section>
  <div role="presentation">
    <SC.Canvas
      antialias
      background={new THREE.Color('black')}
      fog={new THREE.FogExp2('black', 0)}
      shadows={THREE.PCFShadowMap}>
      {#if model}
        <SC.Mesh 
          geometry={model}
          material={new THREE.MeshStandardMaterial({
            color: '#555',
            roughness: 0.9,
            metalness: 0.5
          })}
          scale={[1,1,1]}
          position={[0, -2.5, 0]}
          rotation={[0, -0.2, 0]}
          castShadow
          receiveShadow />
      {/if}
      <SC.PerspectiveCamera position={[0, 0, 6]} fov={50} near={3} far={15}/>
      <SC.DirectionalLight color={0x435c72} intensity={0.08} position={[-100,0,-100]} />
      <SC.PointLight intensity={1} position={[0, 10, -10]}/>
      <SC.SpotLight
        intensity={8}
        position={spot.position.toArray()}
        penumbra={2}
        distance={10} />
    </SC.Canvas>
  </div>
</section>

<style lang="scss">
  section {
    height: 100dvh;
    width: 100dvw;
  }
</style>