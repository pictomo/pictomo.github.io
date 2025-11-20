"use client";

import { useEffect, useState } from "react";
import styles from "./p5.module.scss";

// 定数定義
const CONFIG = {
  LIFESPAN: 12000,
  SPAWN_RATE: 5,
  MAX_REPEL_DISTANCE: 1000,
  MAX_REPEL_SPEED: 3,
  CIRCLE_SIZE: 80,
  INITIAL_ALPHA: 100,
  FILL_COLOR: [128, 128, 128] as const,
  SCROLL_PARALLAX_FACTOR: 0.3,
  ALPHA_FADE_EXPONENT: 3 / 2, // 透明度のフェード曲線（大きいほど急激に消える）
} as const;

const SPAWN_INTERVAL = 1000 / CONFIG.SPAWN_RATE;

interface Raindrop {
  x: number;
  y: number;
  createdAt: number;
}

const createSketch = (p: any) => {
  let raindrops: Raindrop[] = [];
  let lastSpawnTime = 0;

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent("p5-background");
  };

  p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);

  p.draw = () => {
    p.clear();
    p.noStroke();

    const now = p.millis();
    const scrollY = window.scrollY * CONFIG.SCROLL_PARALLAX_FACTOR;

    // 雨粒生成
    if (now - lastSpawnTime >= SPAWN_INTERVAL) {
      raindrops.push({
        x: p.random(p.windowWidth),
        y: p.random(p.windowHeight),
        createdAt: now,
      });
      lastSpawnTime = now;
    }

    // 期限切れ雨粒削除
    raindrops = raindrops.filter((d) => now - d.createdAt < CONFIG.LIFESPAN);

    const { mouseX, mouseY, windowWidth } = p;
    const centerX = windowWidth >> 1;
    const adjustedMouseY = mouseY + scrollY;
    const maxDistSq = CONFIG.MAX_REPEL_DISTANCE * CONFIG.MAX_REPEL_DISTANCE;

    // 描画
    for (let i = 0; i < raindrops.length; i++) {
      const drop = raindrops[i];
      const dx = drop.x - mouseX;
      const dy = drop.y - adjustedMouseY;
      const distSq = dx * dx + dy * dy;

      // カーソルからの反発
      if (distSq < maxDistSq && distSq > 0) {
        const dist = p.sqrt(distSq);
        const repelStrength = 1 - dist / CONFIG.MAX_REPEL_DISTANCE;
        const speed = repelStrength * repelStrength * CONFIG.MAX_REPEL_SPEED;
        const invDist = 1 / dist;
        drop.x += dx * invDist * speed;
        drop.y += dy * invDist * speed;
      }

      // 透明度計算
      const timeFade = 1 - (now - drop.createdAt) / CONFIG.LIFESPAN;
      const centerDist = p.abs(drop.x - centerX) / centerX;
      const centerFade = centerDist ** CONFIG.ALPHA_FADE_EXPONENT;
      const alpha = CONFIG.INITIAL_ALPHA * timeFade * centerFade;

      p.fill(...CONFIG.FILL_COLOR, alpha);
      p.ellipse(
        drop.x,
        drop.y - scrollY,
        CONFIG.CIRCLE_SIZE,
        CONFIG.CIRCLE_SIZE
      );
    }
  };
};

const P5 = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    import("p5").then((p5Module) => {
      new p5Module.default(createSketch);
    });
  }, []);

  if (!isMounted) return null;

  return <div id="p5-background" className={styles.background}></div>;
};

export default P5;
