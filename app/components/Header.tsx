import Link from "next/link";

const navLinks = [
  { label: "Новое", href: "#", hasCaret: true },
  { label: "Тарифы", href: "#" },
  { label: "Контакты", href: "#contact" },
];

const socialLinks = [
  { label: "TG", href: "#" },
  { label: "VK", href: "#" },
  { label: "WA", href: "#" },
];

function LogoIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <rect x="4" y="6" width="32" height="26" rx="8" fill="url(#logo-gradient)" />
      <rect x="10" y="12" width="12" height="8" rx="2" fill="white" />
      <rect x="24" y="16" width="8" height="10" rx="2" fill="#1d4ed8" />
      <circle cx="30" cy="10" r="4" fill="#fbbf24" />
    </svg>
  );
}

function CaretIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden="true">
      <path fill="currentColor" d="M5.5 7.25 10 11.75l4.5-4.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.62 10.79a15.06 15.06 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1C10.4 21.01 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.23.2 2.43.57 3.56a1 1 0 0 1-.25 1.01l-2.2 2.2Z"
      />
    </svg>
  );
}

export function Header() {
  return (
    <header className="mx-auto w-full max-w-6xl px-6 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/95 px-6 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
        <div className="flex items-center gap-3">
          <LogoIcon />
          <div className="text-base font-semibold text-slate-800">Company</div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-500 md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="flex items-center gap-1 font-medium hover:text-slate-800">
              {link.label}
              {link.hasCaret ? <CaretIcon /> : null}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="hidden items-center gap-2 text-slate-600 sm:flex">
            <PhoneIcon />
            <span className="font-semibold">+7 9877 654-32-10</span>
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-200"
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
