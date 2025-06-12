import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

function HeartMesh() {
  const meshRef = useRef();
  const { scale } = useSpring({
    loop: { reverse: true },
    to: [{ scale: 1.1 }, { scale: 1 }],
    from: { scale: 1 },
    config: { duration: 600 },
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const shape = new THREE.Shape();
  shape.moveTo(0, 2);
  shape.bezierCurveTo(0, 2, 0, 5, -2.5, 5);
  shape.bezierCurveTo(-5, 5, -5, 2, -5, 2);
  shape.bezierCurveTo(-5, -1, -2.5, -3, 0, -5);
  shape.bezierCurveTo(2.5, -3, 5, -1, 5, 2);
  shape.bezierCurveTo(5, 2, 5, 5, 2.5, 5);
  shape.bezierCurveTo(0, 5, 0, 2, 0, 2);

  const extrudeSettings = {
    depth: 1,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 2,
    bevelSize: 0.3,
    bevelThickness: 0.3,
    curveSegments: 12
  };

  return (
    <animated.mesh ref={meshRef} scale={scale} position={[0, 0, 0]}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial color={"#33acff"} />
    </animated.mesh>
  );
}

function WaveAnimation() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Create smoother animation with faster updates
    const interval = setInterval(() => {
      setPhase(prev => (prev + 0.2) % 10); // Increment phase for continuous animation
    }, 50); // Update faster (50ms) for smoother animation

    return () => clearInterval(interval);
  }, []);

  // Generate ECG-like heartbeat pattern
  const generatePath = () => {
    let path = "M0,15 ";
    
    for (let i = 0; i < 200; i += 2) {
      let x = i;
      let y = 15;
      
      // Create ECG pattern with phase shift
      if (i > 40 && i < 50) {
        y = 15 - (i - 40) * 0.8;
      } else if (i >= 50 && i < 60) {
        y = 7 + (i - 50) * 2.3;
      } else if (i >= 60 && i < 70) {
        y = 30 - (i - 60) * 1.5;
      } else if (i >= 70 && i < 80) {
        y = 15 - Math.sin((i - 70 + phase * 5) * 0.5) * 5;
      } else if (i >= 130 && i < 140) {
        y = 15 - (i - 130) * 0.8;
      } else if (i >= 140 && i < 150) {
        y = 7 + (i - 140) * 2.3;
      } else if (i >= 150 && i < 160) {
        y = 30 - (i - 150) * 1.5;
      } else if (i >= 160 && i < 170) {
        y = 15 - Math.sin((i - 160 + phase * 5) * 0.5) * 5;
      }
      
      path += `L${x},${y} `;
    }
    
    return path;
  };

  return (
    <svg className="w-full h-16 mt-4" viewBox="0 0 200 30">
      <path
        d={generatePath()}
        fill="none"
        stroke="#FF0000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


// Text animation
function AnimatedText() {
  const [visible, setVisible] = useState("");
  const fullText = "Welcome to Tahsilli – Your AI base Health Care Partner";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setVisible(fullText.substring(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <h2 className="text-lg text-center font-semibold text-blue-500 mt-3 h-8">
      {visible}<span className="animate-pulse">|</span>
    </h2>
  );
}

export default function HeartScene() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 rounded-lg shadow-lg">
      <div className="w-1/2 h-90 mb-4 flex items-center justify-center ">
        <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 16], fov: 50 }}>
          <ambientLight intensity={0.6}/>
          <directionalLight position={[10,10,10]} intensity={1}/>
          <HeartMesh />
          <HeartMesh />
        </Canvas>
      </div>
      <WaveAnimation />
      <AnimatedText />
    </div>
  );
}

