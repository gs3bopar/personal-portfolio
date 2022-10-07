import * as THREE from "three";
import gameOver from '../../../static/fonts/Game_Over_Regular.json';

const font = new THREE.FontLoader().parse(gameOver);

const GameOverRegular = ({ text, size, height }) => {
  return (
    <textGeometry args={[text, {
      font: font,
      size: size,
      height: height,
    }]} />
  )
}

export default GameOverRegular;