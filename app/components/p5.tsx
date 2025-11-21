"use client";

import { useEffect } from "react";
import styles from "./p5.module.scss";
import MountContainer from "./mount-container";

/**
 * P5.js animated background component
 * Creates floating squares that respond to mouse movement and form connections
 */

// Configuration constants
const CONFIG = {
  LIFESPAN: 12000, // Lifetime of each raindrop in milliseconds
  SPAWN_RATE: 5, // Number of raindrops spawned per second
  MAX_REPEL_DISTANCE: 1000, // Maximum distance for mouse repel effect
  MAX_REPEL_SPEED: 3, // Maximum speed of repel movement
  MIN_SIZE: 40, // Minimum size of raindrops
  MAX_SIZE: 120, // Maximum size of raindrops
  INITIAL_ALPHA: 100, // Initial opacity value
  FILL_COLOR: [128, 128, 128] as const, // RGB color for raindrops
  SCROLL_PARALLAX_FACTOR: 0.3, // Parallax scrolling speed multiplier
  ALPHA_FADE_EXPONENT: 1.5, // Exponent for center distance fade calculation
  CONNECTION_DISTANCE: 300, // Maximum distance to draw connection lines
  CONNECTION_LINE_COLOR: [128, 128, 128] as const, // RGB color for connection lines
  CONNECTION_LINE_WEIGHT: 1.5, // Thickness of connection lines
  CONNECTION_MAX_ALPHA: 80, // Maximum opacity for connection lines
} as const;

// Pre-calculated constants for performance optimization
const SPAWN_INTERVAL = 1000 / CONFIG.SPAWN_RATE; // Time between spawns in ms
const MAX_DIST_SQ = CONFIG.MAX_REPEL_DISTANCE ** 2; // Squared distance for repel effect
const CONNECTION_DIST_SQ = CONFIG.CONNECTION_DISTANCE ** 2; // Squared distance for connections
const LIFESPAN_INV = 1 / CONFIG.LIFESPAN; // Inverse of lifespan for faster calculation

// Raindrop particle interface
interface Raindrop {
  x: number; // X position
  y: number; // Y position (absolute, not affected by scroll)
  createdAt: number; // Timestamp when created
  rotation: number; // Current rotation angle
  rotationSpeed: number; // Rotation speed per millisecond
  size: number; // Size of the square
}

type P5Instance = any;

/**
 * Creates the p5.js sketch with all drawing logic
 * @param p - P5 instance
 */
const createSketch = (p: P5Instance) => {
  let raindrops: Raindrop[] = []; // Array of active raindrops
  let lastSpawnTime = 0; // Timestamp of last spawn

  // Interaction coordinates (track window events directly)
  let interactionX = -1000;
  let interactionY = -1000;

  // Reset interaction coordinates
  const resetInteraction = () => {
    interactionX = -1000;
    interactionY = -1000;
  };

  // Event listeners for manual tracking
  const updateMouse = (e: MouseEvent) => {
    interactionX = e.clientX;
    interactionY = e.clientY;
  };

  const handleMouseOut = (e: MouseEvent) => {
    if (e.relatedTarget === null) {
      resetInteraction();
    }
  };

  const updateTouch = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      interactionX = e.touches[0].clientX;
      interactionY = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (e.touches.length === 0) {
      resetInteraction();
    }
  };

  // Initial setup: create canvas
  const setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent("p5-background");

    // Allow clicks and scrolls to pass through the canvas
    canvas.style("pointer-events", "none");

    // Attach global listeners to track input even when scrolling
    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("blur", resetInteraction);
    window.addEventListener("touchstart", updateTouch, { passive: true });
    window.addEventListener("touchmove", updateTouch, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);
  };

  // Clean up event listeners when sketch is removed
  const originalRemove = p.remove;
  p.remove = () => {
    window.removeEventListener("mousemove", updateMouse);
    window.removeEventListener("mouseout", handleMouseOut);
    window.removeEventListener("blur", resetInteraction);
    window.removeEventListener("touchstart", updateTouch);
    window.removeEventListener("touchmove", updateTouch);
    window.removeEventListener("touchend", handleTouchEnd);
    window.removeEventListener("touchcancel", handleTouchEnd);
    if (originalRemove) originalRemove.call(p);
  };

  // Handle window resize events
  const windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);

  // Spawn a new raindrop at a random position
  const spawnRaindrop = (now: number, scrollY: number) => {
    raindrops.push({
      x: Math.random() * p.windowWidth,
      y: Math.random() * p.windowHeight + scrollY,
      createdAt: now,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      size:
        Math.random() * (CONFIG.MAX_SIZE - CONFIG.MIN_SIZE) + CONFIG.MIN_SIZE,
    });
    lastSpawnTime = now;
  };

  // Remove raindrops that have exceeded their lifespan
  // Optimized to avoid array allocation (GC pressure reduction)
  const filterExpiredRaindrops = (now: number) => {
    let writeIdx = 0;
    for (let i = 0; i < raindrops.length; i++) {
      if (now - raindrops[i].createdAt < CONFIG.LIFESPAN) {
        if (writeIdx !== i) {
          raindrops[writeIdx] = raindrops[i];
        }
        writeIdx++;
      }
    }
    raindrops.length = writeIdx;
  };

  /**
   * Apply mouse repel force to a raindrop
   * Pushes raindrops away from the mouse cursor
   */
  const applyMouseRepel = (
    drop: Raindrop,
    mouseX: number,
    mouseY: number,
    scrollY: number
  ) => {
    const dx = drop.x - mouseX;
    const dy = drop.y - (mouseY + scrollY);
    const distSq = dx * dx + dy * dy;

    if (distSq < MAX_DIST_SQ && distSq > 1) {
      const dist = Math.sqrt(distSq);
      const repelStrength = 1 - dist / CONFIG.MAX_REPEL_DISTANCE;
      const speed =
        (repelStrength * repelStrength * CONFIG.MAX_REPEL_SPEED) / dist;
      drop.x += dx * speed;
      drop.y += dy * speed;
    }
  };

  /**
   * Calculate opacity based on age and distance from center
   * Raindrops fade as they age and as they move away from screen center
   */
  const calculateAlpha = (
    drop: Raindrop,
    now: number,
    centerX: number
  ): number => {
    const timeFade = 1 - (now - drop.createdAt) * LIFESPAN_INV; // Fade based on age
    const centerDist = Math.abs(drop.x - centerX) / centerX; // Distance from center
    const centerFade = centerDist ** CONFIG.ALPHA_FADE_EXPONENT; // Apply exponential fade
    return CONFIG.INITIAL_ALPHA * timeFade * centerFade;
  };

  /**
   * Draw lines connecting nearby raindrops
   * Lines fade based on distance between raindrops
   */
  const drawConnectionLines = (scrollY: number) => {
    p.strokeWeight(CONFIG.CONNECTION_LINE_WEIGHT);
    const len = raindrops.length;
    for (let i = 0; i < len; i++) {
      const drop = raindrops[i];
      const dropX = drop.x;
      const dropY = drop.y;
      const dropYScroll = dropY - scrollY; // Apply parallax scroll offset

      for (let j = i + 1; j < len; j++) {
        const other = raindrops[j];
        const dx = dropX - other.x;
        const dy = dropY - other.y;
        const distSq = dx * dx + dy * dy; // Squared distance for performance

        if (distSq < CONNECTION_DIST_SQ) {
          // Calculate line opacity based on distance
          const lineAlpha =
            (1 - Math.sqrt(distSq) / CONFIG.CONNECTION_DISTANCE) *
            CONFIG.CONNECTION_MAX_ALPHA;
          p.stroke(...CONFIG.CONNECTION_LINE_COLOR, lineAlpha);
          p.line(dropX, dropYScroll, other.x, other.y - scrollY);
        }
      }
    }
  };

  /**
   * Draw a single raindrop as a rotating square
   */
  const drawRaindrop = (
    drop: Raindrop,
    now: number,
    scrollY: number,
    alpha: number
  ) => {
    const halfSize = drop.size * 0.5; // Calculate half size for centering
    p.noStroke();
    p.fill(...CONFIG.FILL_COLOR, alpha);
    p.push(); // Save transformation state
    p.translate(drop.x, drop.y - scrollY); // Move to position with parallax
    p.rotate(
      drop.rotation + (now - drop.createdAt) * drop.rotationSpeed * 0.001
    ); // Apply rotation
    p.rect(-halfSize, -halfSize, drop.size, drop.size); // Draw centered square
    p.pop(); // Restore transformation state
  };

  /**
   * Main draw loop - executed every frame
   */
  const draw = () => {
    p.clear(); // Clear canvas for transparency

    const now = performance.now();

    // Calculate scroll offset and cache common values
    const scrollY = window.scrollY * CONFIG.SCROLL_PARALLAX_FACTOR;
    const { windowWidth } = p;
    const centerX = windowWidth >> 1; // Bit shift for fast division by 2

    // Spawn new raindrops at regular intervals
    if (now - lastSpawnTime >= SPAWN_INTERVAL) {
      spawnRaindrop(now, scrollY);
    }

    // Remove old raindrops
    filterExpiredRaindrops(now);

    // Draw connection lines first (behind raindrops)
    drawConnectionLines(scrollY);

    // Update and draw each raindrop
    const len = raindrops.length;
    for (let i = 0; i < len; i++) {
      const drop = raindrops[i];
      applyMouseRepel(drop, interactionX, interactionY, scrollY);
      const alpha = calculateAlpha(drop, now, centerX);
      drawRaindrop(drop, now, scrollY, alpha);
    }
  };

  p.setup = setup;
  p.windowResized = windowResized;
  p.draw = draw;
};

/**
 * React component that initializes and mounts the p5.js sketch
 */
const P5 = () => {
  useEffect(() => {
    let p5Instance: any = null;
    // Dynamically import p5.js library to avoid SSR issues
    import("p5").then((p5Module) => {
      p5Instance = new p5Module.default(createSketch);
    });

    return () => {
      if (p5Instance) p5Instance.remove();
    };
  }, []);

  return (
    <MountContainer>
      <div id="p5-background" className={styles.background} />
    </MountContainer>
  );
};

export default P5;
