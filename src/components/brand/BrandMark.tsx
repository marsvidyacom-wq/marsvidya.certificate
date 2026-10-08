import Link from "next/link";

interface BrandMarkProps {
  compact?: boolean;
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <Link className="brand-mark" href="#top" aria-label="Mars Vidya home">
      <span className="brand-emblem" aria-hidden="true">
        <span>M</span>
      </span>
      <span className="brand-copy">
        <strong>Mars</strong>
        {!compact && <strong>Vidya</strong>}
      </span>
    </Link>
  );
}
