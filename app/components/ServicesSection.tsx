import type { Service } from "../data/content";

type Props = {
  services: Service[];
  infoSection: string;
  infoCard: string;
  mutedText: string;
  linkAccent: string;
  isDark: boolean;
};

export function ServicesSection({ services, infoSection, infoCard, mutedText, linkAccent, isDark }: Props) {
  return (
    <section className={infoSection}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">С чем поможем</h2>
          <p className={mutedText}>Выберите тип техники - мастер приедет с нужными деталями.</p>
        </div>
        <a className={`text-sm font-semibold ${linkAccent}`} href="#contact">
          Нужна консультация? Позвоните
        </a>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className={`${infoCard} transition hover:-translate-y-1 hover:shadow-lg`}>
            <div className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              {service.title}
            </div>
            <ul className={`mt-3 space-y-2 text-sm ${mutedText}`}>
              {service.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
