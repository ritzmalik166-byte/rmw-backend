"use client";
import React, { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  wind: number;
  rotation: number;
  rotationSpeed: number;
}

function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const snowflakesRef = useRef<Snowflake[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create snowflakes
    const createSnowflakes = () => {
      const count = 300; // Number of snowflakes
      snowflakesRef.current = [];

      for (let i = 0; i < count; i++) {
        snowflakesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 6 + 1,
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          wind: Math.random() * 0.5 - 0.25,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: Math.random() * 0.02 - 0.01,
        });
      }
    };

    createSnowflakes();

    // Wind effect
    let windDirection = 0;
    let windTarget = 0;
    let windForce = 0;

    const updateWind = () => {
      if (Math.random() > 0.995) {
        windTarget = (Math.random() - 0.5) * 0.5;
      }
      windForce += (windTarget - windForce) * 0.01;
      windDirection = windForce;
    };

    // Draw snowflake
    const drawSnowflake = (snowflake: Snowflake) => {
      ctx.save();
      ctx.translate(snowflake.x, snowflake.y);
      ctx.rotate(snowflake.rotation);
      ctx.globalAlpha = snowflake.opacity;

      // Draw a simple snowflake shape
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, snowflake.size);
        ctx.moveTo(0, 0);
        ctx.lineTo(snowflake.size * 0.5, snowflake.size * 0.5);
        ctx.moveTo(0, 0);
        ctx.lineTo(-snowflake.size * 0.5, snowflake.size * 0.5);
        ctx.rotate((Math.PI * 2) / 6);
      }
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      updateWind();

      snowflakesRef.current.forEach((snowflake) => {
        // Update position
        snowflake.y += snowflake.speed;
        snowflake.x += snowflake.wind + windDirection;
        snowflake.rotation += snowflake.rotationSpeed;

        // Reset if off screen
        if (snowflake.y > canvas.height) {
          snowflake.y = -10;
          snowflake.x = Math.random() * canvas.width;
        }

        // Wrap horizontally
        if (snowflake.x > canvas.width) {
          snowflake.x = 0;
        } else if (snowflake.x < 0) {
          snowflake.x = canvas.width;
        }

        drawSnowflake(snowflake);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-[5]"
      style={{ background: "transparent" }}
    />
  );
}

export default Snowfall;
