import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import * as THREE from "three";
import _ from "lodash"
// const loader = new PLYLoader();

const plyModel = (path, scene, props) => {
  let rt;
  new PLYLoader().load((path),
    geometry => {
      geometry.computeVertexNormals();
      const material = new THREE.MeshStandardMaterial({
        color: 0xeeeeee,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geometry,material);
      rt = {...mesh};
      _.merge(mesh, props)
      scene.add(mesh);
    }

  );
  return rt;
}
export default plyModel;

