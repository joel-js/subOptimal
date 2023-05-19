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
// import { GUI } from 'dat.gui';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import SceneInit from './Utils/SceneInit';

const App = () => {
  React.useEffect(() => {
    const test = new SceneInit('Canvas');
    
    test.initialize();
    test.animate();
    
    let loadedModel;
    // const glftLoader = new GLTFLoader();
    const plyLoader = new PLYLoader();
  

    plyLoader.load('../assets/CHENET_Susan_Bell_2nd_mandibular.ply', (geometry) => {
			geometry.computeVertexNormals();
      const material = new THREE.MeshStandardMaterial( { color: 0x0055ff, flatShading: true , side: THREE.DoubleSide } );
      const mesh = new THREE.Mesh( geometry, material );

      mesh.position.y = 20;
      mesh.position.z = 0;
      mesh.position.x = 0;
      // mesh.rotation.x = - Math.PI / 2;
      mesh.scale.multiplyScalar( 1 );

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      test.scene.add(mesh);
    });
    const animate = () => {
      if (loadedModel) {
        // loadedModel.scene.rotation.x += 0.01;
        // loadedModel.scene.rotation.y += 0.01;
        // loadedModel.scene.rotation.z += 0.01;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="Canvas" />
    </div>
  );
};

export default App;