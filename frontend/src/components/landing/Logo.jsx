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
        {/* neural-network foam */}
        <g stroke="#FCD34D" strokeWidth="1.6" opacity="0.9" fill="none">
          <path d="M23 17 L32 12.5 L41 17" />
          <path d="M23 17 L32 21.5 L41 17" />
          <path d="M32 12.5 L32 21.5" />
          <path d="M32 21.5 V26.5" />
        </g>
        <circle cx="23" cy="17" r="2.8" fill="#FCD34D" />
        <circle cx="32" cy="12.5" r="3.2" fill="#FCD34D" />
        <circle cx="41" cy="17" r="2.8" fill="#FCD34D" />
        <circle cx="32" cy="21.5" r="2.4" fill="#FAFAF9" />
        {/* pint glass */}
        <path
          d="M20.5 26.5 H43.5 L41 49.5 Q40.6 54 36.2 54 H27.8 Q23.4 54 23 49.5 Z"
          fill="none"
          stroke="#D97706"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <path
          d="M43.5 31 h2.6 a5.4 5.4 0 0 1 0 10.8 h-3.4"
          fill="none"
          stroke="#D97706"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="29.5" cy="42" r="1.6" fill="#D97706" opacity="0.8" />
        <circle cx="35.5" cy="46.5" r="1.2" fill="#D97706" opacity="0.65" />
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
