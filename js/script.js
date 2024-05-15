// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Dynamic Lighting
const dynamicLight = new THREE.PointLight(0xff0000, 2, 50);
dynamicLight.position.set(0, 0, 0);
scene.add(dynamicLight);

// Starry Background
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  opacity: 0.5,
  transparent: true,
  size: 0.5,
});
const starVertices = [];
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  starVertices.push(x, y, z);
}
starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVertices, 3)
);
const stars = new THREE.Points(starGeometry, starMaterial);
stars.renderOrder = 0; // Ensure stars are rendered first
scene.add(stars);

// Nebula (Positioned behind the particles)
const nebulaTexture = new THREE.TextureLoader().load(
  "https://threejs.org/examples/textures/lensflare/lensflare0.png"
);
const nebulaMaterial = new THREE.SpriteMaterial({
  map: nebulaTexture,
  color: 0x4444ff,
  blending: THREE.AdditiveBlending,
});
const nebula = new THREE.Sprite(nebulaMaterial);
nebula.scale.set(50, 50, 1);
nebula.position.set(0, 0, -10); // Placed behind the particles
nebula.renderOrder = 1; // Render nebula after stars
scene.add(nebula);

// Additional Nebula
const nebulaTexture2 = new THREE.TextureLoader().load(
  "https://threejs.org/examples/textures/lensflare/lensflare0.png"
);
const nebulaMaterial2 = new THREE.SpriteMaterial({
  map: nebulaTexture2,
  color: 0xff44ff,
  blending: THREE.AdditiveBlending,
});
const nebula2 = new THREE.Sprite(nebulaMaterial2);
nebula2.scale.set(30, 30, 1);
nebula2.position.set(30, 0, -20); // Placed behind the particles
nebula2.renderOrder = 1; // Render nebula after stars
scene.add(nebula2);

// Planets
const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
const planetMaterial = new THREE.MeshPhongMaterial({ color: 0x3333ff });
const planet1 = new THREE.Mesh(planetGeometry, planetMaterial);
planet1.position.set(5, 0, 0);
scene.add(planet1);

const planet2 = new THREE.Mesh(planetGeometry, planetMaterial);
planet2.position.set(-5, 0, 0);
scene.add(planet2);

// Additional Planets
const planet3 = new THREE.Mesh(planetGeometry, planetMaterial);
planet3.position.set(0, 5, 0);
scene.add(planet3);

const planet4 = new THREE.Mesh(planetGeometry, planetMaterial);
planet4.position.set(0, -5, 0);
scene.add(planet4);

// Planet Particle Effect
const particleGeometry = new THREE.BufferGeometry();
const particleMaterial = new THREE.PointsMaterial({
  color: 0x00ffff,
  size: 0.1,
  transparent: true,
  opacity: 0.7,
});
const particleVertices = [];
for (let i = 0; i < 500; i++) {
  const x = (Math.random() - 0.5) * 2;
  const y = (Math.random() - 0.5) * 2;
  const z = (Math.random() - 0.5) * 2;
  particleVertices.push(x, y, z);
}
particleGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(particleVertices, 3)
);
const particles = new THREE.Points(particleGeometry, particleMaterial);
particles.renderOrder = 2; // Render particles after nebula
planet1.add(particles);

// Load Font and Add Text
const loader = new THREE.FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  function (font) {
    const textGeometry = new THREE.TextGeometry(">> Nesar A. Naeem", {
      font: font,
      size: 1,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-6, 8, 0); // Align text with planets and nebula
    textMesh.renderOrder = 3; // Render text last
    scene.add(textMesh);
  }
);

// Meteor Shower
const meteorGeometry = new THREE.BufferGeometry();
const meteorMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 });
const meteorVertices = [];
for (let i = 0; i < 200; i++) {
  const x = (Math.random() - 0.5) * 100;
  const y = (Math.random() - 0.5) * 100;
  const z = (Math.random() - 0.5) * 100;
  meteorVertices.push(x, y, z);
}
meteorGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(meteorVertices, 3)
);
const meteors = new THREE.Points(meteorGeometry, meteorMaterial);
meteors.renderOrder = 4; // Ensure meteors are rendered on top of everything else
scene.add(meteors);

// Satellite
const satelliteGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const satelliteMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
satellite.position.set(0, 10, 0);
satellite.renderOrder = 5; // Ensure satellite is rendered last
scene.add(satellite);

let satelliteVisible = false;
let satelliteTimer = 0;

// Rockets
const rockets = [];
const rocketGeometry = new THREE.CylinderGeometry(0.1, 0.3, 1, 32);
const rocketMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

for (let i = 0; i < 3; i++) {
  const rocket = new THREE.Mesh(rocketGeometry, rocketMaterial);
  rocket.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 20 + 10, // Initial position at different heights
    (Math.random() - 0.5) * 10
  );
  rocket.rotation.x = Math.PI / 2;
  rocket.renderOrder = 6; // Render rockets last
  rockets.push(rocket);
  scene.add(rocket);
}

// Comets
const comets = [];
const cometGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const cometMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });

for (let i = 0; i < 5; i++) {
  const comet = new THREE.Mesh(cometGeometry, cometMaterial);
  comet.position.set(
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100
  );
  comet.renderOrder = 7; // Render comets last
  comets.push(comet);
  scene.add(comet);
}

// Asteroids
const asteroids = [];
const asteroidGeometry = new THREE.DodecahedronGeometry(0.2, 1);
const asteroidMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });

for (let i = 0; i < 50; i++) {
  const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
  asteroid.position.set(
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100
  );
  asteroid.renderOrder = 8; // Render asteroids last
  asteroids.push(asteroid);
  scene.add(asteroid);
}

// Spaceships
const spaceships = [];
const spaceshipGeometry = new THREE.ConeGeometry(0.2, 1, 32);
const spaceshipMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

for (let i = 0; i < 3; i++) {
  const spaceship = new THREE.Mesh(spaceshipGeometry, spaceshipMaterial);
  spaceship.position.set(
    (Math.random() - 0.5) * 50,
    (Math.random() - 0.5) * 50,
    (Math.random() - 0.5) * 50
  );
  spaceship.rotation.x = Math.PI / 2;
  spaceship.renderOrder = 9; // Render spaceships last
  spaceships.push(spaceship);
  scene.add(spaceship);
}

// Planetary Rings
const ringGeometry = new THREE.RingGeometry(1.2, 1.5, 32);
const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});

const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
ring1.position.set(5, 0, 0);
ring1.rotation.x = Math.PI / 2;
planet1.add(ring1);

const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
ring2.position.set(-5, 0, 0);
ring2.rotation.x = Math.PI / 2;
planet2.add(ring2);

// Galaxy
const galaxyGeometry = new THREE.BufferGeometry();
const galaxyMaterial = new THREE.PointsMaterial({ color: 0xff00ff, size: 0.5 });
const galaxyVertices = [];
for (let i = 0; i < 5000; i++) {
  const x = (Math.random() - 0.5) * 500;
  const y = (Math.random() - 0.5) * 500;
  const z = (Math.random() - 0.5) * 500;
  galaxyVertices.push(x, y, z);
}
galaxyGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(galaxyVertices, 3)
);
const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
galaxy.renderOrder = 10; // Ensure galaxy is rendered last
scene.add(galaxy);

// Animation
function animate() {
  requestAnimationFrame(animate);

  // Rotate planets
  planet1.rotation.y += 0.01;
  planet2.rotation.y += 0.01;

  // Move stars
  stars.rotation.x += 0.001;
  stars.rotation.y += 0.001;

  // Move meteors
  for (let i = 0; i < meteorVertices.length; i += 3) {
    meteorVertices[i] -= 0.1;
    if (meteorVertices[i] < -50) {
      meteorVertices[i] = 50;
    }
  }
  meteorGeometry.attributes.position.needsUpdate = true;

  // Satellite visibility toggle
  satelliteTimer++;
  if (satelliteTimer > 500) {
    satelliteVisible = !satelliteVisible;
    satelliteTimer = 0;
  }
  satellite.visible = satelliteVisible;

  // Move satellite
  satellite.position.x = 10 * Math.sin(Date.now() * 0.001);
  satellite.position.z = 10 * Math.cos(Date.now() * 0.001);
  satellite.rotation.y += 0.01;

  // Move rockets
  rockets.forEach((rocket) => {
    rocket.position.y -= Math.random() * 0.2 + 0.1; // Falling speed variation
    if (rocket.position.y < -10) {
      rocket.position.y = (Math.random() - 0.5) * 20 + 10;
      rocket.position.x = (Math.random() - 0.5) * 10;
      rocket.position.z = (Math.random() - 0.5) * 10;
    }
    rocket.rotation.y += 0.1;
  });

  // Move comets
  comets.forEach((comet) => {
    comet.position.x -= Math.random() * 0.5 + 0.1; // Comet speed variation
    comet.position.y -= Math.random() * 0.5 + 0.1;
    comet.position.z -= Math.random() * 0.5 + 0.1;
    if (
      comet.position.x < -50 ||
      comet.position.y < -50 ||
      comet.position.z < -50
    ) {
      comet.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
    }
  });

  // Rotate asteroids
  asteroids.forEach((asteroid) => {
    asteroid.rotation.x += 0.01;
    asteroid.rotation.y += 0.01;
    asteroid.rotation.z += 0.01;
  });

  // Move spaceships
  spaceships.forEach((spaceship) => {
    spaceship.position.x += Math.random() * 0.2 - 0.1;
    spaceship.position.y += Math.random() * 0.2 - 0.1;
    spaceship.position.z += Math.random() * 0.2 - 0.1;
    spaceship.rotation.y += 0.02;
    spaceship.rotation.z += 0.02;
  });

  // Dynamic lighting effect
  dynamicLight.position.x = 5 * Math.sin(Date.now() * 0.002);
  dynamicLight.position.z = 5 * Math.cos(Date.now() * 0.002);

  // Update controls
  controls.update();

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
