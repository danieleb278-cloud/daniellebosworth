type Props = {
  label?: string;
  caption?: string;
  ratio?: string; // e.g. "4/5", "16/9", "1/1"
  src?: string;
  alt?: string;
  tone?: "paper" | "ink";
  className?: string;
  imageClassName?: string;
  fit?: "cover" | "contain" | "cover-top";
  priority?: boolean;
};

/**
 * Editorial image slot. Renders a real <img> when `src` is provided,
 * otherwise shows a typographic placeholder with a caption rule.
 */
export function PlaceholderImage({
  label = "Image",
  caption,
  ratio = "4/5",
  src,
  alt = "",
  tone = "paper",
  className = "",
  imageClassName = "",
  fit = "cover",
  priority = false,
}: Props) {
  const isInk = tone === "ink";
  return (
    <figure className={`w-full ${className}`}>
      <div
        style={{ aspectRatio: ratio }}
        className={`relative w-full overflow-hidden border ${
          isInk
            ? "border-background/20 bg-background/5"
            : "border-border bg-secondary"
        }`}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className={`absolute inset-0 h-full w-full transition-transform duration-700 ${imageClassName} ${
              fit === "contain"
                ? "object-contain p-6"
                : fit === "cover-top"
                ? "object-cover object-top"
                : "object-cover"
            }`}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding={priority ? "sync" : "async"}
          />

        ) : (
          <>
            {/* diagonal hairlines */}
            <svg
              aria-hidden
              className={`absolute inset-0 h-full w-full ${
                isInk ? "text-background/15" : "text-foreground/10"
              }`}
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="absolute inset-0 flex items-end justify-between p-4 md:p-6">
              <span className="eyebrow">{label}</span>
              <span className="eyebrow">Placeholder</span>
            </div>
          </>
        )}
      </div>
      {caption ? (
        <figcaption className="eyebrow mt-3 flex items-center justify-between border-t border-border pt-2">
          <span>{caption}</span>
          <span aria-hidden>✦</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
