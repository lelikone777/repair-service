import { NextResponse } from "next/server";

type Payload = {
  name: string;
  phone: string;
  brand: string;
  issue: string;
};

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  if (!BOT_TOKEN || !CHAT_ID) {
    return NextResponse.json(
      { error: "Отправка отключена: не заданы TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID." },
      { status: 500 }
    );
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Некорректный формат запроса" }, { status: 400 });
  }

  const { name, phone, brand, issue } = body;
  if (![name, phone, brand, issue].every(Boolean)) {
    return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
  }

  const text = [
    "Новая заявка на ремонт",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Техника: ${brand}`,
    `Проблема: ${issue}`,
  ].join("\n");

  const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
    }),
  });

  if (!tgResponse.ok) {
    return NextResponse.json(
      { error: "Не удалось отправить в Telegram. Проверьте токен и chat id." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
