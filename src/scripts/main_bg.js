import * as THREE from 'three';
import { gsap } from "gsap";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

// init
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

// camera
camera.position.z = 4;
camera.position.y = 4;

// ------ object data ------

// moon
const moonTexture = textureLoader.load("/icrack41-blog/threejs/texture/moon_map.png");
const moonDisplacementMap = textureLoader.load("/icrack41-blog/threejs/texture/moon_displacementMap.png");
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

// particle
const particleCount = 4096;
const particleGeometry = new THREE.BufferGeometry();
const particleMaterial = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    sizeAttenuation: true,
    transparent: true,
    map: new THREE.TextureLoader().load(
        'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/sprites/disc.png'
    ),
});

// clock text
function createTextTexture(text, fontSize = 64, color = '#ffffff') {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    ctx.font = `bold ${fontSize}px Arial`;

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize * 1.2;

    const padding = fontSize * 0.4;
    canvas.width = textWidth + padding * 2;
    canvas.height = textHeight + padding * 2;

    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    return texture;
}

// clock hand
const linePoints = [];
linePoints.push(0, 0, 0);
linePoints.push(0, 3, 0);

const lineMaterial = new LineMaterial({
    color: 0x999999,
    linewidth: 3,
});
const lineGeometry = new LineGeometry();
lineGeometry.setPositions(linePoints);

const secondHand = new Line2(lineGeometry, lineMaterial);
const minuteHand = new Line2(lineGeometry, lineMaterial);
const hourHand = new Line2(lineGeometry, lineMaterial);

// ------ transform data ------

const particleData = {
    position: new Float32Array(particleCount * 3),
    targetPosition: new Float32Array(particleCount * 3),
    color: new Float32Array(particleCount * 3),
    targetColor: new Float32Array(particleCount * 3),
}

const pointData = {
    targetX: 0, targetY: 0, targetZ: 0,
};

const cameraData = {
    targetX: 0, targetY: 0, targetZ: 0,
    targetRotateX: 0, targetRotateY: 0, targetRotateZ: 0
};

let cameraPositionOffsetY = 0;
let cameraRotateOffsetY = 0;

const clockNumData = {
    targetScaleX: 0, targetScaleY: 0, targetScaleZ: 0
}

const text2025Data = {
    targetScaleX: 0, targetScaleY: 0, targetScaleZ: 0
}

// ------ tools ------
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function setParticlePosition(index, x, y, z){
    particleData.targetPosition[index * 3]     = x;
    particleData.targetPosition[index * 3 + 1] = y;
    particleData.targetPosition[index * 3 + 2] = z;
}

function setParticleColor(index, r, g, b){
    particleData.targetColor[index * 3]     = r;
    particleData.targetColor[index * 3 + 1] = g;
    particleData.targetColor[index * 3 + 2] = b;
}

function particlesToPlane(cols, rows, gap) {
    const width = (cols-1) * gap;
    const height = (rows-1) * gap;

    let index = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col*gap - width/2;
            const y = row*gap - height/2;
            const z = 0;

            setParticlePosition(index, x, y, z);
            index++;
            console.log(index);
        }
    }
}

function particlesToCircle(radius) {
    let ring = 4;
    let ringCount = 64;
    let displacementZ = [0, 0.2, 0.95, 0.1, 0, 1, 0.1, 0.2];

    for (let i = 0; i < particleCount; i++) {
        
        const angle = ((i%ringCount) / ringCount) * Math.PI*2;
        const distance = ring*0.05 * radius;

        const x = Math.sin(angle) * distance;
        const y = Math.cos(angle) * distance;

        setParticlePosition(i, x, y, displacementZ[ring-4]);
        if(i > ringCount*2){
            ring += 1;
            ringCount *= 2;
        }
    }
}

function particlesToImage(imgSrc) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgSrc;

    console.log("particlesToImage");

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const w = canvas.width;
        const h = canvas.height;

        console.log("w-"+w);
        console.log("h-"+h);

        let index = 4095;
        for (let y = 0; y < 128; y += 2) {
            for (let x = 0; x < 128; x += 2) {
                const i = (y * w + x) * 4;

                const r = data[i] / 255;
                const g = data[i + 1] / 255;
                const b = data[i + 2] / 255;

                particleData.color[index * 3]     = r;
                particleData.color[index * 3 + 1] = g;
                particleData.color[index * 3 + 2] = b;

                index--;
            }
        }
    };
}

// ------ scene.add ------
// moon
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);
moon.rotation.z += 0.8;

// particle
particleGeometry.setAttribute('position', new THREE.BufferAttribute(particleData.position, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleData.color, 3));

const points = new THREE.Points(particleGeometry, particleMaterial);
scene.add(points);
points.position.z = -6;

// clock number
const clockRadius = 3.2;
const clockNumbers = [];
const romanNum = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI*2;

    const y = Math.cos(angle) * clockRadius;
    const x = Math.sin(angle) * clockRadius;
    const z = 0;

    const spriteMaterial = new THREE.SpriteMaterial({
        map: createTextTexture(romanNum[11-i], 80, '#d0d0d0'),
        transparent: true,
        depthWrite: false,
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(x+7, y+0.5, z-4);

    sprite.visible = false;
    scene.add(sprite);
    clockNumbers.push(sprite);
}

const spriteMaterial = new THREE.SpriteMaterial({
    map: createTextTexture("2‧0‧2‧6", 500, '#020203'),
    transparent: true,
    depthWrite: false,
});

const text2025 = new THREE.Sprite(spriteMaterial);
text2025.position.set(7, 0, -6);

text2025.visible = false;
text2025.scale.x = 20;
text2025.scale.y = 16;
text2025.scale.z = 16;
scene.add(text2025);

// clock hand
secondHand.position.x = 7;
secondHand.position.y = 0.5;
secondHand.position.z = -4;

minuteHand.position.x = 7;
minuteHand.position.y = 0.5;
minuteHand.position.z = -4;

hourHand.position.x = 7;
hourHand.position.y = 0.5;
hourHand.position.z = -4;

minuteHand.rotation.z = 0;
hourHand.rotation.z = 1;

minuteHand.scale.y = 0.8;
hourHand.scale.y = 0.6;

scene.add(secondHand);
scene.add(minuteHand);
scene.add(hourHand);

// ------ set page ------

// mainPage / scrollPage
const mainPage = document.getElementById('mainPage');
const scrollPage = document.getElementById('scrollPage');
mainPage.style.display = "block";
scrollPage.style.display = "none";

const setMainPage = () => {
    mainPage.style.display = "block";
    scrollPage.style.display = "none";

    for (let i = 0; i < particleCount; i++) {
        setParticlePosition(i, (Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100);
        setParticleColor(i, 1, 1, 1);
    }

    cameraData.targetX = 0;
    cameraData.targetY = 4;
    cameraData.targetZ = 4;

    cameraData.targetRotateX = 0;
    cameraData.targetRotateY = 0;
    cameraData.targetRotateZ = 0;

    pointData.targetX = 0;
    pointData.targetY = 0;
    pointData.targetZ = -8;

    clockNumbers.forEach(num => {
        num.visible = false;
    });
    text2025.visible = false;
    moon.visible = true;

    secondHand.visible = false;
    minuteHand.visible = false;
    hourHand.visible = false;
}

const setPage1 = () => {
    for (let i = 0; i < particleCount; i++) {
        setParticlePosition(i, (Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100);
        setParticleColor(i, 1, 1, 1);
    }

    mainPage.style.display = "none";
    scrollPage.style.display = "block";

    cameraData.targetX = 10;
    cameraData.targetY = 0.5;
    cameraData.targetZ = 2;

    cameraData.targetRotateX = 0;
    cameraData.targetRotateY = 1;
    cameraData.targetRotateZ = 0;

    pointData.targetX = 0;
    pointData.targetY = 6;
    pointData.targetZ = -6;

    moon.visible = true;
};

const setPage2 = () => {

    for (let i = 0; i < particleCount; i++) {
        setParticlePosition(i, (Math.random()-0.5)*50, (Math.random()-0.5)*50, (Math.random()-0.5)*50);
        setParticleColor(i, Math.random()/2, Math.random()/2, Math.random()/2);
    }

    cameraData.targetX = 10;
    cameraData.targetY = 5;
    cameraData.targetZ = 0;

    cameraData.targetRotateX = 0;
    cameraData.targetRotateY = -0.4;
    cameraData.targetRotateZ = 0;

    pointData.targetX = 10;
    pointData.targetY = 8;
    pointData.targetZ = -8;

    clockNumData.targetScaleX = 0;
    clockNumData.targetScaleY = 0;
    clockNumData.targetScaleZ = 0;

    text2025Data.targetScaleX = 0;
    text2025Data.targetScaleY = 0;
    text2025Data.targetScaleZ = 0;

    clockNumbers.forEach(num => {
        num.visible = false;
    });
    text2025.visible = false;
    particleMaterial.size = 0.12;

    secondHand.visible = false;
    minuteHand.visible = false;
    hourHand.visible = false;
};

const setPage3 = () => {
    particlesToCircle(10);

    for (let i = 0; i < particleCount; i++) {
        setParticleColor(i, 0.5, 0.75, 0.81);
    }

    cameraData.targetX = 5.5;
    cameraData.targetY = 0.5;
    cameraData.targetZ = 0;

    cameraData.targetRotateX = 0;
    cameraData.targetRotateY = -0.2;
    cameraData.targetRotateZ = 0;

    pointData.targetX = 7;
    pointData.targetY = 0.5;
    pointData.targetZ = -4;

    clockNumData.targetScaleX = 1;
    clockNumData.targetScaleY = 1;
    clockNumData.targetScaleZ = 1;

    text2025Data.targetScaleX = 20;
    text2025Data.targetScaleY = 16;
    text2025Data.targetScaleZ = 16;

    clockNumbers.forEach(num => {
        num.visible = true;
    });
    text2025.visible = true;

    points.rotation.y = 0;
    moon.visible = false;
    particleMaterial.size = 0.04;

    secondHand.visible = true;
    minuteHand.visible = true;
    hourHand.visible = true;
};

const setPage4 = () => {
    particlesToPlane(64, 64, 0.1);
    particlesToImage("icrack41-blog/qr_code.png");

    cameraData.targetX = 7;
    cameraData.targetY = 0.5;
    cameraData.targetZ = 0;

    cameraData.targetRotateX = 0;
    cameraData.targetRotateY = 0;
    cameraData.targetRotateZ = 0;

    pointData.targetX = 7;
    pointData.targetY = 0.5;
    pointData.targetZ = -5;

    clockNumData.targetScaleX = 1;
    clockNumData.targetScaleY = 1;
    clockNumData.targetScaleZ = 1;

    text2025Data.targetScaleX = 20;
    text2025Data.targetScaleY = 16;
    text2025Data.targetScaleZ = 16;

    clockNumbers.forEach(num => {
        num.visible = false;
    });
    text2025.visible = false;

    points.rotation.y = 0;
    moon.visible = false;
    particleMaterial.size = 0.08;

    secondHand.visible = false;
    minuteHand.visible = false;
    hourHand.visible = false;
};

const handGroup = new THREE.Group();
const handGeom = new THREE.BoxGeometry(0.02, 2.5, 0.02);
const handMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const hand = new THREE.Mesh(handGeom, handMat);
hand.position.y = 1.25;
handGroup.add(hand);
scene.add(handGroup);
handGroup.visible = false;

// update view
let currentSection = 0;
let isUpdating = false;

function updateView() {
    if(currentSection === 0){ setMainPage(); }
    else if (currentSection === 1){ setPage1(); }
    else if (currentSection === 2){ setPage2(); } 
    else if (currentSection === 3){ setPage3(); }
    else if (currentSection === 4){ setPage4(); }

    console.log(currentSection);

    isUpdating = true;
    cameraPositionOffsetY = cameraData.targetY;
    cameraRotateOffsetY = cameraData.targetRotateY;

    // particle
    gsap.to(particleData.position, {
        duration: 1.2,
        ease: "power2.inOut",
        endArray: particleData.targetPosition,

        onUpdate: () => {
            particleGeometry.attributes.position.needsUpdate = true;
        },
    });
    gsap.to(particleData.color, {
        duration: 1.2,
        ease: "power2.inOut",
        endArray: particleData.targetColor,

        onUpdate: () => {
            particleGeometry.attributes.color.needsUpdate = true;
        },
    });

    // point
    gsap.to(points.position, {
        x: pointData.targetX,
        y: pointData.targetY,
        z: pointData.targetZ,
        duration: 1.5,
        ease: "power2.inOut"
    });

    // camera
    gsap.to(camera.position, {
        x: cameraData.targetX,
        y: cameraData.targetY,
        z: cameraData.targetZ,
        duration: 1.5,
        ease: "power2.inOut"
    });
    gsap.to(camera.rotation, {
        x: cameraData.targetRotateX,
        y: cameraData.targetRotateY,
        z: cameraData.targetRotateZ,
        duration: 1.5,
        ease: "power2.inOut",

        onComplete: () => {
            isUpdating = false;
        }
    });

    // clock number
    clockNumbers.forEach(num => {
        gsap.to(num.scale, {
            x: clockNumData.targetScaleX,
            y: clockNumData.targetScaleY,
            z: clockNumData.targetScaleZ,
            duration: 2,
            ease: "power2.inOut"
        });
    });
    gsap.to(text2025.scale, {
        x: text2025Data.targetScaleX,
        y: text2025Data.targetScaleY,
        z: text2025Data.targetScaleZ,
        duration: 2,
        ease: "power2.inOut"
    });
}

// click listener
document.getElementById('logo').addEventListener('click', () => {
    currentSection = 1;
    updateView();
});
document.getElementById('back').addEventListener('click', () => {
    currentSection = 0;
    updateView();
});

const lightBulb = document.getElementById('light-bulb');
const lightBulbMask = document.getElementById('light-bulb-mask');

lightBulb.addEventListener('click', () => {
    if(lightOn){
        lightBulbMask.style.background = "radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.92) 10%)";
        lightOn = false;
    }
    else{
        lightBulbMask.style.background = "radial-gradient(rgba(253, 236, 166, 0.2) 0%, rgba(0, 0, 0, 0) 12%)";
        lightOn = true;
    }
});

// scroll listener
let lightOn = false;
const scrollRoot = document.getElementById('scroll-root');
scrollRoot.addEventListener('scroll', () => {
    if(currentSection != 0){
        const index = Math.round(scrollRoot.scrollTop / window.innerHeight) + 1;
        if (index != currentSection) {
            currentSection = index;

            if(currentSection == 2){
                if(!lightOn){
                    lightBulbMask.style.background = "radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.92) 10%)";
                    lightBulb.style.animation = "anim-et-swing 5s ease-in-out";
                }
                lightBulb.style.visibility = "visible";
            }
            else{
                lightBulb.style.animation = "none";
                lightBulb.style.visibility = "hidden";
            }

            updateView();
        }
    }
});

// mouse listener
window.addEventListener('mousemove', (e)=>{
    const x = clamp(e.movementX*0.005, -0.1, 0.1);
    const y = clamp(e.movementY*0.005, -0.2, 0.2);

    cameraRotateOffsetY = x + cameraData.targetRotateY;
    cameraPositionOffsetY = y + cameraData.targetY;
});

// init
updateView();

// window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// anim
function animate(){
    // moon
    moon.rotation.x += 0.0002;
    moon.rotation.y += 0.0002;

    // light
    if (ambientLight.intensity < 1) ambientLight.intensity += 0.01;
    if (directionalLight.position.y < 9) directionalLight.position.y += 0.08;

    // particle
    if(currentSection == 2){
        points.rotation.y += 0.002;
    }

    // clock hand
    secondHand.rotation.z -= 0.002;

    // camera
    if(!isUpdating && currentSection != 0){
        const lerp = 0.05; // 越小越平滑
        camera.rotation.y += (cameraRotateOffsetY-camera.rotation.y)*lerp;
        camera.position.y += (cameraPositionOffsetY-camera.position.y)*lerp;
    }
    
    composer.render();
}
