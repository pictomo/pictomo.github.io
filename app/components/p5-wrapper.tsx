"use client";

import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import styles from "./p5-wrapper.module.scss";

const sketch: Sketch = (p5) => {
  p5.setup = () =>
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);

  p5.draw = () => {
    p5.clear();
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(500);
    p5.pop();
  };
};

export const P5 = () => {
  return (
    <div className={styles.background}>
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
};

export default P5;
