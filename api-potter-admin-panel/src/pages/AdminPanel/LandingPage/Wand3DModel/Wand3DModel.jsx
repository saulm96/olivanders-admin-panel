import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';

const My3DModel = ({mousePosition}) => {
  const gltf = useGLTF('/3DWand/scene.gltf');
  const modelRef = useRef();

  useFrame(() => {
    // Slow continuous rotation on Y axis
    modelRef.current.rotation.y += mousePosition.x / 100;
  });

  return <primitive 
    ref={modelRef}
    object={gltf.scene} 
    scale={[1, 1, 1]} 
    rotation={[0, 0, -Math.PI / 2]} 
    position={[0, 0, 0]}
  />;
};

const ThreeScene = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh' }}>
          <Canvas
            className='wand-canvas'
            camera={{ position: [0, 0, 1.5], fov: 75 }}
            // Add dark background
            gl={{ alpha: false }}
            style={{ background: '#121212' }}
          >
            {/* Add fog for depth effect */}
            <fog attach="fog" args={['#121212', 5, 15]} />
            {/* Reduce ambient light for darker mood */}
            <ambientLight intensity={0.4} />
            <pointLight position={[mousePosition.x * 2, mousePosition.y * 2, 0]} intensity={1.5} />
            <My3DModel mousePosition={mousePosition}/>
            {/* Optional: Add subtle environment lighting */}
            <Environment preset="night" />
          </Canvas>
        </div>
    );
};

export default ThreeScene;