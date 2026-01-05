"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Review } from "../data/content";

type Props = {
  reviews: Review[];
  infoSection: string;
  mutedText: string;
  isDark: boolean;
  infoCard: string;
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d={
          direction === "left"
            ? "M12.78 15.53a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 1 1 1.06 1.06L8.81 10l3.97 3.97a.75.75 0 0 1 0 1.06Z"
            : "M7.22 4.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06L11.19 10 7.22 6.03a.75.75 0 0 1 0-1.06Z"
        }
      />
    </svg>
  );
}

export function ReviewsSection({ reviews, infoSection, mutedText, isDark, infoCard }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const updatePages = () => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector<HTMLElement>("[data-review-card]");
      if (!card) return;
      const styles = window.getComputedStyle(track);
      const gapValue = Number.parseFloat(styles.columnGap);
      const gap = Number.isNaN(gapValue) ? 0 : gapValue;
      const cardWidth = card.offsetWidth + gap;
      const perView = Math.max(1, Math.floor(track.clientWidth / cardWidth));
      const nextPageCount = Math.max(1, Math.ceil(reviews.length / perView));
      setPageCount(nextPageCount);
      setPage((prev) => Math.min(prev, nextPageCount - 1));
    };

    updatePages();
    window.addEventListener("resize", updatePages);
    return () => window.removeEventListener("resize", updatePages);
  }, [reviews.length]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((acc, item) => acc + item.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }, [reviews]);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const nextPage = Math.round(track.scrollLeft / track.clientWidth);
    setPage(nextPage);
  };

  const scrollToPage = (nextPage: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: nextPage * track.clientWidth, behavior: "smooth" });
    setPage(nextPage);
  };

  const canPrev = page > 0;
  const canNext = page < pageCount - 1;

  return (
    <section className={infoSection}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.18em] text-slate-300">Отзывы клиентов</div>
          <h2 className="text-2xl font-semibold">Нас рекомендуют</h2>
          <p className={mutedText}>
            Реальные отзывы о ремонте крупной бытовой техники в Москве и области.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`text-sm ${mutedText}`}>Средняя оценка: {averageRating}/5</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToPage(page - 1)}
              disabled={!canPrev}
              className={`rounded-full border px-2 py-2 text-sm transition ${
                canPrev
                  ? isDark
                    ? "border-white/10 text-slate-100 hover:bg-white/10"
                    : "border-slate-200 text-slate-700 hover:bg-slate-100"
                  : "border-transparent text-slate-500/60"
              }`}
              aria-label="Предыдущие отзывы"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => scrollToPage(page + 1)}
              disabled={!canNext}
              className={`rounded-full border px-2 py-2 text-sm transition ${
                canNext
                  ? isDark
                    ? "border-white/10 text-slate-100 hover:bg-white/10"
                    : "border-slate-200 text-slate-700 hover:bg-slate-100"
                  : "border-transparent text-slate-500/60"
              }`}
              aria-label="Следующие отзывы"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4"
      >
        {reviews.map((review) => (
          <article
            key={`${review.name}-${review.service}`}
            data-review-card
            className={`min-w-full snap-start sm:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(33.333%-0.75rem)] ${infoCard} flex flex-col gap-3`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className={`text-base font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                  {review.name}
                </div>
                <div className={`text-xs ${mutedText}`}>{review.city}</div>
              </div>
              <div className={`text-xs ${isDark ? "text-sky-200" : "text-sky-700"}`}>
                Оценка: {review.rating} из 5
              </div>
            </div>
            <div className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-slate-300" : "text-slate-500"}`}>
              {review.service}
            </div>
            <p className={`text-sm ${mutedText}`}>{review.text}</p>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: pageCount }).map((_, index) => (
          <span
            key={`dot-${index}`}
            className={`h-1.5 w-6 rounded-full transition ${
              index === page ? (isDark ? "bg-sky-400" : "bg-sky-600") : isDark ? "bg-white/10" : "bg-slate-200"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
