export type Category = { title: string; icon: "fridge" | "washer" | "dishwasher" | "oven" | "cooktop" };
export type HeroBenefit = { text: string };
export type WhyUsItem = { title: string; icon: "home" | "tag" | "shield" | "wallet" | "calendar" };
export type Step = { title: string; text: string };
export type PriceItem = { title: string; from: number };
export type Review = { name: string; service: string; rating: number; text: string };

export const categories: Category[] = [
  { title: "Холодильники", icon: "fridge" },
  { title: "Стиральные машины", icon: "washer" },
  { title: "Посудомойки", icon: "dishwasher" },
  { title: "Плиты и духовки", icon: "oven" },
  { title: "Варочные панели", icon: "cooktop" },
];

export const heroBenefits: HeroBenefit[] = [
  { text: "Оригинальные комплектующие" },
  { text: "Гарантия до 12 месяцев" },
  { text: "Прозрачные цены" },
];

export const whyUs: WhyUsItem[] = [
  { title: "Ремонт на дому за 1 визит", icon: "home" },
  { title: "Цена фиксируется заранее", icon: "tag" },
  { title: "Без навязанных услуг", icon: "shield" },
  { title: "Оплата после ремонта", icon: "wallet" },
  { title: "Работаем без выходных", icon: "calendar" },
];

export const steps: Step[] = [
  { title: "Заявка", text: "Звонок или сообщение" },
  { title: "Диагностика", text: "Точная причина поломки" },
  { title: "Согласование", text: "Фиксируем цену ремонта" },
  { title: "Ремонт и гарантия", text: "Выполним и выдадим гарантию" },
];

export const prices: PriceItem[] = [
  { title: "Диагностика", from: 500 },
  { title: "Замена насоса", from: 1800 },
  { title: "Заправка кондиционера", from: 2500 },
];

export const guaranteePoints = [
  "Оригинальные детали и прозрачные аналоги",
  "Гарантия до 12 месяцев",
  "Точная стоимость — до начала ремонта",
];

export const reviews: Review[] = [
  {
    name: "Анна",
    service: "Стиральная машина",
    rating: 5,
    text: "Мастер приехал в день обращения, быстро нашел причину поломки. Цена совпала с озвученной по телефону. Всё работает отлично, дали гарантию.",
  },
  {
    name: "Артём",
    service: "Холодильник",
    rating: 5,
    text: "Понравилась пунктуальность и аккуратность. Объяснили, что сломалось, и сразу устранили проблему.",
  },
  {
    name: "Елена",
    service: "Посудомоечная машина",
    rating: 4,
    text: "Приехали в удобное время, мастер вежливый, привез детали. Всё работает без нареканий.",
  },
];

export const brands = [
  "Samsung",
  "Bosch",
  "LG",
  "Electrolux",
  "Whirlpool",
  "Atlant",
  "Haier",
  "Beko",
  "Gorenje",
  "Zanussi",
  "Ariston",
  "AEG",
  "Siemens",
  "Candy",
  "Vestfrost",
];
