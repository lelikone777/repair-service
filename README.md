This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Telegram уведомления

Форма на главной отправляет данные на `/api/telegram`, который пересылает заявку в личные сообщения бота.

1. Создайте `.env.local` и укажите переменные:
   ```
   TELEGRAM_BOT_TOKEN=123456:ABC...        # токен бота
   TELEGRAM_CHAT_ID=123456789              # ваш chat id или id группы/канала
   ```
2. Перезапустите dev/server после добавления переменных.
3. Проверьте отправку, отправив форму на главной.

## Структура

- `app/page.tsx` — композиция секций страницы.
- `app/components/sections/*` — секции лендинга и форма.
- `app/components/layout/*` — шапка и подвал.
- `app/hooks/useThemeChoice.ts` — переключение и хранение темы.
- `app/lib/content.ts` — статический контент (услуги, цены, бренды).
- `app/lib/themeStyles.ts` — классы Tailwind для светлой/тёмной темы.
