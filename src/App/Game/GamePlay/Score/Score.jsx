import { useRecoilState } from "recoil";
import { scoreState } from "../../../../gameState";
import GameOverRegular from "../../../Font/GameOverRegular/GameOverRegular";

function Score() {
  const [score, ] = useRecoilState(scoreState);
  return (
    <group position={[-.32,-3.17,1]}>
      <mesh>
        <GameOverRegular text={String(score)} size={2} height={.09} />
        <meshBasicMaterial color={'#428bff'} />
      </mesh>
    </group>
  );
}

export default Score;