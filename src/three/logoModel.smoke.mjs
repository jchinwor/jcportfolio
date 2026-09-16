import * as THREE from 'three';
import { createJcLogoModel } from './createJcLogoModel.js';

const group = createJcLogoModel({ ink: '#f4f4f6', chevron: '#e08a00' });
const letters = group.getObjectByName('letters');
const chevron = group.getObjectByName('chevron');

function assert(cond, msg) { if (!cond) { console.error('FAIL:', msg); process.exit(1); } }

assert(group instanceof THREE.Group, 'returns a Group');
assert(letters && letters.isMesh, 'has a mesh named letters');
assert(chevron && chevron.isMesh, 'has a mesh named chevron');
assert(letters.material !== chevron.material, 'letters and chevron have separate materials');
assert(letters.material.color.getHexString() === 'f4f4f6', 'letters take the ink colour');
assert(chevron.material.color.getHexString() === 'e08a00', 'chevron takes the chevron colour');

const box = new THREE.Box3().setFromObject(group);
const size = box.getSize(new THREE.Vector3());
const centre = box.getCenter(new THREE.Vector3());
assert(size.x > 1.8 && size.x < 2.2, `width about 2 units (got ${size.x.toFixed(2)})`);
assert(Math.abs(centre.x) < 0.05 && Math.abs(centre.y) < 0.05, 'centred at origin');

const lb = new THREE.Box3().setFromObject(letters);
const cb = new THREE.Box3().setFromObject(chevron);
assert(cb.max.z > lb.max.z, 'chevron sits proud of the letter face');

console.log('PASS: createJcLogoModel smoke check');
