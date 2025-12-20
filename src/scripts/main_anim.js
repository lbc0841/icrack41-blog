import * as THREE from 'three';
import { gsap } from "gsap";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const textureLoader = new THREE.TextureLoader();

// light
const ambientLight = new THREE.AmbientLight(0x372e31);
ambientLight.intensity = 0.2;
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xc0c0c0, 10);
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

const ssaoPass = new SSAOPass(scene, camera);
ssaoPass.radius = 10;
ssaoPass.aoClamp = 1;
ssaoPass.lunInfluence = 0.6;

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), // bloom
    2, // strength
    0.4, // radius
    0.85 // threshold
);

composer.addPass(renderPass);
composer.addPass(ssaoPass);
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
moon.rotation.z += 0.8;

// star
const starGeometry = new THREE.BufferGeometry();
const starCount = 500; // 星星數量
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 500; // 隨機位置範圍（立方體分佈）
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

const cameraPosition = [
    new THREE.Vector3(0, 4, 4),
    new THREE.Vector3(10, 0.5, 2),
];

const cameraRotation = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 1, 0),
];

let useAltView = true;

const pg1 = document.getElementById('pg1');
const pg2 = document.getElementById('pg2');
pg1.style.display = "block";
pg2.style.display = "none";

document.getElementById('logo').addEventListener('click', () => {
    pg1.style.display = "none";
    pg2.style.display = "block";
    
    // gsap: smooth scroll
    const targetPos = cameraPosition[1];
    gsap.to(camera.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.5,
        ease: "power2.inOut"
    });

    const targetRot = cameraRotation[1];
    gsap.to(camera.rotation, {
        x: targetRot.x,
        y: targetRot.y,
        z: targetRot.z,
        duration: 1.5,
        ease: "power2.inOut"
    });
});

document.getElementById('back').addEventListener('click', () => {
    pg1.style.display = "block";
    pg2.style.display = "none";

    // gsap: smooth scroll
    const targetPos = cameraPosition[0];
    gsap.to(camera.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.5,
        ease: "power2.inOut"
    });

    const targetRot = cameraRotation[0];
    gsap.to(camera.rotation, {
        x: targetRot.x,
        y: targetRot.y,
        z: targetRot.z,
        duration: 1.5,
        ease: "power2.inOut"
    });
});

// anim
function animate(){
    moon.rotation.x += 0.0002;
    moon.rotation.y += 0.0002;
    if (ambientLight.intensity < 1) ambientLight.intensity += 0.01;
    if (directionalLight.position.y < 9) directionalLight.position.y += 0.08;

    composer.render();
}
