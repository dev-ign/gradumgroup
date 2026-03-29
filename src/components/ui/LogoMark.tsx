import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const SIZES = {
  xs:  24,
  sm:  36,
  md:  56,
  lg:  96,
  xl:  180,
} as const;

// Actual vector paths extracted from Figma "Logo - flat"
const LEFT_PATH =
  'M87.21 5.73L87.21 60.97C87.21 62.49 86.61 63.94 85.53 65.02' +
  'L12.01 138.24C10.93 139.31 10.33 140.77 10.33 142.29' +
  'L10.33 147.02C10.33 150.17 12.89 152.73 16.04 152.73' +
  'L81.49 152.73C84.64 152.73 87.2 155.29 87.2 158.44' +
  'L87.2 200.75C87.2 203.9 84.64 206.46 81.49 206.46' +
  'L40.85 206.46C39.29 206.46 37.8 205.82 36.73 204.7' +
  'L1.59 168.02C0.57 166.96 0 165.54 0 164.07' +
  'L0 81.52C0 80.01 0.6 78.55 1.67 77.48' +
  'L77.46 1.69C81.06-1.91 87.21 0.64 87.21 5.73Z';

const RIGHT_PATH =
  'M0 5.73L0 60.97C0 62.49 0.6 63.94 1.68 65.02' +
  'L75.19 138.24C76.27 139.31 76.87 140.77 76.87 142.29' +
  'L76.87 147.02C76.87 150.17 74.31 152.73 71.16 152.73' +
  'L5.71 152.73C2.56 152.73 0 155.29 0 158.44' +
  'L0 200.75C0 203.9 2.56 206.46 5.71 206.46' +
  'L46.35 206.46C47.91 206.46 49.4 205.82 50.47 204.7' +
  'L85.62 168.03C86.64 166.97 87.21 165.55 87.21 164.08' +
  'L87.21 81.53C87.21 80.02 86.61 78.56 85.54 77.49' +
  'L9.75 1.69C6.15-1.91 0 0.64 0 5.73Z';

// Viewbox dimensions from Figma frame
const VW = 197.51;
const VH = 206.45;
// x-offset of right shape in the frame
const RX = 110.3;

interface LogoMarkProps {
  size?: keyof typeof SIZES;
  glow?: boolean;
  trackMouse?: boolean;
  className?: string;
}

function LogoSVG({ px, glow }: { px: number; glow: boolean }) {
  const uid = glow ? 'g' : 'n';
  const h = Math.round(px * (VH / VW));

  return (
    <svg
      width={px}
      height={h}
      viewBox={`0 0 ${VW} ${VH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* ─── Body gradient — light from top, deep shadow at bottom ─── */}
        <linearGradient
          id={`gm-${uid}`}
          x1=".5" y1="0" x2=".5" y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%"   stopColor="#5EFFD4" />
          <stop offset="14%"  stopColor="#1CC99A" />
          <stop offset="48%"  stopColor="#00956D" />
          <stop offset="82%"  stopColor="#044F38" />
          <stop offset="100%" stopColor="#011A10" />
        </linearGradient>

        {/* ─── Left outer-edge highlight ─── */}
        <linearGradient
          id={`ghl-${uid}`}
          x1="0" y1=".25" x2="1" y2=".25"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%"   stopColor="#AAFFD6" stopOpacity=".55" />
          <stop offset="30%"  stopColor="#AAFFD6" stopOpacity=".12" />
          <stop offset="100%" stopColor="#AAFFD6" stopOpacity="0" />
        </linearGradient>

        {/* ─── Right outer-edge highlight (mirror) ─── */}
        <linearGradient
          id={`ghr-${uid}`}
          x1="1" y1=".25" x2="0" y2=".25"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%"   stopColor="#AAFFD6" stopOpacity=".55" />
          <stop offset="30%"  stopColor="#AAFFD6" stopOpacity=".12" />
          <stop offset="100%" stopColor="#AAFFD6" stopOpacity="0" />
        </linearGradient>

        {/* ─── Top specular (bright catch-light) ─── */}
        <linearGradient
          id={`gsp-${uid}`}
          x1=".5" y1="0" x2=".5" y2=".38"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%"   stopColor="#FFFFFF" stopOpacity=".3" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* ─── Bottom depth shadow ─── */}
        <linearGradient
          id={`gsd-${uid}`}
          x1=".5" y1=".62" x2=".5" y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%"   stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity=".6" />
        </linearGradient>

        {/* ─── Glow filter (hero mode only) ─── */}
        {glow && (
          <filter id={`fg-${uid}`} x="-60%" y="-45%" width="220%" height="195%">
            {/* Shape silhouette filled with teal for the bloom */}
            <feFlood floodColor="#00E8A0" floodOpacity="1" result="flood-t" />
            <feComposite in="flood-t" in2="SourceAlpha" operator="in" result="teal-mask" />

            {/* Wide soft ambient halo */}
            <feGaussianBlur in="teal-mask" stdDeviation="24" result="halo" />

            {/* Tight bright corona */}
            <feGaussianBlur in="teal-mask" stdDeviation="8" result="corona" />

            {/* Accent: lime-green edge flare */}
            <feFlood floodColor="#AEE37B" floodOpacity=".8" result="flood-a" />
            <feComposite in="flood-a" in2="SourceAlpha" operator="in" result="accent-mask" />
            <feGaussianBlur in="accent-mask" stdDeviation="3" result="accent" />

            <feMerge>
              <feMergeNode in="halo" />
              <feMergeNode in="corona" />
              <feMergeNode in="accent" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <g filter={glow ? `url(#fg-${uid})` : undefined}>
        {/* ── LEFT SHAPE ── */}
        <path d={LEFT_PATH} fill={`url(#gm-${uid})`} />
        <path d={LEFT_PATH} fill={`url(#ghl-${uid})`} />
        <path d={LEFT_PATH} fill={`url(#gsp-${uid})`} />
        <path d={LEFT_PATH} fill={`url(#gsd-${uid})`} />

        {/* ── RIGHT SHAPE ── */}
        <g transform={`translate(${RX},0)`}>
          <path d={RIGHT_PATH} fill={`url(#gm-${uid})`} />
          <path d={RIGHT_PATH} fill={`url(#ghr-${uid})`} />
          <path d={RIGHT_PATH} fill={`url(#gsp-${uid})`} />
          <path d={RIGHT_PATH} fill={`url(#gsd-${uid})`} />
        </g>
      </g>
    </svg>
  );
}

export function LogoMark({
  size = 'md',
  glow = false,
  trackMouse = false,
  className,
}: LogoMarkProps) {
  const px = SIZES[size];
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Z-axis lean: mouse left → logo tilts left, mouse right → tilts right (clearly visible)
  // X-axis depth: mouse up/down adds a subtle perspective nod
  const rotate  = useSpring(useTransform(mouseX, [-760, 760], [-8, 8]),  { stiffness: 70, damping: 20 });
  const rotateX = useSpring(useTransform(mouseY, [-600, 600], [5, -5]), { stiffness: 70, damping: 20 });

  useEffect(() => {
    if (!trackMouse) return;
    const onMove = (e: MouseEvent) => {
      // Track relative to viewport center so the full screen width drives the full tilt range
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [trackMouse, mouseX, mouseY]);

  if (!trackMouse) {
    return (
      <div className={className} style={{ display: 'inline-flex' }}>
        <LogoSVG px={px} glow={glow} />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-flex', perspective: '900px' }}
    >
      <motion.div style={{ rotate, rotateX, transformStyle: 'preserve-3d' }}>
        <LogoSVG px={px} glow={glow} />
      </motion.div>
    </div>
  );
}
