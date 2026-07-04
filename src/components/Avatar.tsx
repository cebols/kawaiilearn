import type { Character } from "../content/characters";

/**
 * Avatares originais estilo kawaii/shoujo, desenhados em SVG paramétrico:
 * mesma base de rosto (olhos grandes com brilho, blush, boquinha),
 * penteado e paleta variam por personagem.
 */
export default function Avatar({ c, size = 56 }: { c: Character; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={c.name}
      className="shrink-0 rounded-full shadow-md"
      style={{ background: `linear-gradient(135deg, ${c.accent}33, ${c.accent}11)` }}
    >
      <Hair c={c} back />
      {/* rosto */}
      <ellipse cx="50" cy="58" rx="26" ry="24" fill={c.skin} />
      {/* orelhas */}
      <circle cx="24" cy="58" r="5" fill={c.skin} />
      <circle cx="76" cy="58" r="5" fill={c.skin} />
      <Hair c={c} />
      {/* olhos grandes com brilho (estilo shoujo) */}
      <Eye cx={39} accent={c.accent} />
      <Eye cx={61} accent={c.accent} />
      {/* blush */}
      <ellipse cx="33" cy="68" rx="5" ry="3" fill="#fda4af" opacity="0.7" />
      <ellipse cx="67" cy="68" rx="5" ry="3" fill="#fda4af" opacity="0.7" />
      {/* boquinha */}
      <path d="M 46 73 Q 50 77 54 73" stroke="#be123c" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Eye({ cx, accent }: { cx: number; accent: string }) {
  return (
    <g>
      <ellipse cx={cx} cy="60" rx="6" ry="7.5" fill="#292524" />
      <ellipse cx={cx} cy="61" rx="4.5" ry="5.5" fill={accent} opacity="0.55" />
      <circle cx={cx - 2} cy="57.5" r="2.2" fill="white" />
      <circle cx={cx + 2.5} cy="62" r="1.1" fill="white" opacity="0.8" />
    </g>
  );
}

function Hair({ c, back = false }: { c: Character; back?: boolean }) {
  switch (c.hairstyle) {
    case "twintails":
      return back ? (
        <g>
          {/* chiquinhas */}
          <path d="M 20 50 Q 8 60 12 84 Q 16 92 22 86 Q 18 66 26 52 Z" fill={c.hair} />
          <path d="M 80 50 Q 92 60 88 84 Q 84 92 78 86 Q 82 66 74 52 Z" fill={c.hair} />
          <circle cx="23" cy="49" r="5" fill={c.accent} />
          <circle cx="77" cy="49" r="5" fill={c.accent} />
        </g>
      ) : (
        <path d="M 24 60 Q 20 32 50 30 Q 80 32 76 60 Q 76 46 68 44 Q 52 40 44 46 Q 30 44 28 54 Q 25 56 24 60 Z" fill={c.hair} />
      );
    case "short":
      return back ? (
        <ellipse cx="50" cy="46" rx="30" ry="22" fill={c.hairDark} />
      ) : (
        <path d="M 22 58 Q 20 30 50 28 Q 80 30 78 58 Q 74 44 64 46 L 60 40 Q 50 46 42 42 Q 30 44 28 56 Q 24 56 22 58 Z" fill={c.hair} />
      );
    case "neat":
      return back ? (
        <ellipse cx="50" cy="45" rx="28" ry="20" fill={c.hairDark} />
      ) : (
        <path d="M 24 56 Q 22 30 50 29 Q 78 30 76 56 Q 72 42 60 42 Q 46 42 38 44 Q 28 46 24 56 Z" fill={c.hair} />
      );
    case "bun":
      return back ? (
        <g>
          <circle cx="50" cy="26" r="11" fill={c.hair} />
          <circle cx="50" cy="26" r="4" fill={c.hairDark} opacity="0.4" />
        </g>
      ) : (
        <path d="M 24 60 Q 20 32 50 30 Q 80 32 76 60 Q 74 46 62 45 Q 48 42 38 46 Q 27 48 24 60 Z" fill={c.hair} />
      );
    case "bob":
      return back ? (
        <path d="M 20 52 Q 18 74 26 80 Q 32 82 34 76 L 66 76 Q 68 82 74 80 Q 82 74 80 52 Q 76 30 50 28 Q 24 30 20 52 Z" fill={c.hair} />
      ) : (
        <path d="M 24 58 Q 20 30 50 28 Q 80 30 76 58 Q 72 44 62 44 Q 50 38 40 46 Q 28 46 24 58 Z" fill={c.hairDark} opacity="0.9" />
      );
    case "long":
      return back ? (
        <path d="M 22 50 Q 16 78 22 90 L 34 88 Q 28 70 30 54 L 70 54 Q 72 70 66 88 L 78 90 Q 84 78 78 50 Q 74 30 50 28 Q 26 30 22 50 Z" fill={c.hair} />
      ) : (
        <path d="M 24 58 Q 20 30 50 28 Q 80 30 76 58 Q 74 44 64 44 Q 50 38 40 45 Q 28 46 24 58 Z" fill={c.hair} />
      );
  }
}
