"use client";

import { useEffect, useRef } from "react";
import styles from "./p5.module.scss";

/**
 * P5.js animated background component
 * Creates floating squares that respond to mouse movement and form connections
 */

// Configuration constants
const CONFIG = {
  LIFESPAN: 12000, // Lifetime of each raindrop in milliseconds
  SPAWN_RATE_RATIO: 20 / (1920 * 1080), // Spawn rate per pixel area (default: 5 drops/sec for 1920x1080)
  MAX_REPEL_DISTANCE: 1000, // Maximum distance for mouse repel effect
  MAX_REPEL_SPEED: 3, // Maximum speed of repel movement
  MIN_SIZE: 40, // Minimum size of raindrops
  MAX_SIZE: 120, // Maximum size of raindrops
  INITIAL_ALPHA: 100, // Initial opacity value
  FILL_COLOR: [128, 128, 128] as const, // RGB color for raindrops
  SCROLL_PARALLAX_FACTOR: 0.5, // Parallax scrolling speed multiplier
  ALPHA_FADE_EXPONENT: 1.5, // Exponent for center distance fade calculation
  CONNECTION_DISTANCE: 256, // Maximum distance to draw connection lines
  CONNECTION_LINE_COLOR: [128, 128, 128] as const, // RGB color for connection lines
  CONNECTION_LINE_WEIGHT: 1.5, // Thickness of connection lines
  CONNECTION_MAX_ALPHA: 80, // Maximum opacity for connection lines
  ROTATION_SPEED_FACTOR: 0.04, // Rotation speed multiplier
  OFF_SCREEN: -1000, // Coordinate value for off-screen interaction
} as const;

// Pre-calculated constants for performance optimization
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
 * @param container - The DOM element to mount the canvas into
 * @param interactionRef - Reference to shared interaction coordinates
 */
const createSketch =
  (
    container: HTMLElement,
    interactionRef: React.MutableRefObject<{ x: number; y: number }>
  ) =>
  (p: P5Instance) => {
    let raindrops: Raindrop[] = []; // Array of active raindrops
    let lastSpawnTime = 0; // Timestamp of last spawn
    let spawnInterval = 0; // Dynamic spawn interval based on area

    // Calculate spawn rate based on viewport area
    const updateSpawnRate = () => {
      const area = p.width * p.height;
      const spawnRate = area * CONFIG.SPAWN_RATE_RATIO;
      spawnInterval = 1000 / spawnRate; // Time between spawns in ms
    };

    // Initial setup: create canvas
    const setup = () => {
      const canvas = p.createCanvas(
        container.clientWidth,
        container.clientHeight
      );
      canvas.parent(container);

      // Allow clicks and scrolls to pass through the canvas
      canvas.style("pointer-events", "none");

      // Initialize spawn rate
      updateSpawnRate();
    };

    // Handle container resize events
    p.containerResized = (w: number, h: number) => {
      p.resizeCanvas(w, h);
      updateSpawnRate();
    };

    // Spawn a new raindrop at a random position
    const spawnRaindrop = (now: number, scrollY: number) => {
      raindrops.push({
        x: Math.random() * p.width,
        y: Math.random() * p.height + scrollY,
        createdAt: now,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * CONFIG.ROTATION_SPEED_FACTOR,
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
          const distSq = dx ** 2 + dy ** 2; // Squared distance for performance

          if (distSq < CONNECTION_DIST_SQ) {
            // Calculate line opacity based on distance (using squared distance approximation)
            // Alpha = MaxAlpha * (1 - dist / MaxDist)
            // We avoid sqrt by using: Alpha ~= MaxAlpha * (1 - distSq / MaxDistSq)
            // This is a non-linear fade but faster and visually similar
            const lineAlpha =
              (1 - distSq / CONNECTION_DIST_SQ) * CONFIG.CONNECTION_MAX_ALPHA;
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

      const now = p.millis();

      // Calculate scroll offset and cache common values
      const scrollY = window.scrollY * CONFIG.SCROLL_PARALLAX_FACTOR;
      const { width } = p;
      const centerX = width >> 1; // Bit shift for fast division by 2

      // Spawn new raindrops at regular intervals
      if (now - lastSpawnTime >= spawnInterval) {
        spawnRaindrop(now, scrollY);
      }

      // Remove old raindrops
      filterExpiredRaindrops(now);

      // Update positions (Physics phase)
      const { x: mouseX, y: mouseY } = interactionRef.current;
      for (const drop of raindrops) {
        applyMouseRepel(drop, mouseX, mouseY, scrollY);
      }

      // Draw connection lines first (behind raindrops)
      drawConnectionLines(scrollY);

      // Draw each raindrop (Render phase)
      const len = raindrops.length;
      for (let i = 0; i < len; i++) {
        const drop = raindrops[i];
        const alpha = calculateAlpha(drop, now, centerX);
        drawRaindrop(drop, now, scrollY, alpha);
      }
    };

    p.setup = setup;
    p.draw = draw;
  };

/**
 * React component that initializes and mounts the p5.js sketch
 */
const P5 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef<{ x: number; y: number }>({
    x: CONFIG.OFF_SCREEN,
    y: CONFIG.OFF_SCREEN,
  });

  useEffect(() => {
    // Interaction handlers
    const updateMouse = (e: MouseEvent) => {
      interactionRef.current = { x: e.clientX, y: e.clientY };
    };

    const resetInteraction = () => {
      interactionRef.current = {
        x: CONFIG.OFF_SCREEN,
        y: CONFIG.OFF_SCREEN,
      };
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        resetInteraction();
      }
    };

    const updateTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        interactionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        resetInteraction();
      }
    };

    // Attach global listeners
    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("blur", resetInteraction);
    window.addEventListener("touchstart", updateTouch, { passive: true });
    window.addEventListener("touchmove", updateTouch, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);

    let p5Instance: any = null;

    // ResizeObserver setup
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (p5Instance && p5Instance.containerResized) {
          // Use contentRect for precise content box size
          const { width, height } = entry.contentRect;
          p5Instance.containerResized(width, height);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      // Dynamically import p5.js library to avoid SSR issues
      import("p5").then((p5Module) => {
        p5Instance = new p5Module.default(
          createSketch(containerRef.current!, interactionRef)
        );
      });
    }

    return () => {
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("blur", resetInteraction);
      window.removeEventListener("touchstart", updateTouch);
      window.removeEventListener("touchmove", updateTouch);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      resizeObserver.disconnect();
      if (p5Instance) p5Instance.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.background}
      aria-hidden="true"
      role="presentation"
    />
  );
};

export default P5;
