"use client";

import { useRef, useEffect, useCallback } from "react";

interface Segment {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  length: number;
  fill: number;
  parentFill: number; 
  children: number[]; 
  parentId: number | null;
}

function buildPureTree(w: number, h: number, cx: number, cy: number): Segment[] {
  const segments: Segment[] = [];
  let idCounter = 0;

  function addPath(sx: number, sy: number, angle: number, depth: number, parentId: number | null) {
    if (depth <= 0 || segments.length > 250) return;

    const snappedAngle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4);
    const len = 40 + Math.random() * 80;
    const ex = sx + Math.cos(snappedAngle) * len;
    const ey = sy + Math.sin(snappedAngle) * len;

    if (ex < -100 || ex > w + 100 || ey < -100 || ey > h + 100) return;

    const currentId = idCounter++;
    const seg: Segment = {
      id: currentId,
      x1: sx, y1: sy,
      x2: ex, y2: ey,
      length: len,
      fill: 0,
      parentFill: parentId === null ? 1 : 0, 
      children: [],
      parentId: parentId
    };

    segments.push(seg);
    if (parentId !== null) {
      const parent = segments.find(s => s.id === parentId);
      if (parent) parent.children.push(currentId);
    }

    const numBranches = Math.random() > 0.65 ? 2 : 1;
    for (let i = 0; i < numBranches; i++) {
        const turn = (Math.floor(Math.random() * 3) - 1) * (Math.PI / 4);
        addPath(ex, ey, snappedAngle + turn, depth - 1, currentId);
    }
  }

  const rootCount = 14;
  for (let i = 0; i < rootCount; i++) {
    addPath(cx, cy, (i / rootCount) * Math.PI * 2, 8, null);
  }

  return segments;
}

interface Props {
  active: boolean;
  originX?: number;
  originY?: number;
}

export default function CircuitBackground({ active, originX = 0.5, originY = 0.72 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const segmentsRef = useRef<Segment[]>([]);
  const animFrameRef = useRef<number>(0);
  const activeRef = useRef(active);

  useEffect(() => { activeRef.current = active; }, [active]);

  const updateAndDraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isActive = activeRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const segments = segmentsRef.current;

    // Phase 1: Update Fill States
    segments.forEach(seg => {
      if (isActive) {
        // Propagation: Fill if parent is full
        let canFill = false;
        if (seg.parentId === null) {
          canFill = true; 
        } else {
          const parent = segments.find(s => s.id === seg.parentId);
          if (parent && parent.fill >= 1) canFill = true;
        }

        if (canFill) {
          seg.fill = Math.min(1, seg.fill + 0.045);
        }
      } else {
        // Reverse Propagation (Drain): Drain only if all children are empty
        let canDrain = true;
        if (seg.children.length > 0) {
          for (const childId of seg.children) {
            const child = segments.find(s => s.id === childId);
            if (child && child.fill > 0) {
              canDrain = false;
              break;
            }
          }
        }

        if (canDrain) {
          seg.fill = Math.max(0, seg.fill - 0.05);
        }
      }
    });

    // Phase 2: Draw
    segments.forEach(seg => {
      // Trace
      ctx.beginPath();
      ctx.moveTo(seg.x1, seg.y1);
      ctx.lineTo(seg.x2, seg.y2);
      ctx.strokeStyle = "rgba(255,107,0,0.035)";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (seg.fill > 0) {
        const dx = seg.x2 - seg.x1;
        const dy = seg.y2 - seg.y1;
        
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x1 + dx * seg.fill, seg.y1 + dy * seg.fill);
        
        ctx.shadowColor = "#ff6b00";
        ctx.shadowBlur = 10 * seg.fill;
        ctx.strokeStyle = `rgba(255,107,0,${0.3 + seg.fill * 0.7})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Joint pad
        if (seg.fill > 0.05) {
          const size = 1.5 + seg.fill * 1.5;
          ctx.fillStyle = "#ff6b00";
          ctx.fillRect(seg.x1 - size, seg.y1 - size, size * 2, size * 2);
        }
      }
    });

    animFrameRef.current = requestAnimationFrame(updateAndDraw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      const cx = canvas.width * originX;
      const cy = canvas.height * originY;
      segmentsRef.current = buildPureTree(canvas.width, canvas.height, cx, cy);
    };

    resize();
    window.addEventListener("resize", resize);
    animFrameRef.current = requestAnimationFrame(updateAndDraw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [updateAndDraw, originX, originY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
