import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';
import { SpotLight } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 400 });

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('ambientLight intensity');

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001).name('directionalLight intensity');
gui.add(directionalLight.position, 'x').min(-10).max(10).step(0.001).name('directionalLight position x');
gui.add(directionalLight.position, 'y').min(-10).max(10).step(0.001).name('directionalLight position y');
gui.add(directionalLight.position, 'z').min(-10).max(10).step(0.001).name('directionalLight position z');

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);
gui.add(hemisphereLight, 'intensity').min(0).max(1).step(0.001).name('hemisphereLight intensity');

const pointLight = new THREE.PointLight(0xff9000, 0.5, 5);
pointLight.position.x = -3;
scene.add(pointLight);
gui.add(pointLight, 'intensity').min(0).max(1).step(0.001).name('pointLight intensity');
gui.add(pointLight.position, 'x').min(-10).max(10).step(0.001).name('pointLight position x');
gui.add(pointLight.position, 'y').min(-10).max(10).step(0.001).name('pointLight position y');
gui.add(pointLight.position, 'z').min(-10).max(10).step(0.001).name('pointLight position z');
gui.add(pointLight, 'distance').min(0).max(10).step(0.001).name('pointLight distance');

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);
gui.add(rectAreaLight, 'intensity').min(0).max(10).step(0.001).name('rectAreaLight intensity');
gui.add(rectAreaLight, 'width').min(0).max(10).step(0.001).name('rectAreaLight width');
gui.add(rectAreaLight, 'height').min(0).max(10).step(0.001).name('rectAreaLight height');

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 7, Math.PI * 0.04, 0.25, 1);
spotLight.position.set(0, 2, 3);
spotLight.target.position.x = -0.5;
scene.add(spotLight);
scene.add(spotLight.target);
gui.add(spotLight, 'intensity').min(0).max(1).step(0.001).name('spotLight intensity');
gui.add(spotLight, 'penumbra').min(0).max(1).step(0.001).name('spotLight penumbra');

// Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
window.requestAnimationFrame(() => {
  spotLightHelper.update();
});

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;
gui.add(material, 'roughness').min(0).max(1).step(0.001);

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();