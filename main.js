import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { PointLightHelper } from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { toTransparent, addWireframe } from './utility';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


const gltfLoader = new GLTFLoader()

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas");

// Scene 
const scene = new THREE.Scene()

let layer = 0;
let mixer = [];
let clips = [];
let gltfObj;
let num_layer = 6;
// poly_earth
gltfLoader.load('lowpoly_earth.glb', (gltf) => {
  gltfObj = gltf;
  gltf.scene.scale.set(0.1, 0.1, 0.1)
  gltf.scene.rotation.set(0, 6, 0)
  // gltf.scene.layers.set(0);
  scene.add(gltf.scene)
  console.log(gltf.scene)
  // gltf.scene.children.forEach((obj) => scene.add(obj))
  mixer[0] = new THREE.AnimationMixer(gltf.scene)
  clips[0] = gltf.animations;
  
  // init default animation
  clips[layer].forEach( function(clip) {
    mixer[layer].clipAction(clip).play();
  });

  create3DText("Earth", 0);
  scene.background.setHex(layer_color[layer]);
  // sateliteAnimation
  // const clip = THREE.AnimationClip.findByNmae(clips, )
  //const action = mixer.clipAction(clips)
  //action.play();
  // scene.add(gltf.cameras[0])
  //camera.position.copy(gltf.cameras[0].parent.position)
  //camera.quaternion.copy(gltf.cameras[0].parent.quaternion)
  //camera.scale.compy(gltf.cameras[0].parent.scale)
  //scene.add(camera)

  // animation 
  let sate_cover = scene.getObjectByName("Satelite_cube");
  let cloud_cover = scene.getObjectByName("Cloud_sphere");
  // toTransparent(sate_cover);
  toTransparent(cloud_cover);
  let satelite = scene.getObjectByName("Satelite");
  // satelite.layers.set(2);
  let cloud = scene.getObjectByName("cloud");
  let earth = scene.getObjectByName("Earth");
  // console.log(cloud.geometry.boundingSphere);
  // controls.target = new THREE.Vector3(...cloud.geometry.boundingSphere.center);
  // cloud.remove(cloud_cover
  // cloud.layers.set(3);
  // addWireframe(satelite);
  // addWireframe(cloud);
  // add focus position to userData
  cloud.userData.posi = [-0.16, 0.1, 0.2];
  cloud.userData.cam_posi = [0, 0, 0.2]
  satelite.userData.posi = [0, 0.25, -0.13];
  satelite.userData.cam_posi = [0, 0, 0.3]
  satelite.userData.angle = Math.PI*4/8;
  earth.userData.posi = [0, 0, 0];
  earth.userData.cam_posi = [0, 0, 1];

if (mixer[0]){
  //earth = scene.getObjectByName("Scene").getObjectByName("Earth").getObjectByName('ICO球')
  //console.log(earth)
  //earth.addEventListener('click', () => console.log('earth clicked'))
  // let cloud = scene.getObjectByName("Scene").getObjectByName("cloud001")
  //console.log(cloud)

  // cloud.geometry.computeFaceNormals()
  // satelite.addEventListener('click', () => console.log("satelite clicked"))
}


  // setting first position;
  let target = {x: 0, y: -0.3, z:0};
  gltf.scene.position.set(0, -0.3, 0);
  canvas.addEventListener("click", function(event) {
    event.stopPropagation();
    console.log("clicked")
    console.log(controls);
    movePosi(gltf.scene, target );
            // camera.updateProjectionMatrix()
    console.log("remove evnet listener and")
    console.log("add onclick")
    canvas.addEventListener('click', onClick);
  }, { once: true})
  

}, (xhr) => {
  console.log( (xhr.loaded / xhr.total * 100) + '% loaded');
}, (error) => {
  console.log('An error happned');
})

gltfLoader.load('lowpoly_sun.glb', (gltf) => {
  let scale = 0.5;
  gltf.scene.scale.set(scale, scale, scale)

  movePosi(gltf.scene, {x: 0, y: -0.4, z:0});
  // gltf.scene.layers.set(1);
  gltf.scene.traverse(function(mesh) {mesh.layers.set(1)});
  console.log(gltf.scene.layers)
  scene.add(gltf.scene);
  create3DText('Sun', 1);

  // gltf.scene.animations
  mixer[1] = new THREE.AnimationMixer(gltf.scene)
  clips[1] = gltf.animations;
}, (xhr) => {
  console.log( (xhr.loaded / xhr.total * 100) + "% loaded");
}, (error) => {
  console.log("An error happedn");
})

gltfLoader.load('lowpoly_moon.glb', (gltf) => {
  let scale = 0.25;
  gltf.scene.scale.set(scale, scale, scale)

  // gltf.scene.layers.set(1);
  gltf.scene.traverse(function(mesh) {mesh.layers.set(2)});
  console.log(gltf.scene.layers)
  scene.add(gltf.scene);
  movePosi(gltf.scene, {x: 0, y: -0.25, z:0});
  create3DText('Moon', 2);

  mixer[2] = new THREE.AnimationMixer(gltf.scene);
  clips[2] = gltf.animations;
}, (xhr) => {
  console.log( (xhr.loaded / xhr.total * 100) + "% loaded");
}, (error) => {
  console.log("An error happedn");
})

gltfLoader.load('lowpoly_saturn.glb', (gltf) => {
  let scale = 0.3;
  gltf.scene.scale.set(scale, scale, scale)

  // gltf.scene.layers.set(1);
  gltf.scene.traverse(function(mesh) {mesh.layers.set(3)});
  console.log(gltf.scene.layers)
  movePosi(gltf.scene, {x: 0, y: -0.2, z:0});
  gltf.scene.rotation.set(3, 0, 0)
  scene.add(gltf.scene);

  create3DText("Saturn", 3);

  mixer[3] = new THREE.AnimationMixer(gltf.scene);
  clips[3] = gltf.animations;
}, (xhr) => {
  console.log( (xhr.loaded / xhr.total * 100) + "% loaded");
}, (error) => {
  console.log("An error happedn");
})

gltfLoader.load('lowpoly_marz.glb', (gltf) => {
  let scale = 0.3;
  gltf.scene.scale.set(scale, scale, scale)

  // gltf.scene.layers.set(1);
  gltf.scene.traverse(function(mesh) {mesh.layers.set(4)});
  console.log(gltf.scene.layers)
  movePosi(gltf.scene, {x: 0, y: -0.3, z:0});
  gltf.scene.rotation.set(-2, 4, -2)
  scene.add(gltf.scene);

  create3DText("Marz", 4);

  mixer[4] = new THREE.AnimationMixer(gltf.scene);
  clips[4] = gltf.animations;
}, (xhr) => {
  console.log( (xhr.loaded / xhr.total * 100) + "% loaded");
}, (error) => {
  console.log("An error happedn");
})

gltfLoader.load('lowpoly_jupter.glb', (gltf) => {
  let scale = 0.5;
  gltf.scene.scale.set(scale, scale, scale)

  // gltf.scene.layers.set(1);
  gltf.scene.traverse(function(mesh) {mesh.layers.set(5)});
  console.log(gltf.scene.layers)
  movePosi(gltf.scene, {x: 0, y: -0.3, z:0});
  gltf.scene.rotation.set(-2, 4, -2)
  scene.add(gltf.scene);

  create3DText("Jupiter", 5);

  mixer[5] = new THREE.AnimationMixer(gltf.scene);
  clips[5] = gltf.animations;
}, (xhr) => {
  console.log( (xhr.loaded / xhr.total * 100) + "% loaded");
}, (error) => {
  console.log("An error happedn");
})

gltfLoader.load('arrows.glb', (gltf) => {
  let scale = 0.05;
  gltf.scene.scale.set(scale, scale, scale)

  // gltf.scene.layers.set(1);
  gltf.scene.traverse(function(mesh) {mesh.layers.enableAll()});
  console.log('arrows', gltf.scene);
  movePosi(gltf.scene, {x: 0, y: -0.3, z:0});
  let right_arrow = gltf.scene.getObjectByName('right');
  right_arrow.name = 'right_arrow';
  right_arrow.position.set(15, 10, 0);
  right_arrow.rotation.set(1, 0, -1.2);
  let left_arrow = gltf.scene.getObjectByName('left');
  left_arrow.name = 'left_arrow';
  left_arrow.position.set(-15, 10, 0);
  left_arrow.rotation.set(-1, 0, 1.2);
  scene.add(gltf.scene);

  create3DText("Jupiter", 5);

  mixer[5] = new THREE.AnimationMixer(gltf.scene);
  clips[5] = gltf.animations;
}, (xhr) => {
  console.log( (xhr.loaded / xhr.total * 100) + "% loaded");
}, (error) => {
  console.log("An error happedn");
})

/**
 * 3DText
 */

const loader = new FontLoader();

let layer_color =  [0x3b9fb2, 0xcc7e19, 0xd6c05c, 0xab6654, 0xdc5b66, 0xd35920];

function create3DText(text, text_layer) {
  loader.load('Rubik_Wet_Paint_Regular.json', function(font) {
    const geometry = new TextGeometry( text, {
      font: font,
      size: 20,
      height: 5,
    });
    geometry.computeBoundingBox();
    const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
					geometry.translate( xMid, 0, 0 );
    const materials = [
            new THREE.MeshPhongMaterial( { color: layer_color[text_layer], flatShading: true } ), // front
            new THREE.MeshPhongMaterial( { color: layer_color[text_layer] } ) // side
          ];
  
    let text3D = new THREE.Mesh(geometry, materials);
    text3D.position.z = -1;
    text3D.position.y = 0.8;
    // text3D.position.y = -0.4;
    // text3D.position.x = 0.1;
    // text3D.position.x = -0.4;
    text3D.scale.set(0.01, 0.01, 0.01);
    text3D.layers.set(text_layer)
    scene.add(text3D);
  
  },
    // onProgress callback
    function ( xhr ) {
      console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
  
    // onError callback
    function ( err ) {
      console.log( 'An error happened' );
    }
  )
}




// Lights  
/*

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
ambientLight.position.x = -2
ambientLight.position.y = -3
ambientLight.position.z = 4
scene.add(ambientLight)
*/

function enableLayers(obj, numLayers) {
  for (let i = 1; i <= numLayers; i++) {
    obj.layers.enable(i);
  }
}

const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 0.2);
// enableLayers(hemiLight, num_layer);
hemiLight.layers.enableAll();
scene.add(hemiLight);

const spotLight = new THREE.SpotLight(0xffa95c, 2);
spotLight.position.x = -2;
spotLight.position.y = -3;
spotLight.position.z = 4;
spotLight.castShadow = true;
// spotLight.distance = 1;
// enableLayers(spotLight, num_layer);
spotLight.layers.enableAll();
scene.add(spotLight);

gui.add(spotLight, 'intensity').min(0).max(100);
gui.add(spotLight.position, 'x').min(-10).max(10);


// test mesh 

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width, sizes.height, 0.4, 1000)
// gui.add(camera, 'fov').min(1).max(200)
// const camera = new THREE.OrthographicCamera(sizes.width / -2, sizes.width / 2, sizes.height / 2, sizes.height / -2, 0.1, 100 )
//const orthCamSize = 1000;
// const camera = new THREE.OrthographicCamera(orthCamSize / -2, orthCamSize / 2, orthCamSize / 2, orthCamSize / -2, 0.1, 100 )



// const default_camera_posi = new THREE.Vector3(0, -10, 30);
const far_camera_posi = [0, -20, 5];
const default_camera_posi = [0, 0, 1];
camera.position.set(...default_camera_posi);

camera.aspect = sizes.width / sizes.height
camera.updateProjectionMatrix()
scene.add(camera)

// camera.position.set(...far_camera_posi);
// camera.updateProjectionMatrix();


const cam_gui = gui.addFolder("camera");

const cam_posi_gui = cam_gui.addFolder("position");
const cam_rota_gui = cam_gui.addFolder("rotation");

cam_posi_gui.add(camera.position, 'x')
cam_posi_gui.add(camera.position, 'y')
cam_posi_gui.add(camera.position, 'z')

cam_rota_gui.add(camera.rotation, 'x')
cam_rota_gui.add(camera.rotation, 'y')
cam_rota_gui.add(camera.rotation, 'z')

// Renderer
let rendererConf = {
  canvas: canvas,
  antialias: true, 
  alpha: true,
  autoClear: true,
  physicallyCorrectLights: true
}
const renderer = new THREE.WebGLRenderer(rendererConf)

renderer.outputEncoding = THREE.sRGBEncoding

// Tone Mapping 
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 2.3

renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(sizes.width/sizes.height, 2))
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// background color 
renderer.setClearColor( 0xff0000, 0)
scene.background = new THREE.Color( 0x00000)


// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = true;
controls.minDistance = 0.6;
controls.maxDistance = 1;
const default_angle = Math.PI*4/7;
controls.minPolarAngle = default_angle;
controls.maxPolarAngle = default_angle;
// const controls = new PointerLockControls(camera, renderer.domElement);
console.log(controls)


const controls_gui = gui.addFolder("controls");
controls_gui.add(controls.target, 'x').step(0.05).min(-3).max(3);
controls_gui.add(controls.target, 'y').step(0.05).min(-3).max(3);
controls_gui.add(controls.target, 'z').step(0.05).min(-3).max(3);


// Raycaster 
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let selectedObj = {
  name: '',
  color: {}
}

const selectedColor = new THREE.Color(0x00ff00);
// let geometry = new THREE.EdgesGeometry( meshObj.geometry );
// geometry.setAttribute('name', new THREE.BUfferAttribute( name )) // name
// geometry.addGroup
// let material = new THREE.LineBasicMaterial({color: 0x00ff00 });
// wireframe = new THREE.LineSegments( geometry, material);
// scene.add(wireframe)
// 
// mesh on pointer, 

function onPointerMove( event ) {
  // calculate pointer position in normalized devicecoordinates
  // (-1 to 1) for both components
  pointer.x = ( event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = ( event.clientY / window.innerHeight ) * -2 + 1;
  
  raycaster.setFromCamera( pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  
  console.log(pointer);
  if (intersects.length > 0 ) {
    console.log(intersects[0].object.parent.name, intersects[0].object.name);
    console.log(event.clientX, event.clientY);
    if (!canvas.classList.contains("cursor")) {
      canvas.classList.add("cursor");
    }
    /*
    for ( let i = 0; i < intersects.length; i++ ) {
      // if (intersects[i].object instanceof THREE.Group)
      let name = intersects[i].object.parent.name;
      console.log(name, scene.getObjectByName(name));
      // let geometry = new THREE.EdgesGeometry( intersects[i].object.geometry );
      // geometry.setAttribute('name', new THREE.BufferAttribute( name )) // name
      // geometry.addGroup
      // let material = new THREE.LineBasicMaterial({color: 0x00ff00 });
      // let wireframe = new THREE.LineSegments( geometry, material);
      // scene.add(wireframe)
    }
    */
  } else {
    if (canvas.classList.contains("cursor")) {
      canvas.classList.remove("cursor");
      // canvas.classList.toggle;
    }
  }
}

let clicked;
function onClick( event ) {
  raycaster.setFromCamera( pointer, camera);
  const intersects = raycaster.intersectObjects( scene.children );
  console.log(intersects.length);

  let name = intersects[0].object.name;
  if (name === "right_arrow") {
    layer++;
    layer = layer % num_layer;
    changeLayer(layer);
  } else if(name == "left_arrow") {
    layer--;
    layer = (layer + num_layer) % num_layer;
    changeLayer(layer);
  } else if (intersects.length > 0 ) {

    console.log('click', intersects[0].object.parent.name);
    console.log('click', intersects[0].object.name);
    console.log(camera);
    // const camPosi = intersects[0].object.parent.userData?.posi;
    const camPosi = intersects[0].object.parent.userData?.posi;
    const cam = intersects[0].object.parent.userData?.cam_posi;
    console.log(controls.target, camPosi);
    // gltfObj?.scene && movePosi(gltfObj.scene, [camPosi.x, camPosi.y, camPosi.z]);
    // camPosi && controls.target.set(...camPosi);
    camPosi && moveTarget({x: camPosi[0], y: camPosi[1], z: camPosi[2]});
    camPosi && camera.position.set(cam[0], cam[1], cam[2]);

    let angle = intersects[0].object.parent.userData?.angle;
    if (!!angle) {
      controls.minPolarAngle = angle;
      controls.maxPolarAngle = angle;
    } else {
      controls.minPolarAngle = default_angle;
      controls.maxPolarAngle = default_angle;
    }

    // camPosi && lookAtTween({x: camPosi[0], y: camPosi[1], z: camPosi[2]});
    camPosi && console.log("objecte defined ");
    console.log(gltfObj);
    controls.update();
    console.log(controls.target);
    // camera.lookAt(intersects[0].object.parent.position);
    /*
    for ( let i = 0; i < intersects.length; i++ ) {
      console.log('click', intersects[0].object.name)
      const camera_posit = intersects[i].object.position
      camera_posit.z += 1; 
      // camera.position.set(intersects[i].object.position);
      camera.position.set(camera_posit.x, camera_posit.y, camera_posit.z );
      console.log(camera.position);
      // camera.lookAt(0,0,-10 );
      camera.near = 0;
      camera.far = 100;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera)
      clicked = intersects[0].object.name
      let clkElmn = document.querySelector('div#clicked_obj')
      clkElmn.position = 'fixed';
      clkElmn.color = 'white';
      clkElmn.innerHTML = clicked; 
    } 
    */
  } else {
      console.debug('reset camera position');
      // camera.updateProjectionMatrix();
      console.log(controls.target)
  }
  
}

function firstZoom(event) {
  event.stopPropagation();

}

function lookAtTween(target) {
  const coords = { 
    x: camera.position.x, 
    y: camera.position.y, 
    z: camera.position.z}
  new TWEEN.Tween(coords)
      .to({x:target.x, y: target.y, z: target.z }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => {
        camera.lookAt(new THREE.Vector3(coords.x, coords.y, coords.z));
        // camera.updateProjectionMatrix();
      }).start();  
}

function moveTarget(target) {
  const coords = { 
    x: controls.target.x, 
    y: controls.target.y, 
    z: controls.target.z}
// controls.target.set(x, y, z);
new TWEEN.Tween(coords)
      .to({x:target.x, y: target.y, z: target.z }, 1000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => {
        // camera.position.set(coords.x, coords.y, coords.z);
        controls.target.set(coords.x, coords.y, coords.z);
        // controls.target.distanceTo(new THREE.Vector3(coords.x, coords.y, coords.z) );
        // camera.updateProjectionMatrix();
      }).start();  
}

function movePosi(meshObj, target) {
  const coords = { 
        x: meshObj.position.x, 
        y: meshObj.position.y, 
        z: meshObj.position.z}
  // controls.target.set(x, y, z);
  new TWEEN.Tween(coords)
          .to({x:target.x, y: target.y, z: target.z }, 1000)
          .easing(TWEEN.Easing.Cubic.Out)
          .onUpdate(() => {
            // camera.position.set(coords.x, coords.y, coords.z);
            meshObj.position.set(coords.x, coords.y, coords.z);
            // controls.target.distanceTo(new THREE.Vector3(coords.x, coords.y, coords.z) );
            // camera.updateProjectionMatrix();
          }).start()
  // controls.target.set(x, y, z);
}

function moveWTween(x, y, z) {
  const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z}
  // controls.target.set(x, y, z);
  console.log(coords);
  new TWEEN.Tween(coords)
          .to({x:x, y:y, z:z }, 1000)
          .easing(TWEEN.Easing.Cubic.Out)
          .onUpdate(() => {
            camera.position.set(coords.x, coords.y, coords.z);
            // controls.target.set(coords.x, coords.y, coords.z);
            // controls.target.distanceTo(new THREE.Vector3(coords.x, coords.y, coords.z) );
            // controls.update();
            camera.updateProjectionMatrix();
          }).start()
  // controls.target.set(x, y, z);
  console.log(controls.target);
  // camera.position.set(x, y, z);
}

gui.add(controls.target, 'x').step(0.1).min(-3).max(3);
gui.add(controls.target, 'y').step(0.1).min(-3).max(3);
gui.add(controls.target, 'z').step(0.1).min(-3).max(3);

// controls.target.set(0, 0.1, 1);
/**
 * Animate
 */
const clock = new THREE.Clock()

function animate(time) {
  // update the picking ray with the camera and pointer position
  if (!!mixer.length)  
    mixer?.[layer]?.update(clock.getDelta())
  TWEEN.update(time);
  controls.update();
  renderer.render(scene, camera)
}
// camera.position.set(...far_camera_posi);
canvas.addEventListener( 'mousemove', onPointerMove );
// canvas.addEventListener('click', onClick); 
renderer.setAnimationLoop(animate);
console.log(controls.target0);

// scene.layers.disable(1);
// scene.layers.toggle(1);
// camera.layers.set(1);
// raycaster.layers.set(1);
// scene.layers.disable(0);
// scene.layers.enable(1);

/*
document.querySelector("button#layer_button").addEventListener('click', function(event) {
  layer = Number(document.querySelector("input#layer_value").value);
  typeof layer == "number" && camera.layers.set(layer);
  clips[layer].forEach( function(clip) {
    mixer[layer].clipAction(clip).play();
  })
  raycaster.layers.set(layer);
})
*/

function changeLayer(layer) {
  camera.layers.set(layer);
  clips[layer].forEach( function(clip) {
    mixer[layer].clipAction(clip).play();
  })
  raycaster.layers.set(layer);
  scene.background.setHex(layer_color[layer]);
}

canvas.addEventListener('keydown', function(event) {
  // event.preventDefault();
  event.stopPropagation();
  console.log(event.key, event.code);
  if (event.key === "ArrowRight") {
    layer++;
    layer = layer % num_layer;
    changeLayer(layer);
  } else if(event.key == "ArrowLeft") {
    layer--;
    layer = (layer + num_layer) % num_layer;
    changeLayer(layer);
  }
  console.log(layer);
})

/*
const tick = () => {
  
  // const elapsedTime = clock.getElapsedTime()
  if (mixer)
  mixer.update(clock.getDelta())
  
  // Render
  renderer.render(scene, camera)
  
  window.requestAnimationFrame(tick)
}

tick();
*/

// lookAt 
