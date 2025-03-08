import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing"; // Ensure your routing object is correctly defined
import Head from "next/head"; // Import Head for setting dynamic metadata
import "./globals.scss";

// Import custom font
const outfitFont = localFont({
  src: "../../public/fonts/Outfit-VariableFont.ttf",
  fallback: ["sans-serif", "system-ui", "arial"],
});

// Function to generate metadata for a product or company
const generateProductMetadata = (product: string): Metadata => {
  const productMetadata: { [key: string]: Metadata } = {
    gum: {
      title: "Gumstar | Импорт и продажа жевательных резинок в Ташкенте",
      description: "Компания Gumstar в Ташкенте импортирует и продает высококачественные жевательные резинки. Лучшие цены и разнообразие продуктов для вашего удовольствия.",
      keywords: ["жевательная резинка", "Gumstar", "жевательные конфеты", "Ташкент", "жевательные резинки оптом", "жевательные резинки купить"],
    },
    exportGum: {
      title: "Gumstar | Экспорт жевательных резинок по всему миру",
      description: "Компания Gumstar в Ташкенте занимается экспортом жевательных резинок по всему миру. Мы предлагаем высококачественную продукцию для различных рынков.",
      keywords: ["экспорт жевательной резинки", "Gumstar", "жевательная резинка оптом", "жевательная резинка на экспорт", "Ташкент", "оптовая продажа жевательных резинок"],
    },
  };

  return productMetadata[product] || {
    title: "Gumstar | Импорт и продажа жевательных резинок",
    description: "Компания Gumstar из Ташкента занимается импортом, экспортом и продажей высококачественных жевательных резинок. Откройте для себя лучшие продукты по отличным ценам.",
    keywords: ["Gumstar", "жевательная резинка", "жевательные резинки", "Ташкент", "продажа жевательных резинок", "оптовая продажа жевательных резинок"],
  };
};

// Main RootLayout component
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Await params for dynamic routes
  const { locale } = await params; // Await the params object

  // Check if locale is valid
  //@ts-ignore
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Get messages based on the locale
  //@ts-ignore
  const messages = await getMessages(locale);

  // Generate metadata based on the current page or product (example: "gum" for a specific page)
  const productMetadata = generateProductMetadata("gum"); // Change to dynamically select product type

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/png" href="/images/images/gumstars.png" />
        {/* @ts-ignore */}
        <title>{productMetadata.title}</title>
        {/* @ts-ignore */}
        <meta name="description" content={productMetadata.description} />
        {/* @ts-ignore */}
        <meta name="keywords" content={productMetadata.keywords.join(", ")} />
      </head>
      <body className={outfitFont.className}>
        {/* Providing messages and internationalization context */}
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
