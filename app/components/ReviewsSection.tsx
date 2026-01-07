"use client";

import Image from "next/image";
import { useState } from "react";
import type { Review } from "../data/content";

const reviewImage =
  "https://plus.unsplash.com/premium_photo-1661342474567-f84bb6959d9f?auto=format&fit=crop&w=1200&q=80";

type Props = {
  reviews: Review[];
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

function StarIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
      <path
        fill={active ? "#facc15" : "#cbd5f5"}
        d="m10 1.9 2.3 4.7 5.1.7-3.7 3.6.9 5.1-4.6-2.4-4.6 2.4.9-5.1-3.7-3.6 5.1-.7L10 1.9Z"
      />
    </svg>
  );
}

export function ReviewsSection({ reviews }: Props) {
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  const prev = () => setIndex((current) => (current === 0 ? reviews.length - 1 : current - 1));
  const next = () => setIndex((current) => (current === reviews.length - 1 ? 0 : current + 1));

  return (
    <section className="space-y-6">
      <h2 className="text-center text-xl font-semibold text-slate-700">Отзывы наших клиентов</h2>
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
        <Image src={reviewImage} alt="Отзыв клиента" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-white/30 to-transparent" />
        <div className="relative grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl bg-white/90 p-6 shadow-lg">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <StarIcon key={`star-${starIndex}`} active={starIndex < review.rating} />
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-700">{review.text}</p>
            <div className="mt-4 inline-flex rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow">
              {review.name}, {review.service}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={prev}
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow hover:bg-white"
          aria-label="Предыдущий отзыв"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow hover:bg-white"
          aria-label="Следующий отзыв"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
      <div className="text-center text-sm text-slate-600">
        Более <span className="font-semibold text-slate-800">90%</span> клиентов рекомендуют нас
      </div>
    </section>
  );
}
