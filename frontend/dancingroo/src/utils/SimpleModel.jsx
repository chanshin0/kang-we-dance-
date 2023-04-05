import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BoxGeometry, MeshBasicMaterial } from 'three';

const SimpleModel = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="hotpink" />
    </mesh>
  );
};

export default SimpleModel;
