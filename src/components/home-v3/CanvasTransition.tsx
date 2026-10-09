"use client";
import React, { useEffect, useRef, useState } from "react";


const easingFunctions = {
  easeInOutQuart: (t: number): number => {
    return t < 0.5
      ? 8 * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 4) / 2;
  },
  
  easeInOutCubic: (t: number): number => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  },
  
  easeOutQuint: (t: number): number => {
    return 1 - Math.pow(1 - t, 5);
  },
  
  easeInOutBack: (t: number): number => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
};

interface CanvasTransitionProps {
  width: number;        
  height: number;       
  oldImage: string;     
  newImage: string;     
  onComplete?: () => void;  
}

const CanvasTransition: React.FC<CanvasTransitionProps> = ({
  width,
  height,
  oldImage,
  newImage,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const oldImgRef = useRef<HTMLImageElement | null>(null);
  const newImgRef = useRef<HTMLImageElement | null>(null);
  const imagesLoadedRef = useRef(0);
  const completionCalledRef = useRef(false);
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const DURATION = 350; 
  const SCALE_MIN = 0.96; 
  const SCALE_MAX = 1.04; 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    setIsAnimating(true);
    startTimeRef.current = null;
    imagesLoadedRef.current = 0;
    completionCalledRef.current = false;

    const oldImg = new Image();
    const newImg = new Image();

    oldImg.crossOrigin = "anonymous";
    newImg.crossOrigin = "anonymous";

    oldImgRef.current = oldImg;
    newImgRef.current = newImg;

    function animate(currentTime: number) {
      if (!ctx || !oldImgRef.current || !newImgRef.current) return;

      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
        const progress = Math.min(elapsed / DURATION, 1); 

      const easedProgress = easingFunctions.easeInOutQuart(progress);

      ctx.clearRect(0, 0, width, height);

      const oldScale = 1 + (1 - easedProgress) * (SCALE_MIN - 1);
      
      const newScale = SCALE_MIN + easedProgress * (SCALE_MAX - SCALE_MIN);

      const oldOpacity = Math.pow(1 - easedProgress, 1.5);
      
      const newOpacity = Math.pow(easedProgress, 0.7);

      const blurProgress = Math.sin(easedProgress * Math.PI);

      const brightnessAdjust = 1 - (blurProgress * 0.08); 
      const contrastAdjust = 1 + (blurProgress * 0.05); 

      const centerX = width / 2;
      const centerY = height / 2;

      if (oldOpacity > 0.01) {
        ctx.save();

        ctx.globalAlpha = oldOpacity;

        ctx.filter = `brightness(${brightnessAdjust}) contrast(${contrastAdjust})`;

        ctx.translate(centerX, centerY);
        ctx.scale(oldScale, oldScale);
        ctx.translate(-centerX, -centerY);

        ctx.drawImage(oldImgRef.current!, 0, 0, width, height);

        ctx.restore();
      }

      if (newOpacity > 0.01) {
        ctx.save();

        ctx.globalAlpha = newOpacity;

        const newBrightness = 1 - (blurProgress * 0.04);
        ctx.filter = `brightness(${newBrightness}) contrast(${contrastAdjust})`;

        ctx.translate(centerX, centerY);
        ctx.scale(newScale, newScale);
        ctx.translate(-centerX, -centerY);

        ctx.drawImage(newImgRef.current!, 0, 0, width, height);

        ctx.restore();
      }

      if (progress > 0.2 && progress < 0.8) {
        ctx.save();
        
        const gradientOpacity = Math.sin(progress * Math.PI) * 0.15;
        ctx.globalAlpha = gradientOpacity;
        
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, Math.max(width, height) * 0.8
        );
        gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.1)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.2)");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        ctx.restore();
      }

      if (progress >= 1 && !completionCalledRef.current) {
        completionCalledRef.current = true;
        setIsAnimating(false);

        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
        }, 50);
        return;
      }

      if (isAnimating && progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    }

    const handleImageLoad = () => {
      imagesLoadedRef.current++;
      if (imagesLoadedRef.current >= 1 && !animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    const handleImageError = (img: HTMLImageElement, isOld: boolean) => {
      const placeholder = document.createElement("canvas");
      placeholder.width = width;
      placeholder.height = height;
      const placeholderCtx = placeholder.getContext("2d");
      if (placeholderCtx) {
        const gradient = placeholderCtx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#f5f5f5");
        gradient.addColorStop(1, "#e0e0e0");
        placeholderCtx.fillStyle = gradient;
        placeholderCtx.fillRect(0, 0, width, height);
        
        placeholderCtx.fillStyle = "#999";
        placeholderCtx.font = "16px Arial";
        placeholderCtx.textAlign = "center";
        placeholderCtx.textBaseline = "middle";
        placeholderCtx.fillText("Image", width / 2, height / 2 - 10);
        placeholderCtx.fillText("Loading...", width / 2, height / 2 + 10);
      }

      if (isOld) {
        oldImgRef.current = placeholder as any;
      } else {
        newImgRef.current = placeholder as any;
      }

      handleImageLoad();
    };

    oldImg.onload = handleImageLoad;
    oldImg.onerror = () => handleImageError(oldImg, true);

    newImg.onload = handleImageLoad;
    newImg.onerror = () => handleImageError(newImg, false);

    oldImg.src = oldImage;
    newImg.src = newImage;

    fallbackTimeoutRef.current = setTimeout(() => {
      if (!animationFrameRef.current && isAnimating) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    }, 50); 

    return () => {
      setIsAnimating(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
    };
  }, [oldImage, newImage, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
};

export default CanvasTransition;
