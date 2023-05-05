// import './App.css'
// import React from 'react';
// import * as three from 'three';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import Stats from 'three/examples/jsm/libs/stats.module';

// const App = () => {
//   React.useEffect(() => {
    
//     const scene = new three.Scene();
    
//     const camera = new three.PerspectiveCamera(
//       50,
//       window.innerWidth / window.innerHeight,
//       1,
//       1000
//     );
    
//     camera.position.z = 96;
    
//     const canvas = document.getElementById('Canvas');
    
//     const renderer = new three.WebGLRenderer({
//       canvas,
//       alpha: true,
//       antialias: true // 3D elements looks smooth
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     const ambientLight = new three.AmbientLight(0xffffff, 0.5);
//     ambientLight.castShadow = true;
//     const spotLight = new three.SpotLight(0xffffff, 1);
//     spotLight.castShadow = true;
//     spotLight.position.set(0, 64, 32);
    
//     scene.add(ambientLight);
//     scene.add(spotLight);

//     const boxGeometry = new three.BoxGeometry(8,8,8);
//     const boxMaterial = new three.MeshNormalMaterial();
//     const boxMesh = new three.Mesh(boxGeometry, boxMaterial);
    
//     scene.add(boxMesh);

//     const controls = new OrbitControls(camera, renderer.domElement);

//     const stats = Stats();
//     document.body.appendChild(stats.dom);

//     const animate = () => {
//       // boxMesh.rotation.x += 0.01;
//       // boxMesh.rotation.y += 0.01;
//       stats.update();
//       controls.update();
//       renderer.render(scene, camera);
//       window.requestAnimationFrame(animate);
//     };
//     animate();
  
//   }, []);

//   return (
//     <div className="App">
//       <canvas id="Canvas" />
//     </div>
//   );
// }
// export default App


import React from 'react';

import * as THREE from 'three';
import { GUI } from 'dat.gui';

import SceneInit from './Utils/SceneInit';

const App = () => {
  React.useEffect(() => {
    const test = new SceneInit('Canvas');
    const gui = new GUI();
    
    test.initialize();
    test.animate();
    
    
    const boxGeometry = new THREE.BoxGeometry(8, 8, 8, 2, 2, 2);
    const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: true });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    console.log(boxMesh)
    const sphereGeometry = new THREE.SphereGeometry(10, 10, 10);
    const sphereMaterial = new THREE.MeshPhongMaterial({ wireframe: false });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.x = 30;
    
    test.scene.add(boxMesh);
    test.scene.add(sphereMesh);
    
    const folder = gui.addFolder('Mesh');
    folder.open();

    const rotationFolder = folder.addFolder('Rotation');
    rotationFolder.add(boxMesh.rotation, 'x', 0, 5).name('Rotate X');
    rotationFolder.add(boxMesh.rotation, 'y', 0, 5).name('Rotate Y');
    rotationFolder.add(boxMesh.rotation, 'z', 0, 5).name('Rotate Z');

    const materialFolder = folder.addFolder('Material');
    const materialParams = {
      sphereColor: sphereMesh.material.color.getHex()
    }
    materialFolder.add(sphereMesh.material, 'wireframe');
    materialFolder.addColor(materialParams, 'sphereColor')
                  .onChange((val) => sphereMesh.material.color.set(val));
    
    const lightFolder = folder.addFolder('lighting');
    lightFolder.add()

  }, []);

  return (
    <div>
      <canvas id="Canvas" />
    </div>
  );
}

export default App;