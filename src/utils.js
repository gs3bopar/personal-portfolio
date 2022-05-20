
/*
  Optimal values for positioning enemies
  x: -20 to 5
  y: -3 to 8
  z: -60 to 120
 */
export function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function landsOnRectangle(p1, p2) {
  // const a = p2.x - p1.x;
  // const b = p2.y - p1.y;
  // const c = p2.z - p1.z;
  // return Math.sqrt(a * a + b * b + c * c);
  // bottom right
  const p3 = {
    x: p2.x + p2.text.length * 3,
    y: p2.y
  }

  // p2: bottom left
  // top right
  // const p3 = {
  //   x: p2.x + p2.text.length * 2,
  //   y: p2.y - 3
  // }
  // console.log("p1: ", p1); // check if this point is inside rect
  // console.log("p2: ", p2);
  // console.log("p3: ", p3);

  // when p2 is top left and p3 is bottom right
  const val =  p1.x > p2.x && p1.x < p3.x && p1.y < (p2.y + 3) && p1.y > p3.y;
  // console.log(Math.abs(p1.z - p2.z));
  return val && Math.abs(p1.z - p2.z) < 1;
}
