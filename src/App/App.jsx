import { useLoader, Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useMemo, useState } from 'react';
import { 
  OrbitControls,
  useFBX,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import {
  tankPositionState,
  enemyPositionState,
  laserPositionState,
  scoreState
} from "../gameState";
import gameOver from '../static/fonts/Game_Over_Regular.json';
import { vertexShader, fragmentShader } from "../shaders/shaders";
import skyRoadTextureMap from '../static/materials/skyWithSun.jpg' // pz: 1; px: 2; nz: 2; ny: 1; nx: 1
import skyRoadHeightMap from '../static/materials/heightMap.png'
import Modal from './Modal/Modal';
import { EXPERIENCES, ABOUT_ME, CONTACT_ME } from '../constants';
import { getRandomNum, landsOnRectangle } from "../utils";
import "./App.css";

const LASER_RANGE = 100;
const LASER_Z_VELOCITY = 1;
const ENEMY_SPEED = 0.1;
const GROUND_HEIGHT = -50;
const font = new THREE.FontLoader().parse(gameOver);
const textOptions = {
    font: font,
		size: 8,
		height: .09,
};
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

function Model(props) {
  const tank = useRef();
  // const { nodes, materials } = useGLTF('/personal-portfolio/tank.glb');
  const fbx = useFBX('/portfolio/models/tank.fbx');
  const [tankPosition, setTankPosition] = useRecoilState(tankPositionState);

  useFrame(({ mouse }) => {
    setTankPosition({
      position: {
        x: mouse.x,
        y: mouse.y
      },
      rotation: {
        z: -mouse.x * 0.5,
        x: mouse.x * 0.5,
        y: mouse.y * 0.2
      }
    });
  });

  useFrame(() => {
    // tank.current.rotation.z = tankPosition.rotation.z;
    // tank.current.rotation.y = tankPosition.rotation.x;
    // tank.current.rotation.x = tankPosition.rotation.y;
    // tank.current.position.y = tankPosition.position.y;
    // tank.current.position.x = tankPosition.position.x;
    // fbx.children[7].rotation.z = tankPosition.rotation.z;
    fbx.children[8].rotation.z = tankPosition.rotation.z;
    // fbx.children[8].rotation.y = tankPosition.rotation.x;
  });

  // Material.003 gun center parts
  // Material.002
  useEffect(() => {
    console.log(fbx);
    fbx.traverse(child => {
      if (child.isMesh) {
        child.material = new THREE.MeshLambertMaterial({ color: '#32FFB8'});
      }
    })
    var pointLight =  new THREE.PointLight(0xf44336, 4, 100);
    pointLight.position.set(0,0,15);
    fbx.children[1] = pointLight;
    fbx.children[2] = new THREE.PointLight(0xffffff, 0, 100); // white
    fbx.children[3] = new THREE.PointLight(0xf44336, 0, 100); // red
    fbx.children[4] = new THREE.PointLight(0x8fce00, 0, 100); // green
    fbx.children[7] = new THREE.Mesh();
    fbx.updateWorldMatrix(true);
  }, []);

  return (
    <>
    <group ref={tank} {...props} receiveShadow={true}>
      <primitive object={fbx} dispose={false} />
    </group>

     
       {/* <mesh visible>
         <boxBufferGeometry args={[1,1,1]} />
         <meshPhongMaterial color={'white'} />
         <meshStandardMaterial
           attach="material"
           color="white"
           roughness={1}
           metalness={0}
         /> 
     </mesh> */}
      {/* Main body */}
      {/* <mesh
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        scale={[1.12173486, 0.85714293, 0.8402164]}
      /> */}
      {/* top shield for tires */}
      {/* <mesh
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[0, 0.05469192, 0]}
        scale={0.80000001}
      /> */}
      {/* Top of the tank */}
      {/* <group position={[0, 0.59999996, 0.1]}>
        <mesh
          geometry={nodes.Circle_1.geometry}
          material={nodes.Circle_1.material}
        />
        <mesh
          geometry={nodes.Circle_2.geometry}
          material={materials["Material.002"]}
        />
      </group> */}
      {/* In between gun parts */}
      {/* <mesh
        geometry={nodes.Circle001.geometry}
        material={nodes.Circle001.material}
        position={[0, 1.06455553, 0.89632851]}
        scale={0.20147002}
      /> */}

      {/* 1. outside tire rubber */}
      {/* 2. Inner wheel i.e. rims */}
      {/* <group position={[0, 0.05469192, 0]}>
        <mesh
          geometry={nodes.Cylinder_1.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          geometry={nodes.Cylinder_2.geometry}
          material={nodes.Cylinder_2.material}
        />
      </group>
      <group position={[0, 0.05469192, -1.5]}>
        <mesh
          geometry={nodes.Cylinder_1.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          geometry={nodes.Cylinder_2.geometry}
          material={nodes.Cylinder_2.material}
        />
      </group>
      <group position={[-2.70, 0.05469192, -1.5]}>
        <mesh
          geometry={nodes.Cylinder_1.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          geometry={nodes.Cylinder_2.geometry}
          material={nodes.Cylinder_2.material}
        />
      </group>
      <group position={[-2.70, 0.05469192, 0]}>
        <mesh
          geometry={nodes.Cylinder_1.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          geometry={nodes.Cylinder_2.geometry}
          material={nodes.Cylinder_2.material}
        />
      </group> */}
      </>
  );
}

// const Terrain = () => {
//   const terrainRef = useRef();

//   useFrame(() => {
//     terrainRef.current.position.z += 0.4;
//   });

//   return(
//     <mesh
//       visible
//       position={[0,-100,0]}
//       rotation={[-Math.PI / 2, 0, 0]}
//       ref={terrainRef}
//     >
//       <planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
//       <meshStandardMaterial
//         attach="material"
//         color="white"
//         roughness={1}
//         metalness={0}
//         wireframe
//       />
//     </mesh>
//   );
// };

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
    if (terrainRef.current.position.z > 350) {
      terrainRef.current.position.z = -512;
    } else {
      terrainRef.current.position.z += props.GAME_SPEED;
    }
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
        // ref={mat}
        receiveShadow
          fog
          uniforms={{
            // Feed the heightmap
            bumpTexture: { value: heightMap },
            // Feed the scaling constant for the heightmap
            bumpScale: { value: 60 },
            // Feed the texture map
            terrainTexture: { value: textureMap },
            fog: true,
            // lights: {
            //   ambientLight
            // }
          }}
          // map-
          // Feed the shaders as strings
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          // side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

const Target = (props) => {
  return (
    <group
    // position={props.position}
    receiveShadow={true}
    >
      <mesh
        receiveShadow={true} 
        position={[props.position[0], props.position[1] + 15, props.position[2]]}
      >
        <planeGeometry args={[30,20]} />
        <meshBasicMaterial color={"pink"} side={THREE.FrontSide} />
        {/* <TargetText text={props.text} /> */}
      </mesh>
      <mesh
        receiveShadow={true}
        position={[props.position[0], props.position[1], props.position[2]]}
      >
        <cylinderBufferGeometry args={[1, 1, 15, 50, 1]} />
        <meshBasicMaterial color={"pink"} side={THREE.FrontSide}/>
      </mesh>
    </group>
  )
}


// billboard
// const Target = (props) => {
//   // const target = useRef();
//   // const font = new THREE.FontLoader().parse(gameOver);

//   return (
//     <group 
//       position={props.position}
//     >
//       <Billboard follow={true} lockX={false} lockY={false} lockZ={false} position={[0, 0, 0]}>
//         {/* <Plane args={[3, 2]} material-color="green" /> */}
//         <Text fontSize={5} outlineWidth={'5%'} outlineColor="#000000" outlineOpacity={1}>
//           ABOUT ME
//         </Text>
//       </Billboard>
//     </group>
//   )
// }

const TargetText = ({text}) => {
    // return (
  // (<group>
    /* <mesh>
      <lineSegments>
        <wireframeGeometry>
          <sphereGeometry args={[100,100,100]} />
        </wireframeGeometry>
        <lineBasicMaterial color={'0xffffff'} linewidth={2} />
      </lineSegments>
    </mesh> */
    /* <mesh>
      <sphereGeometry args={[25, 25]}/>
      <meshBasicMaterial color={'#cdf9ff'} shading={THREE.FlatShading}/>
    </mesh> */
  // <group>

  const targetText = useMemo(() => 
    (<mesh>
      <textGeometry args={[text, textOptions]} />
      <meshBasicMaterial color={'#A7E82E'} />
      {/* <meshPhongMaterial
        color='0x0095DD'
        emissive={'orange'}
        roughness={1}
        metalness={0}
        wireframe
        flatShading
        vertexColors
      /> */}
    </mesh>)
  , [text]);

  return targetText;
}

function Enemies() {
  const enemies = useRecoilValue(enemyPositionState);

  return (
    enemies.map((enemy) => (
      <group
        position={[enemy.x, enemy.y, enemy.z]}
        // key={Math.random()}
      >
        <TargetText text={enemy.text} key={enemy.text}/>
      </group>
    ))
  )
}

// Manages Drawing enemies that currently exist in state
// function Enemies() {
//   const enemies = useRecoilValue(enemyPositionState);
//   return (
//     <group>
//       {enemies.map((enemy) => (
//         <mesh position={[enemy.x, enemy.y, enemy.z]} key={`${enemy.x}`}>
//           <sphereBufferGeometry attach="geometry" args={[2, 8, 8]} />
//           <meshStandardMaterial attach="material" color="white" wireframe />
//         </mesh>
//       ))}
//     </group>
//   );
// }

function Lasers() {
  const lasers = useRecoilValue(laserPositionState);


  return (
    <group receiveShadow={false}>
      {lasers.map((laser) => (
        <mesh receiveShadow={false} position={[laser.x, laser.y, laser.z]} key={`${laser.id}`}>
          <sphereBufferGeometry args={[1, 32, 16]} />
          <meshBasicMaterial color={'#FFFF41'}/>
        </mesh>
      ))}
    </group>
  );
}


function LaserController() {
  const shipPosition = useRecoilValue(tankPositionState);
  const [lasers, setLasers] = useRecoilState(laserPositionState);
  return (
    <mesh
      // position={[0,-20,0]}
      onClick={() =>
        setLasers([
          ...lasers,
          {
            id: Math.random(),
            x: shipPosition.position.x,
            y: -3.8,
            z: -5,
            velocity: [shipPosition.rotation.x * 2, shipPosition.rotation.y * 2]
          }
        ])
      }
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial
        attach="material"
        color="orange"
        emissive="#ff0860"
        visible={false}
      />
    </mesh>
  );
}

function GameTimer({ setEnemiesHit }) {
  const [enemies, setEnemies] = useRecoilState(enemyPositionState);
  const [lasers, setLaserPositions] = useRecoilState(laserPositionState);
  // const [score, setScore] = useRecoilState(scoreState);

  useFrame(({ mouse }) => {

    const hitEnemies = {};
    enemies.forEach((enemy) => {
      hitEnemies[enemy.text] = lasers.filter(() => lasers.filter((laser) => landsOnRectangle(laser, enemy) === true).length > 0).length > 0;
    });
    // console.log(hitEnemies);
    // setScore(score + 1);
    // for modal
    if (Object.values(hitEnemies).includes(true)) setEnemiesHit(hitEnemies);

    // Move all of the enemies. Remove enemies that have been destroyed, or passed the player.
    // const enemiesArr = ["ABOUT ME", "EXPERIENCES"];
    let enemiesArr = enemies
    .map((enemy) => ({ x: enemy.x, y: enemy.y, z: enemy.z + ENEMY_SPEED, text: enemy.text }))
    .filter((enemy) => !hitEnemies[enemy.text] && enemy.z < 0);    

    // reset the enemeies again
    if (enemiesArr.length === 0) {
      setEnemies([
        { x: getRandomNum(-30, -10), y: getRandomNum(-3, 0), z: getRandomNum(-120, -90), text: "ABOUT ME" },
        { x: getRandomNum(-10, -1), y: getRandomNum(0, 4), z: getRandomNum(-90, -75), text: "EXPERIENCES" },
        { x: getRandomNum(0, 5), y: getRandomNum(4, 8), z: getRandomNum(-74, -50), text: "CONTACT ME" }
        // { x: -40, y: 4.5, z: -130, text: "RESUME"}
      ]);
    } else setEnemies(enemiesArr);

    // setEnemies(enemiesArr);
    // Move the Lasers and remove lasers at end of range or that have hit the ground.
    setLaserPositions(
      lasers
        .map((laser) => ({
          id: laser.id,
          x: laser.x + laser.velocity[0],
          y: laser.y + laser.velocity[1],
          z: laser.z - LASER_Z_VELOCITY,
          velocity: laser.velocity
        }))
        .filter((laser) => laser.z > -LASER_RANGE && laser.y > GROUND_HEIGHT)
    );
  });
  return null;
}


function Lights() {
  const [ref, seRef] = useState()
  return (
    <>
      <directionalLight
        ref={seRef}
        intensity={50}
        position={[5, 5, 5]}
        // rotation={[0,0,Math.PI]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        castShadow={true}
      />
      {ref && <directionalLightHelper args={[ref, 5]} />}
    </>
  )
}

const App = () => {
  const ref = useRef();
  const [speed, setSpeed] = useState(0.06);
  const [enemiesHit, setEnemiesHit] = useState({
    [ABOUT_ME.STRING]: false,
    [EXPERIENCES.STRING]: false,
    [CONTACT_ME.STRING]: false
  });

  // const showModal = () => {
  //   this.setState({ show: true });
  // };

  // const hideModal = () => {
  //   setAboutMeHit(false);
  // };

  useEffect(() => {
    if (Object.values(enemiesHit).includes(true)) setSpeed(0.02);
    else setSpeed(0.2);
  }, [enemiesHit])

  return (
    <>
    <Canvas
      style={{ background: "#cdf9ff" }}
      camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 2, 5] }}
      // gl={{ antialias: false }} pixelRatio={4}
      dpr={Math.max(window.devicePixelRatio, 2)}
      ref={ref}
      // onCreated={({ gl }) => {
      //   gl.shadowMap.autoUpdate = false;
      //   gl.shadowMap.enabled = true;
      //   gl.shadowMap.needsUpdate = true;
      //   gl.shadowMap.type = THREE.PCFSoftShadowMap;
      // }}
      shadowMap
    >
    {/* <Lights /> */}
    <RecoilRoot>
    {/* <ambientLight intensity={1} /> */}
      <Terrain GAME_SPEED={speed}/>
      <Suspense fallback={null}>
        <Model
          scale={[.008,.008,.008]}
          position={[0,-3,0]}
          rotation={[0,Math.PI,0]}
        />
      </Suspense>
      {/* <Target position={[-20, 10, -20]} text={"about me"}/>
      <Target position={[5, 10, -20]} text={"experiences"}/> */}
      <Enemies />
      <Lasers />
      <LaserController />
      <GameTimer 
        setEnemiesHit={setEnemiesHit}
      />
        {/* <OrbitControls /> */}
    </RecoilRoot>
  </Canvas>

    {
      // Object.values(enemiesHit).includes(true) &&
        <Modal enemiesHit={enemiesHit} setEnemiesHit={setEnemiesHit}></Modal>
    }
    </>
  )
}

export default App;