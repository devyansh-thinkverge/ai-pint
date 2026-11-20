export default function Logo({
  className = "h-9 w-auto",
  textClass = "",
  tagline = null,
  taglineClass = "",
}) {
  return (
    <span className="flex items-center gap-2.5">
      <img
        src="/logo-mark.png"
        alt=""
        aria-hidden="true"
        className={`${className}`}
        draggable={false}
      />
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
