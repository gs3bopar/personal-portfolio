import { useMemo } from 'react';
import { useRecoilValue } from "recoil";
import GameOverRegular from '../../../Font/GameOverRegular/GameOverRegular';
import {
  enemyPositionState,
} from "../../../../gameState";

const TargetText = ({text}) => {
  const targetText = useMemo(() => 
    (<mesh>
      <GameOverRegular text={text} size={8} height={.09} />
      <meshBasicMaterial color={'#A7E82E'} />
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
        key={enemy.text}
      >
        <TargetText text={enemy.text} />
      </group>
    ))
  )
}

export default Enemies;