import Image from "next/image";

type CardProps = {
  title: string;
  description: string;
  image: string;
  location?: string;
};

export default function Card({
  title,
  description,
  image,
  location,
}: CardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-border bg-surface/90 shadow-sm shadow-slate-950/5 transition duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-slate-950/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          {location ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#fbbf24]">
              {location}
            </p>
          ) : null}

          <h3 className="mt-2 text-xl font-semibold leading-tight sm:text-2xl">
            {title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          </div>

          <p className="text-sm leading-6 text-[var(--muted-foreground)] dark:text-slate-300">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          

          <button
            type="button"
            className="text-sm font-semibold text-slate-950 transition hover:text-[#0f766e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-white dark:hover:text-[#2dd4bf]"
          >
            Explore details
          </button>
        </div>
      </div>
    </article>
  );
}