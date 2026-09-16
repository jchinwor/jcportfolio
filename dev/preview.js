import * as THREE from 'three';
import { createJcLogoModel } from '../src/three/createJcLogoModel.js';

const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
camera.position.set(0, 0, 6);

scene.add(new THREE.AmbientLight(0xffffff, 1.2));
const key = new THREE.DirectionalLight(0xffffff, 2.5);
key.position.set(-3, 4, 5);
scene.add(key);

const colours = { light: { ink: '#0a0a0c' }, dark: { ink: '#f4f4f6' } };
let dark = false;
let model = createJcLogoModel({ ink: colours.light.ink, chevron: '#e08a00' });
scene.add(model);

document.getElementById('toggle').addEventListener('click', () => {
  dark = !dark;
  document.body.classList.toggle('dark', dark);
  document.getElementById('ref').src = dark ? '/src/assets/jclogo.png' : '/src/assets/jclogoblack.png';
  model.getObjectByName('letters').material.color.set(dark ? colours.dark.ink : colours.light.ink);
});

function resize() {
  const { clientWidth: w, clientHeight: h } = canvas;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

// Front view for the comparison sheet; press R to orbit.
let orbit = false;
window.addEventListener('keydown', (e) => { if (e.key === 'r') orbit = !orbit; });
renderer.setAnimationLoop((t) => {
  model.rotation.y = orbit ? t * 0.0005 : 0;
  renderer.render(scene, camera);
});
