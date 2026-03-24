"use client";

import { useEffect, useRef } from "react";

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Read from DOM attribute on each frame so theme changes apply without re-init
    function isDark() {
      return document.documentElement.getAttribute("data-color-scheme") === "dark";
    }
    function getRgb() {
      return isDark() ? "255,255,255" : "0,0,0";
    }

    let width = 0;
    let height = 0;
    let animFrameId: number;
    const mouse = { x: undefined as number | undefined, y: undefined as number | undefined, radius: 250 };

    class Particle {
      x: number; y: number; vx: number; vy: number;
      radius: number; baseAlpha: number;
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.2 + 0.4;
        this.baseAlpha = Math.random() * 0.3 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -50) this.x = width + 50;
        else if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        else if (this.y > height + 50) this.y = -50;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${getRgb()},${this.baseAlpha})`;
        ctx!.fill();
      }
    }

    let particles: Particle[] = [];

    function initParticles() {
      particles = [];
      const n = Math.floor((width * height) / 14000);
      for (let i = 0; i < n; i++) particles.push(new Particle());
    }

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
      initParticles();
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);
      if (mouse.x !== undefined && mouse.y !== undefined) {
        ctx!.beginPath();
        const g = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        g.addColorStop(0, `rgba(${getRgb()},${isDark() ? 0.03 : 0.015})`);
        g.addColorStop(0.5, `rgba(${getRgb()},${isDark() ? 0.01 : 0.005})`);
        g.addColorStop(1, `rgba(${getRgb()},0)`);
        ctx!.fillStyle = g;
        ctx!.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
      particles.forEach((p) => p.update());
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(${getRgb()},${(isDark() ? 0.08 : 0.1) * (1 - dist / 100)})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
        if (mouse.x !== undefined && mouse.y !== undefined) {
          const dx = particles[a].x - mouse.x;
          const dy = particles[a].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(${getRgb()},${(1 - dist / mouse.radius) * (isDark() ? 0.15 : 0.2)})`;
            ctx!.lineWidth = 0.8;
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(mouse.x, mouse.y);
            ctx!.stroke();
            const force = (mouse.radius - dist) / mouse.radius;
            particles[a].x -= dx * force * 0.003;
            particles[a].y -= dy * force * 0.003;
          }
        }
      }
      animFrameId = requestAnimationFrame(animate);
    }

    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseOut = () => { mouse.x = undefined; mouse.y = undefined; };
    const onTouchMove = (e: TouchEvent) => { if (e.touches.length > 0) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; } };
    const onTouchEnd = () => { mouse.x = undefined; mouse.y = undefined; };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    resize();
    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
