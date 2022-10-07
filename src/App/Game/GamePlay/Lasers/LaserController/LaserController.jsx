import { useRecoilState, useRecoilValue } from "recoil";
import {
  laserPositionState,
  tankPositionState
} from "../../../../../gameState";


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
export default LaserController;
