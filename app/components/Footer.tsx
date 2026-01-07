export function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200/80 bg-white/90 py-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div>© {new Date().getFullYear()} Ремонт крупной бытовой техники</div>
        <div className="flex flex-wrap gap-3">
          <span>ИНН 0000000000</span>
          <span>ОГРН 0000000000000</span>
          <a className="text-sky-600 hover:text-sky-500" href="#">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
