import { atom } from "recoil";

export const tankPositionState = atom({
  key: "tankPosition", // unique ID (with respect to other atoms/selectors)
  default: { position: {}, rotation: {} } // default value (aka initial value)
});

export const enemyPositionState = atom({
  key: "enemyPosition", // unique ID (with respect to other atoms/selectors)
  default: [
    { x: -20, y: -2, z: -70, text: "ABOUT ME" },
    { x: 5, y: .6, z: -90, text: "EXPERIENCES" },
    { x: -4, y: 10, z: -120, text: "CONTACT ME" }
    // { x: -40, y: 4.5, z: -130, text: "RESUME" }
  ] // default value (aka initial value)
});

export const laserPositionState = atom({
  key: "laserPositions", // unique ID (with respect to other atoms/selectors)
  default: [] // default value (aka initial value)
});

export const scoreState = atom({
  key: "score", // unique ID (with respect to other atoms/selectors)
  default: 0 // default value (aka initial value)
});