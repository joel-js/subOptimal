import * as THREE from 'three';

const ThreeBox = props => {
  const { geometry, material, shadow, position } = props;
  const boxGeometry = new THREE.BoxGeometry(geometry[0], geometry[1], geometry[2]);
  const boxMaterial = new THREE[material.material](material.props);
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  boxMesh.castShadow = false || shadow;
  boxMesh.position[Object.keys(position)[0]] = Object.values(position)[0];
  return boxMesh;
}
 
export default ThreeBox; 