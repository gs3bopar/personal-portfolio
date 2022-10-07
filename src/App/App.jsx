import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react';
import { RecoilRoot } from "recoil";
import Modal from './Modal/Modal';
import { EXPERIENCES, ABOUT_ME, CONTACT_ME } from '../constants';
import Terrain from "./Game/Props/Terrain/Terrain";
import TankModel from "./Game/Props/TankModel/TankModel";
import GamePlay from "./Game/GamePlay/GamePlay";
// import { OrbitControls } from "@react-three/drei";

const App = () => {
  const ref = useRef();
  const [speed, setSpeed] = useState(0.06);
  const [enemiesHit, setEnemiesHit] = useState({
    [ABOUT_ME.STRING]: false,
    [EXPERIENCES.STRING]: false,
    [CONTACT_ME.STRING]: false,
  });

  useEffect(() => {
    if (Object.values(enemiesHit).includes(true)) setSpeed(0.02);
    else setSpeed(0.2);
  }, [enemiesHit])

  return (
    <>
    <Canvas
      style={{ background: "#cdf9ff" }}
      camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 2, 5] }}
      dpr={Math.max(window.devicePixelRatio, 2)}
      ref={ref}
      shadowMap
    >
    <RecoilRoot>
      <Terrain GAME_SPEED={speed}/>
      <Suspense fallback={null}>
        <TankModel
          scale={[.008,.008,.008]}
          position={[0,-3,0]}
          rotation={[0,Math.PI,0]}
        />
      </Suspense>
      <GamePlay setEnemiesHit={setEnemiesHit} />
      {/* <OrbitControls /> */}
    </RecoilRoot>
  </Canvas>
    {
        <Modal enemiesHit={enemiesHit} setEnemiesHit={setEnemiesHit}></Modal>
    }
    </>
  )
}

export default App;