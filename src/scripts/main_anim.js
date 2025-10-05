import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const textureLoader = new THREE.TextureLoader();

// light
const ambientLight = new THREE.AmbientLight(0x372e31);
ambientLight.intensity = 0.2;
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xc0c0c0, 20);
directionalLight.position.set(0, 6, -20);
scene.add(directionalLight);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// composer
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), // bloom
    2, // strength
    0.4, // radius
    0.85 // threshold
);
composer.addPass(bloomPass);

// moon
const moonTexture = textureLoader.load("/icrack41-blog/threejs/texture/moon_map.png");
const moonDisplacementMap = textureLoader.load("/icrack41-blog/threejs/texture/moon_displacementMap.png");
const moonNormalMap = textureLoader.load("/icrack41-blog/threejs/texture/moon_normalMap.png");

const moonGeometry = new THREE.SphereGeometry(5, 256, 256);
const moonMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: moonTexture,
    displacementMap: moonDisplacementMap,
    displacementScale: 0.06,
    bumpMap: moonDisplacementMap,
    bumpScale: 2,
    aoMap: moonTexture,
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);
moon.rotation.z += 1.5;

// sun
const sunGeometry = new THREE.SphereGeometry(5, 64, 64);
const sunMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: 0xa8908a,
    emissiveIntensity: 4,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.y = 16.2;
sun.position.z = -50;
sun.scale.x = 2;
scene.add(sun);

// star
const starGeometry = new THREE.BufferGeometry();
const starCount = 1000; // 星星數量
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2000; // 隨機位置範圍（立方體分佈）
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.7,      // 星點大小
    sizeAttenuation: true, // 隨距離縮小
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// camera
camera.position.z = 4;
camera.position.y = 4;

// anim
function animate(){
    // requestAnimationFrame(animate);
    // moon.rotation.x += 0.0005;
    if (ambientLight.intensity < 1) ambientLight.intensity += 0.01;

    if (directionalLight.position.y < 8) directionalLight.position.y += 0.08;

    if (sun.material.emissiveIntensity < 5) sun.material.emissiveIntensity += 0.1;
    if (sun.position.y < 9.5) sun.position.y += 0.01;

    composer.render();
}
