// src/components/StationIcon/StationIcon.tsx
import './StationIcon.css';

type Props = {
  x: number;
  y: number;
  src: string;
  alt: string;
  width?: number;
};

function StationIcon({ x, y, src, alt, width = 90 }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      className="station-icon"
      style={{ left: x, top: y, width }}
    />
  );
}

export default StationIcon;