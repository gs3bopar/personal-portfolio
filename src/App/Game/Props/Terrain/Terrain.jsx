import * as THREE from "three";
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber'
import { vertexShader, fragmentShader } from "../../../../shaders/shaders";
import skyRoadTextureMap from '../../../../static/materials/skyWithSun.jpg'; // pz: 1; px: 2; nz: 2; ny: 1; nx: 1
import skyRoadHeightMap from '../../../../static/materials/heightMap.png';
import { useTexture } from "@react-three/drei";

const totalObjects = 1000;

const Particles = () => {
  const parRef = useRef();
  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(totalObjects * 3);
    const sizes = new Float32Array(totalObjects * 3);

    for (let i = 0; i < totalObjects * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      sizes[i] = Math.random() < .03 ? 15 : 6;
    }

    return [positions, sizes];
  }, []);

  useFrame(() => {
    parRef.current.position.z -= .0001;
  });

  return (
    <mesh 
    ref={parRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attachObject={["attributes", "position"]}
            count={positions.length / 3}
            itemSize={3}
            array={positions}
          />
        </bufferGeometry>
        <pointsMaterial size={0.03} />
      </points>
    </mesh>
  )
}

function Terrain(props) {
  // const { gl } = useThree()
  // const mat = useRef();

  // Load the heightmap image 
  const heightMap = useTexture(skyRoadHeightMap);
  // Apply some properties to ensure it renders correctly
  heightMap.encoding = THREE.sRGBEncoding;
  heightMap.wrapS = THREE.RepeatWrapping;
  heightMap.wrapT = THREE.RepeatWrapping;
  heightMap.anisotropy = 16;

  // Load the texture map
  const textureMap = useTexture(skyRoadTextureMap);
  // Apply some properties to ensure it renders correctly
  textureMap.encoding = THREE.sRGBEncoding;
  textureMap.wrapS = THREE.RepeatWrapping;
  textureMap.wrapT = THREE.RepeatWrapping;
  textureMap.anisotropy = 16;
  textureMap.minFilter = THREE.LinearFilter;
  const terrainRef = useRef();

  useFrame(() => {
    if (terrainRef.current.position.z > 350) terrainRef.current.position.z = -512;
    else terrainRef.current.position.z += props.GAME_SPEED;
  });

  // this terrain is reversed on x y and z axis
  return (
    <group receiveShadow={true}>
      <mesh
      position={[-5,-29,-512]}
      rotation={[-Math.PI / 2,0,0]}
      ref={terrainRef}
      receiveShadow
      // visible={false}
      >
        <planeBufferGeometry receiveShadow args={[1024, 1024, 256, 256]} />
        <shaderMaterial
        receiveShadow
          fog={true}
          uniforms={{
            // Feed the heightmap
            bumpTexture: { value: heightMap },
            // Feed the scaling constant for the heightmap
            bumpScale: { value: 60 },
            // Feed the texture map
            terrainTexture: { value: textureMap },
            color: { value: new THREE.Color( 0xffff00 ) },
          }}
          // Feed the shaders as strings
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Particles />
    </group>
  );
}

export default Terrain;