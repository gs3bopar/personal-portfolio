import { useRecoilValue } from "recoil";
import {
  laserPositionState,
} from "../../../../../gameState";

function Laser() {
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

export default Laser;