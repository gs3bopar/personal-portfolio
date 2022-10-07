import Enemies from "./Enemies/Enemies";
import Laser from "./Lasers/Laser/Laser";
import LaserController from "./Lasers/LaserController/LaserController";
import Score from "./Score/Score";
import { useFrame } from '@react-three/fiber'
import { useRecoilState } from "recoil";
import {
  enemyPositionState,
  laserPositionState,
  scoreState
} from "../../../gameState";
import { getRandomNum, landsOnRectangle } from "../../../utils";

const LASER_RANGE = 100;
const LASER_Z_VELOCITY = 1;
const ENEMY_SPEED = 0.1;
const GROUND_HEIGHT = -50;


function GameTimer({ setEnemiesHit }) {
  const [enemies, setEnemies] = useRecoilState(enemyPositionState);
  const [lasers, setLaserPositions] = useRecoilState(laserPositionState);
  const [score, setScore] = useRecoilState(scoreState);

  useFrame(({ mouse }) => {

    const hitEnemies = {};
    enemies.forEach((enemy) => {
      hitEnemies[enemy.text] = lasers.filter(() => lasers.filter((laser) => landsOnRectangle(laser, enemy) === true).length > 0).length > 0;
    });

    // for modal
    if (Object.values(hitEnemies).includes(true)) {
      setEnemiesHit(hitEnemies);
      setScore(score + 1);
    }

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


const GamePlay = ({ setEnemiesHit }) => {
  return (
    <>
      <Enemies />
      <Laser />
      <LaserController />
      <GameTimer 
        setEnemiesHit={setEnemiesHit}
      />
      <Score />
    </>
  )
}

export default GamePlay;