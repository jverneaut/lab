import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { WEBVR } from 'three/examples/jsm/vr/WebVR.js';

const SCALE = 4;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * SCALE, window.innerHeight * SCALE, false);
renderer.setClearColor(0xbbbbbb);
renderer.vr.enabled = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

document.body.appendChild(renderer.domElement);
document.body.appendChild(WEBVR.createButton(renderer));

const geometry = new THREE.PlaneGeometry(40, 40);
const material = new THREE.MeshPhongMaterial({
  color: 0xf3f3f3,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry, material);
plane.position.z = -7;
plane.position.y = 0.5;
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.2, 40);
pointLight.position.set(0, 4, 0);
pointLight.castShadow = true;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 25;
scene.add(pointLight);

let logo;
const loader = new GLTFLoader();
loader.load(require('./logo.glb'), gltf => {
  const material = new THREE.MeshPhongMaterial({ color: 0x223344 });
  logo = gltf.scene.children[0];
  logo.material = material;
  logo.position.z = -5;
  logo.position.y = 1;
  logo.castShadow = true;
  scene.add(logo);
});

let hue = 0;

const update = () => {
  if (logo) {
    const color = new THREE.Color(`hsl(${(hue += 0.5)}, 60%, 50%)`);
    logo.material.color = color;
    logo.rotation.z += 0.02;
  }
};

renderer.setAnimationLoop(() => {
  update();
  renderer.render(scene, camera);
});
