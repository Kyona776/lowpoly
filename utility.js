import * as THREE from 'three';

export const toTransparent = (meshObj) => {
    if (
      meshObj instanceof THREE.Mesh &&
      meshObj.material instanceof THREE.MeshStandardMaterial) {
        meshObj.material.opacity = 0;
        meshObj.material.transparent = true;
    }
}

export const addWireframe = (meshObj) => {
    if ( meshObj instanceof THREE.Mesh &&
        meshObj.material instanceof THREE.MeshStandardMaterial) {
        let geometry = meshObj.geometry;
        console.log(meshObj)
        let material = new THREE.LineBasicMaterial({color: 0x00ff00 });
        // geometry.setAttribute('position', new THREE.BufferAttribute( meshObj.position, 1))
        let wireframe =new THREE.EdgesGeometry(geometry);

        // wireframe.setAttribute('name', new THREE.BufferAttribute( [meshObj.name + "_wireframe"], 1 ))
        // let wireframe = new THREE.WireframeGeometry(geometry);
        const line = new THREE.LineSegments( wireframe, material );
        line.material.depthTest = false;
        line.material.opacity = 0.5;
        line.material.transparent = true;
        line.name = meshObj.name + '_wireframe';
        // line.position = meshObj.position;
        meshObj.add(line);
        // scene.add(line);
        // how to inherit
    }
}