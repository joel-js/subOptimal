import React from "react";

import * as THREE from "three";
// import { GUI } from 'dat.gui';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import SceneInit from "./Utils/SceneInit";
import plyModel from "./Utils/plyModel";

const App = () => {
  React.useEffect(() => {
    const test = new SceneInit("Canvas");

    test.initialize();
    test.animate();

    // const group = new THREE.Group();
    // test.scene.add(group);

    const groundGeometry = new THREE.BoxGeometry(160, 0.5, 160);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafaaf });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.receiveShadow = true;
    groundMesh.position.y = 0;
    groundMesh.position.x = 0;
    groundMesh.position.z = 0;
    // test.scene.add(groundMesh);
    test.scene.add(groundMesh);

    let loadedModel;
    const gum = plyModel("../assets/white.ply",test.scene, {
      receiveShadow: true,
    });
    // gum.position.x = 0;
    // gum.position.y = 70;
    // gum.position.z = 0;
    console.log('gum',gum);
    const plyLoader = new PLYLoader();
    plyLoader.load(
      "../assets/CHENET_Susan_Bell_2nd_mandibular.ply",
      (geometry) => {
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({
          color: 0xeeeeee,
          flatShading: true,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 30;
        mesh.position.z = 0;
        mesh.position.x = 0;
        // mesh.rotation.x = - Math.PI / 2;
        mesh.scale.multiplyScalar(1);

        // mesh.castShadow = true;
        mesh.traverse( (node) => {
          if(node.isMesh) node.castShadow = true;
        });
        mesh.receiveShadow = true;

        // test.scene.add(mesh);
        console.log(mesh);
        test.scene.add(mesh);
      }
    );
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
