import { useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const MAP_WIDTH = 1774;
const MAP_HEIGHT = 887;
const HUB = { x: 894, y: 323 };

type NetworkRoute = {
  id: string;
  path: string;
  destination: { x: number; y: number };
  duration: number;
  delay: number;
};

// Coordinates use the clean PNG's native 1774 × 887 pixel space. Destinations
// sit on the artwork's luminous map nodes, rather than estimated map labels.
const routes: NetworkRoute[] = [
  {
    id: 'north-america',
    path: 'M 894 323 C 852 241, 780 178, 710 164',
    destination: { x: 710, y: 164 },
    duration: 1.2,
    delay: 0.65,
  },
  {
    id: 'mexico',
    path: 'M 894 323 C 804 247, 674 241, 546 288',
    destination: { x: 546, y: 288 },
    duration: 1.1,
    delay: 2.15,
  },
  {
    id: 'central-america',
    path: 'M 894 323 C 811 295, 721 316, 656 346',
    destination: { x: 656, y: 346 },
    duration: 0.95,
    delay: 3.55,
  },
  {
    id: 'northern-south-america',
    path: 'M 894 323 C 862 332, 829 369, 812 399',
    destination: { x: 812, y: 399 },
    duration: 0.95,
    delay: 4.8,
  },
  {
    id: 'brazil',
    path: 'M 894 323 C 998 384, 1090 481, 1044 594',
    destination: { x: 1044, y: 594 },
    duration: 1.15,
    delay: 6.05,
  },
  {
    id: 'southern-cone',
    path: 'M 894 323 C 1039 447, 1019 640, 908 732',
    destination: { x: 908, y: 732 },
    duration: 1.15,
    delay: 7.5,
  },
];

export function RegionalNetworkMap({ alt }: { alt: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [imageReady, setImageReady] = useState(false);
  const isInView = useInView(mapRef, { amount: 0.3, once: true });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={mapRef} className="regional-network-map">
      <img
        className="regional-network-map__image"
        src="/assets/glowing-americas-map-clean.png"
        alt={alt}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        loading="lazy"
        decoding="async"
        onLoad={() => setImageReady(true)}
      />
      {isInView && imageReady && !prefersReducedMotion && (
        <svg
          className="regional-network-map__overlay"
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <circle className="regional-network-map__hub-pulse" cx={HUB.x} cy={HUB.y} r="11">
            <animate attributeName="r" values="11;26;11" keyTimes="0;.5;1" dur=".75s" begin=".1s" fill="freeze" />
            <animate attributeName="opacity" values="0;.5;0" keyTimes="0;.5;1" dur=".75s" begin=".1s" fill="freeze" />
          </circle>
          {routes.map((route) => {
            const routeStart = `${route.delay}s`;
            const routeEnd = `${route.delay + route.duration}s`;
            const routeDuration = `${route.duration}s`;
            return (
              <g key={route.id} data-network-route={route.id}>
                <path
                  id={`regional-network-route-${route.id}`}
                  className="regional-network-map__route"
                  d={route.path}
                  pathLength="1"
                  strokeDasharray="1 1"
                  strokeDashoffset="1"
                  opacity="0"
                >
                  <animate attributeName="stroke-dashoffset" from="1" to="0" dur={routeDuration} begin={routeStart} fill="freeze" />
                  <animate attributeName="opacity" from="0" to=".72" dur=".2s" begin={routeStart} fill="freeze" />
                </path>
                <circle className="regional-network-map__particle" r="7" opacity="0">
                  <animateMotion dur={routeDuration} begin={routeStart} fill="freeze">
                    <mpath href={`#regional-network-route-${route.id}`} />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;.9;.9;0" keyTimes="0;.12;.85;1" dur={routeDuration} begin={routeStart} fill="freeze" />
                </circle>
                <circle
                  className="regional-network-map__destination"
                  cx={route.destination.x}
                  cy={route.destination.y}
                  r="5"
                  opacity="0"
                >
                  <animate attributeName="r" values="5;13;5" keyTimes="0;.45;1" dur=".65s" begin={routeEnd} fill="freeze" />
                  <animate attributeName="opacity" values="0;.85;.52" keyTimes="0;.45;1" dur=".65s" begin={routeEnd} fill="freeze" />
                </circle>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
