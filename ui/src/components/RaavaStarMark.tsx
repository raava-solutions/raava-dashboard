import { cn } from "@/lib/utils";

interface RaavaStarMarkProps {
  className?: string;
  /** Size in pixels. Defaults to 24. */
  size?: number;
}

/**
 * Inline SVG 4-point star mark for the Raava brand.
 * Renders a gradient-filled four-pointed star matching the Figma design system.
 *
 * The shape is a classic four-pointed star with concave sides, gradient-filled
 * from #224AE8 (top-left) through #716EFF to #00BDB7 (bottom-right).
 */
export function RaavaStarMark({ className, size = 24 }: RaavaStarMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="raava-star-grad"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#224AE8" />
          <stop offset="50%" stopColor="#716EFF" />
          <stop offset="100%" stopColor="#00BDB7" />
        </linearGradient>
      </defs>
      <path
        d="M16 0 C17.2 6.4 25.6 14.8 32 16 C25.6 17.2 17.2 25.6 16 32 C14.8 25.6 6.4 17.2 0 16 C6.4 14.8 14.8 6.4 16 0Z"
        fill="url(#raava-star-grad)"
      />
    </svg>
  );
}
