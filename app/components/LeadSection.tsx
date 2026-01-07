import { LeadForm } from "./LeadForm";

export function LeadSection() {
  return (
    <section className="rounded-3xl bg-white/95 p-8 text-center shadow-[0_18px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
      <h2 className="text-xl font-semibold text-slate-700">Оставьте заявку — перезвоним за 5 минут!</h2>
      <div className="mx-auto mt-6 max-w-3xl">
        <LeadForm />
      </div>
    </section>
  );
}
