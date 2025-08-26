"use client";
import { useRef } from "react";
import Image from "next/image";

type Practitioner = {
  id: string;
  name: string;
  specialty: string;
  clinic?: string;
  avatarUrl?: string;
};

export default function PractitionerCarousel({ items }: { items: Practitioner[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: "left" | "right") => {
    const el = scroller.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h3 className="text-lg font-semibold text-ink">Recommended practitioners</h3>
          <p className="text-sm text-muted">Swipe/scroll to browse your multidisciplinary circle.</p>
        </div>
        <div className="hidden gap-2 md:flex">
          <button 
            onClick={() => scrollBy("left")} 
            className="rounded-md border border-border bg-card px-3 py-1.5 hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button 
            onClick={() => scrollBy("right")} 
            className="rounded-md border border-border bg-card px-3 py-1.5 hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      {/* Scroller */}
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {items.map((p) => (
          <article
            key={p.id}
            className="min-w-[260px] snap-start rounded-2xl border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-page flex items-center justify-center">
                {p.avatarUrl ? (
                  <Image 
                    src={p.avatarUrl} 
                    alt={p.name} 
                    width={48} 
                    height={48}
                    className="object-cover"
                  />
                ) : (
                  <div className="text-muted text-lg font-semibold">
                    {p.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <div className="font-medium text-ink">{p.name}</div>
                <div className="text-sm text-muted">{p.specialty}</div>
              </div>
            </div>
            {p.clinic && <div className="mb-3 text-sm text-muted">{p.clinic}</div>}
            <div className="flex gap-2">
              <button className="rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors">
                Refer
              </button>
              <button className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors">
                View profile
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Hide scrollbar for webkit browsers */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
