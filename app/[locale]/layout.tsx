import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing"; // Ensure your routing object is correctly defined
import "./globals.scss";

// Import custom font
const outfitFont = localFont({
  src: "../../public/fonts/Outfit-VariableFont.ttf",
  fallback: ["sans-serif", "system-ui", "arial"],
});

// Function to generate metadata for a product or company based on locale
const generateProductMetadata = (product: string, locale: string): Metadata => {
  const productMetadata: { [key: string]: { [key: string]: Metadata } } = {
    gum: {
      en: {
        title: "Gumstar | Buy and Export Chewing Gums",
        description: "Gumstar offers high-quality chewing gums for sale and export at great prices.",
        keywords: ["chewing gum", "Gumstar", "gum export", "chewing gum wholesale"],
      },
      ru: {
        title: "Gumstar | Импорт и продажа жевательных резинок в Ташкенте",
        description: "Компания Gumstar в Ташкенте импортирует и продает высококачественные жевательные резинки. Лучшие цены и разнообразие продуктов для вашего удовольствия.",
        keywords: ["жевательная резинка", "Gumstar", "жевательные конфеты", "Ташкент", "жевательные резинки оптом", "жевательные резинки купить"],
      },
      uz: {
        title: "Gumstar | Yaxshi saqichlarni sotib olish va eksport qilish",
        description: "Gumstar kompaniyasi yuqori sifatli saqichlarni sotadi va eksport qiladi. Arzon narxlarda eng yaxshi saqichlar.",
        keywords: ["saqich", "Gumstar", "sag'ich eksporti", "sag'ich sotib olish", "Toshkent saqichlari"],
      },
    },
    exportGum: {
      en: {
        title: "Gumstar | Export Chewing Gums Worldwide",
        description: "Gumstar exports chewing gums globally with high-quality products for various markets.",
        keywords: ["gum export", "Gumstar", "chewing gum export", "wholesale gum export"],
      },
      ru: {
        title: "Gumstar | Экспорт жевательных резинок по всему миру",
        description: "Компания Gumstar в Ташкенте занимается экспортом жевательных резинок по всему миру. Мы предлагаем высококачественную продукцию для различных рынков.",
        keywords: ["экспорт жевательной резинки", "Gumstar", "жевательная резинка оптом", "жевательная резинка на экспорт", "Ташкент", "оптовая продажа жевательных резинок"],
      },
      uz: {
        title: "Gumstar | Saqichlarni butun dunyoga eksport qilish",
        description: "Gumstar kompaniyasi yuqori sifatli saqichlarni dunyo bo'ylab eksport qiladi.",
        keywords: ["sag'ich eksporti", "Gumstar", "sag'ichlar eksporti", "Toshkent saqichlari", "eng yaxshi saqich eksporti"],
      },
    },
  };

  const localeMetadata = productMetadata[product]?.[locale];
  return localeMetadata || productMetadata[product]?.en;
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
   {/* @ts-ignore */}
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Get messages based on the locale
   {/* @ts-ignore */}
  const messages = await getMessages(locale);

  // Generate metadata based on the current page or product (example: "gum" for a specific page)
  const productMetadata = generateProductMetadata("gum", locale); // Dynamically select product based on the route

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/png" href="/images/images/stars.png" />
         {/* @ts-ignore */}
        <title>{productMetadata.title}</title>
         {/* @ts-ignore */}
        <meta name="description" content={productMetadata.description} />
        {/* @ts-ignore */}
        <meta name="keywords" content={productMetadata.keywords.join(", ")} />
        {/* Add any other SEO-related meta tags here */}
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
