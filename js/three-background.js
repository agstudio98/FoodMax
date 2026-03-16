// ========================================
// FoodMax - Three.js 3D Background
// ========================================

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true 
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create canvas container
const canvasContainer = document.getElementById('three-canvas');
if (canvasContainer) {
    canvasContainer.appendChild(renderer.domElement);
}

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff8f00, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x1a237e, 0.8, 100);
pointLight2.position.set(-10, -10, -10);
scene.add(pointLight2);

// 3D Food Objects
const foodObjects = [];

// Create 3D burger
function createBurger() {
    const group = new THREE.Group();
    
    // Top bun
    const topBunGeom = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const bunMaterial = new THREE.MeshPhongMaterial({ color: 0xf4a460 });
    const topBun = new THREE.Mesh(topBunGeom, bunMaterial);
    topBun.position.y = 0.5;
    group.add(topBun);
    
    // Lettuce
    const lettuceGeom = new THREE.TorusGeometry(0.45, 0.08, 8, 32);
    const lettuceMaterial = new THREE.MeshPhongMaterial({ color: 0x228b22 });
    const lettuce = new THREE.Mesh(lettuceGeom, lettuceMaterial);
    lettuce.rotation.x = Math.PI / 2;
    lettuce.position.y = 0.3;
    group.add(lettuce);
    
    // Patty
    const pattyGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.15, 32);
    const pattyMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
    const patty = new THREE.Mesh(pattyGeom, pattyMaterial);
    patty.position.y = 0.15;
    group.add(patty);
    
    // Cheese
    const cheeseGeom = new THREE.BoxGeometry(0.7, 0.03, 0.7);
    const cheeseMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 });
    const cheese = new THREE.Mesh(cheeseGeom, cheeseMaterial);
    cheese.position.y = 0.05;
    group.add(cheese);
    
    // Bottom bun
    const bottomBunGeom = new THREE.CylinderGeometry(0.5, 0.45, 0.2, 32);
    const bottomBun = new THREE.Mesh(bottomBunGeom, bunMaterial);
    bottomBun.position.y = -0.1;
    group.add(bottomBun);
    
    return group;
}

// Create 3D pizza slice
function createPizza() {
    const group = new THREE.Group();
    
    // Crust
    const crustGeom = new THREE.CylinderGeometry(0.6, 0.55, 0.08, 6);
    const crustMaterial = new THREE.MeshPhongMaterial({ color: 0xdeb887 });
    const crust = new THREE.Mesh(crustGeom, crustMaterial);
    group.add(crust);
    
    // Cheese layer
    const cheeseGeom = new THREE.CylinderGeometry(0.55, 0.5, 0.04, 6);
    const cheeseMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 });
    const cheese = new THREE.Mesh(cheeseGeom, cheeseMaterial);
    cheese.position.y = 0.04;
    group.add(cheese);
    
    // Pepperoni
    for (let i = 0; i < 3; i++) {
        const pepperoniGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 16);
        const pepperoniMaterial = new THREE.MeshPhongMaterial({ color: 0xcc0000 });
        const pepperoni = new THREE.Mesh(pepperoniGeom, pepperoniMaterial);
        pepperoni.position.set(
            (Math.random() - 0.5) * 0.4,
            0.07,
            (Math.random() - 0.5) * 0.4
        );
        group.add(pepperoni);
    }
    
    return group;
}

// Create 3D hot dog
function createHotDog() {
    const group = new THREE.Group();
    
    // Bun
    const bunGeom = new THREE.CapsuleGeometry(0.2, 0.8, 8, 16);
    const bunMaterial = new THREE.MeshPhongMaterial({ color: 0xf4a460 });
    const bun = new THREE.Mesh(bunGeom, bunMaterial);
    bun.rotation.z = Math.PI / 2;
    group.add(bun);
    
    // Sausage
    const sausageGeom = new THREE.CapsuleGeometry(0.12, 0.9, 8, 16);
    const sausageMaterial = new THREE.MeshPhongMaterial({ color: 0xcd5c5c });
    const sausage = new THREE.Mesh(sausageGeom, sausageMaterial);
    sausage.rotation.z = Math.PI / 2;
    sausage.position.y = 0.02;
    group.add(sausage);
    
    // Mustard
    const mustardGeom = new THREE.TorusGeometry(0.15, 0.03, 8, 32, Math.PI);
    const mustardMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 });
    const mustard = new THREE.Mesh(mustardGeom, mustardMaterial);
    mustard.rotation.x = Math.PI / 2;
    mustard.rotation.z = Math.PI / 2;
    mustard.position.y = 0.12;
    group.add(mustard);
    
    return group;
}

// Create 3D drink cup
function createDrink() {
    const group = new THREE.Group();
    
    // Cup
    const cupGeom = new THREE.CylinderGeometry(0.25, 0.2, 0.6, 32);
    const cupMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff0000,
        transparent: true,
        opacity: 0.8
    });
    const cup = new THREE.Mesh(cupGeom, cupMaterial);
    group.add(cup);
    
    // Lid
    const lidGeom = new THREE.CylinderGeometry(0.26, 0.26, 0.05, 32);
    const lidMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const lid = new THREE.Mesh(lidGeom, lidMaterial);
    lid.position.y = 0.32;
    group.add(lid);
    
    // Straw
    const strawGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
    const strawMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const straw = new THREE.Mesh(strawGeom, strawMaterial);
    straw.position.set(0.15, 0.5, 0);
    straw.rotation.z = 0.3;
    group.add(straw);
    
    return group;
}

// Create 3D fries
function createFries() {
    const group = new THREE.Group();
    
    // Container
    const containerGeom = new THREE.ConeGeometry(0.3, 0.5, 4);
    const containerMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const container = new THREE.Mesh(containerGeom, containerMaterial);
    container.rotation.x = Math.PI;
    group.add(container);
    
    // Fries
    for (let i = 0; i < 8; i++) {
        const fryGeom = new THREE.BoxGeometry(0.04, 0.3, 0.04);
        const fryMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 });
        const fry = new THREE.Mesh(fryGeom, fryMaterial);
        
        const angle = (i / 8) * Math.PI * 2;
        fry.position.set(
            Math.cos(angle) * 0.15,
            0.2,
            Math.sin(angle) * 0.15
        );
        fry.rotation.x = (Math.random() - 0.5) * 0.3;
        fry.rotation.z = (Math.random() - 0.5) * 0.3;
        
        group.add(fry);
    }
    
    return group;
}

// Create 3D chicken leg
function createChickenLeg() {
    const group = new THREE.Group();
    
    // Drumstick
    const drumstickGeom = new THREE.CapsuleGeometry(0.12, 0.4, 8, 16);
    const drumstickMaterial = new THREE.MeshPhongMaterial({ color: 0xdaa520 });
    const drumstick = new THREE.Mesh(drumstickGeom, drumstickMaterial);
    drumstick.rotation.z = Math.PI / 4;
    group.add(drumstick);
    
    // Fried coating
    const coatingGeom = new THREE.SphereGeometry(0.2, 16, 16);
    const coatingMaterial = new THREE.MeshPhongMaterial({ color: 0xd2691e });
    const coating = new THREE.Mesh(coatingGeom, coatingMaterial);
    coating.position.set(0.15, 0.15, 0);
    group.add(coating);
    
    return group;
}

// Add objects to scene
const burger = createBurger();
burger.position.set(-3, 1, -5);
burger.scale.set(1.2, 1.2, 1.2);
scene.add(burger);
foodObjects.push({ mesh: burger, speed: 0.003, rotSpeed: 0.01 });

const pizza = createPizza();
pizza.position.set(4, 0, -6);
pizza.scale.set(1.3, 1.3, 1.3);
scene.add(pizza);
foodObjects.push({ mesh: pizza, speed: 0.002, rotSpeed: 0.008 });

const hotdog = createHotDog();
hotdog.position.set(-4, -1, -7);
hotdog.scale.set(1.1, 1.1, 1.1);
scene.add(hotdog);
foodObjects.push({ mesh: hotdog, speed: 0.0025, rotSpeed: 0.012 });

const drink = createDrink();
drink.position.set(3, 1.5, -8);
drink.scale.set(1.4, 1.4, 1.4);
scene.add(drink);
foodObjects.push({ mesh: drink, speed: 0.0018, rotSpeed: 0.006 });

const fries = createFries();
fries.position.set(0, -2, -6);
fries.scale.set(1.2, 1.2, 1.2);
scene.add(fries);
foodObjects.push({ mesh: fries, speed: 0.0022, rotSpeed: 0.009 });

const chickenLeg = createChickenLeg();
chickenLeg.position.set(-2, 2, -7);
chickenLeg.scale.set(1.3, 1.3, 1.3);
scene.add(chickenLeg);
foodObjects.push({ mesh: chickenLeg, speed: 0.0015, rotSpeed: 0.007 });

// Camera position
camera.position.z = 5;

// Mouse interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Animate each food object
    foodObjects.forEach((obj, index) => {
        const time = Date.now() * 0.001;
        
        // Floating motion
        obj.mesh.position.y += Math.sin(time + index) * obj.speed;
        obj.mesh.position.x += Math.cos(time * 0.5 + index) * 0.002;
        
        // Rotation
        obj.mesh.rotation.y += obj.rotSpeed;
        obj.mesh.rotation.x += obj.rotSpeed * 0.5;
    });
    
    // Mouse parallax effect
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();

// Export for use in other modules
export { scene, camera, renderer };

