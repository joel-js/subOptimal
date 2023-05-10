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

import SceneInit from './Utils/SceneInit';
import ThreeBox from './Components/ThreeBox';

const App = () => {
  React.useEffect(() => {
    const canvas = new SceneInit('Canvas');
    // const gui = new GUI();
    
    canvas.initialize();
    canvas.animate();

    const mainGroup = new THREE.Group();
    mainGroup.position.y = 0.5;
    canvas.scene.add(mainGroup);

    const groundGeometry = new THREE.BoxGeometry(8, 0.5, 8);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);

    groundMesh.receiveShadow = true;
    groundMesh.position.y = -2;
    mainGroup.add(groundMesh);

    const redBoxMesh = ThreeBox({
      geometry : [1, 1, 1],
      material : {
        material: 'MeshPhongMaterial',
        props: { color: 0xff0000 }
      },
      shadow: true,
      position: { x: -2 }
    });
    mainGroup.add(redBoxMesh);

    const blueBoxMesh = ThreeBox({
      geometry : [1, 1, 1],
      material : {
        material: 'MeshPhongMaterial',
        props: { color: 0x0000ff }
      },
      shadow: true,
      position: { x: 0 }
    });
    mainGroup.add(blueBoxMesh);

    const greenBoxMesh = ThreeBox({
      geometry : [1, 1, 1],
      material : {
        material: 'MeshPhongMaterial',
        props: { color: 0x00ff00 }
      },
      shadow: true,
      position: { x: 2 }
    });
    mainGroup.add(greenBoxMesh);

  }, []);

  return (
    <div>
      <canvas id="Canvas" />
    </div>
  );
}

export default App;