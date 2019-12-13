import * as THREE from 'three';

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
renderer.shadowMap.enabled = false;

document.querySelector('.particles').appendChild(renderer.domElement);

const starsGeometry = new THREE.Geometry();
for (let i = 0; i < 10000; i++) {
  const star = new THREE.Vector3();
  star.x = THREE.Math.randFloatSpread(2000);
  star.y = THREE.Math.randFloatSpread(2000);
  star.z = THREE.Math.randFloatSpread(2000);

  starsGeometry.vertices.push(star);
}

const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
var texture = new THREE.TextureLoader().load(require('./circle.png'));

starsMaterial.map = texture;

const starField = new THREE.Points(starsGeometry, starsMaterial);

starField.position.z = -600;

scene.add(starField);

let mousePos = [window.innerWidth / 2, window.innerHeight / 2];
let scroll = window.scrollY;

let rotation = { x: 0, y: 0, z: 0 };

const update = () => {
  rotation.x += 0.0004 + 0.002 * 2 * (mousePos[1] / window.innerHeight - 0.5);
  rotation.y += 0.0005 + 0.002 * 2 * (mousePos[0] / window.innerWidth - 0.5);
  rotation.z += 0.0004;

  starField.rotation.x =
    rotation.x - (0.2 * (scroll - window.innerHeight)) / window.innerHeight;
  starField.rotation.y = rotation.y;
  starField.rotation.z = rotation.z;
};

renderer.setAnimationLoop(() => {
  update();
  renderer.render(scene, camera);
});

document.addEventListener('mousemove', e => {
  mousePos[0] = e.clientX;
  mousePos[1] = e.clientY;
});

document.addEventListener('scroll', () => {
  scroll = window.scrollY;
});
