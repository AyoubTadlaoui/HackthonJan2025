import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDScene = ({ imageUrl }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current; // Save the current value of the ref
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement); // Use the saved ref value

    const geometry = new THREE.BoxGeometry();
    const texture = new THREE.TextureLoader().load(imageUrl);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      currentMount.removeChild(renderer.domElement); // Use the saved ref value in cleanup
    };
  }, [imageUrl]);

  return <div ref={mountRef}></div>;
};

export default ThreeDScene;
