export default function Logo({
  className = "h-9 w-9",
  textClass = "",
  tagline = null,
  taglineClass = "",
}) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="#1C1917" />
        <g fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round">
          <path d="M20 44 L26 28 L32 38 L38 20 L44 32" />
        </g>
        <g fill="#FCD34D">
          <circle cx="20" cy="44" r="3.4" />
          <circle cx="26" cy="28" r="3.4" />
          <circle cx="32" cy="38" r="3.4" />
          <circle cx="38" cy="20" r="3.4" />
          <circle cx="44" cy="32" r="3.4" />
        </g>
        <path
          d="M14 12 h36 a4.5 4.5 0 0 1 0 9 H14 a4.5 4.5 0 0 1 0 -9 z"
          fill="#FAFAF9"
          opacity="0.94"
        />
        <circle cx="21" cy="16.5" r="1.5" fill="#D97706" />
        <circle cx="29" cy="16.5" r="1.5" fill="#D97706" />
        <circle cx="37" cy="16.5" r="1.5" fill="#D97706" />
        <circle cx="45" cy="16.5" r="1.5" fill="#D97706" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-semibold tracking-tight text-brew-ink ${textClass}`}
        >
          AI <span className="text-brew-amber">Taproom</span>
        </span>
        {tagline && (
          <span
            className={`mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brew-espresso/60 ${taglineClass}`}
          >
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
