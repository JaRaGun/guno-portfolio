import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
const gui = new dat.GUI();

const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();
const camera = new THREE.
  PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

const world = {
  plane: {
    width: 400,
    height: 400,
    widthSegment: 19,
    heightSegment: 19
  }
}

const planeGeometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegment, world.plane.heightSegment);
const planeMaterial = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, flatShading: true, vertexColors: true })
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);


gui.add(world.plane, 'width', 1, 500).onChange(generatePlane)
gui.add(world.plane, 'height', 1, 500).onChange(generatePlane)
gui.add(world.plane, 'widthSegment', 1, 50).onChange(generatePlane)
gui.add(world.plane, 'heightSegment', 1, 50).onChange(generatePlane)


function generatePlane() {
  planeMesh.geometry.dispose()
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegment,
    world.plane.heightSegment);

  const { array } = planeMesh.geometry.attributes.position;
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random() - 0.5;
  }
  const colors = [];

  for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
    colors.push(0, 0.19, 0.4);
  }

  planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))

}
const colors = [];

for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
  colors.push(0, 0.19, 0.4);
}

planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight);

scene.add(planeMesh);

new OrbitControls(camera, renderer.domElement)
camera.position.z = 50;

// vertice position randomization 
const { array } = planeMesh.geometry.attributes.position;

const randomValues = []
for (let i = 0; i < array.length; i++) {

  if(i % 3 === 0){
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];4
    array[i] = x + Math.random() - 0.5;
    array[i + 1] = y + Math.random() - 0.5;
    array[i + 2] = z + Math.random();
  }


  randomValues.push(Math.random() - 0.5)
}


planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array;
planeMesh.geometry.attributes.position.randomValues = randomValues

const mouse = {
  x: undefined,
  y: undefined
}

let frame = 0
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera)
  raycaster.setFromCamera(mouse, camera);
  frame += 0.01
  const {array, originalPosition} = planeMesh.geometry.attributes.position;

  for (let i = 0; i < array.length; i+= 3) {
    array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.003

    array[i + 1] = originalPosition[i + 1] + Math.sin(frame + randomValues[i + 1]) * 0.003
    
  }
  planeMesh.geometry.attributes.position.needsUpdate = true
  addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / innerHeight) * 2 + 1;
    console.log(mouse);
  })
  
  const intersects = raycaster.intersectObject(planeMesh)

  if (intersects.length > 0) {
    const { color } = intersects[0].object.geometry.attributes

    // Vertices 1
    color.setX(intersects[0].face.a, 0.1);
    color.setY(intersects[0].face.a, 0.5);
    color.setZ(intersects[0].face.a, 1);

    // Vertices 2
    color.setX(intersects[0].face.b, 0.1);
    color.setY(intersects[0].face.b, 0.5);
    color.setZ(intersects[0].face.b, 1);

    // Vertices 3 
    color.setX(intersects[0].face.c, 0.1);
    color.setY(intersects[0].face.c, 0.5);
    color.setZ(intersects[0].face.c, 1);

    intersects[0].object.geometry.attributes.color.needsUpdate = true;

    const initialColor = {
      r: 0,
      g: 0.19,
      b: 0.4
    }

    const hoverColor = {
      r: 0.1,
      g: .5,
      b: 1
    }

    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      onUpdate: () => {
        // Vertices 1
        color.setX(intersects[0].face.a, hoverColor.r);
        color.setY(intersects[0].face.a, hoverColor.g);
        color.setZ(intersects[0].face.a, hoverColor.b);

        // Vertices 2
        color.setX(intersects[0].face.b, hoverColor.r);
        color.setY(intersects[0].face.b, hoverColor.g);
        color.setZ(intersects[0].face.b, hoverColor.b);

        // Vertices 3 
        color.setX(intersects[0].face.c, hoverColor.r);
        color.setY(intersects[0].face.c, hoverColor.g);
        color.setZ(intersects[0].face.c, hoverColor.b);
        color.needsUpdate = true;
      }
    })
  }
}




animate();
