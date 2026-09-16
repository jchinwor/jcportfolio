<template>
  <div ref="root" class="badge3d" aria-hidden="true">
    <canvas v-if="!fallback" ref="canvas" class="badge3d-canvas"></canvas>
    <img v-else :src="fallbackSrc" alt="JC logo" class="badge3d-img" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { createJcLogoModel } from '@/three/createJcLogoModel.js';
import logoLight from '@/assets/jclogoblack.png';
import logoDark from '@/assets/jclogo.png';

const CHEVRON = '#e08a00';
const SPIN = 0.4;          // rad/s
const TILT = 0.25;         // rad, max lean on X and Z
const EASE = 0.08;         // lerp factor per frame
const STATIC_POSE_Y = 0.5; // rad, reduced-motion pose

const root = ref(null);
const canvas = ref(null);
const fallback = ref(false);
const fallbackSrc = ref(logoLight);

let renderer, scene, camera, model, letters;
let frame = 0;
let last = 0;
let visible = false;
let pageVisible = true;
let reducedMotion = false;
let target = { x: 0, z: 0 };
let observer, mutation, resizeObs, hero;
const dark = () => document.documentElement.classList.contains('dark');
const inkColour = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#0a0a0c';

onMounted(() => {
  fallbackSrc.value = dark() ? logoDark : logoLight;
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true });
  } catch {
    fallback.value = true;
    watchThemeForFallback();
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 6);
  scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(-3, 4, 5);
  scene.add(key);

  model = createJcLogoModel({ ink: inkColour(), chevron: CHEVRON });
  letters = model.getObjectByName('letters');
  scene.add(model);

  resize();
  resizeObs = new ResizeObserver(resize);
  resizeObs.observe(root.value);

  mutation = new MutationObserver(() => {
    letters.material.color.set(inkColour());
    renderOnce();
  });
  mutation.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  if (reducedMotion) {
    model.rotation.y = STATIC_POSE_Y;
    renderOnce();
    return;
  }

  pageVisible = document.visibilityState === 'visible';
  observer = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    schedule();
  });
  observer.observe(canvas.value);
  document.addEventListener('visibilitychange', onVisibility);

  if (!window.matchMedia('(pointer: coarse)').matches) {
    hero = root.value.closest('section');
    hero?.addEventListener('pointermove', onPointerMove);
    hero?.addEventListener('pointerleave', onPointerLeave);
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  observer?.disconnect();
  mutation?.disconnect();
  resizeObs?.disconnect();
  document.removeEventListener('visibilitychange', onVisibility);
  hero?.removeEventListener('pointermove', onPointerMove);
  hero?.removeEventListener('pointerleave', onPointerLeave);
  model?.traverse((o) => {
    if (o.isMesh) {
      o.geometry.dispose();
      o.material.dispose();
    }
  });
  renderer?.dispose();
});

function resize() {
  if (!renderer || !root.value) return;
  const w = root.value.clientWidth || 88;
  const h = root.value.clientHeight || 88;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderOnce();
}

function renderOnce() {
  if (renderer) renderer.render(scene, camera);
}

function onVisibility() {
  pageVisible = document.visibilityState === 'visible';
  schedule();
}

function schedule() {
  cancelAnimationFrame(frame);
  if (visible && pageVisible) {
    last = performance.now();
    frame = requestAnimationFrame(tick);
  }
}

function tick(now) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  model.rotation.y += SPIN * dt;
  model.rotation.x = THREE.MathUtils.lerp(model.rotation.x, target.x, EASE);
  model.rotation.z = THREE.MathUtils.lerp(model.rotation.z, target.z, EASE);
  renderer.render(scene, camera);
  frame = requestAnimationFrame(tick);
}

function onPointerMove(e) {
  const r = hero.getBoundingClientRect();
  const nx = ((e.clientX - r.left) / r.width) * 2 - 1;  // -1 .. 1
  const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
  target = { x: ny * TILT, z: -nx * TILT };
}

function onPointerLeave() {
  target = { x: 0, z: 0 };
}

function watchThemeForFallback() {
  mutation = new MutationObserver(() => {
    fallbackSrc.value = dark() ? logoDark : logoLight;
  });
  mutation.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}
</script>

<style scoped>
.badge3d {
  width: 5.5rem;
  height: 5.5rem;
}
.badge3d-canvas,
.badge3d-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
