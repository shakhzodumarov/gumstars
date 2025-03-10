import { Metadata } from "next";

// Define product-specific metadata for Gumstar (Chewing Gums)
const productMetadata = {
  chewingGums: {
    title: {
      en: "Yuqori sifatli saqich sotib olish va eksport qilish | Gumstar",
      ru: "Купите и экспортируйте жевательную резинку высшего качества | Gumstar",
      uz: "Yuqori sifatli saqich sotib olish va eksport qilish | Gumstar",
    },
    description: {
      en: "Gumstar'dan eng yaxshi saqichlarni sotib oling. Turli xil ta'mlarga ega yuqori sifatli saqichlarni arzon narxlarda eksport qilamiz.",
      ru: "Купите жевательную резинку лучшего качества от Gumstar. Мы экспортируем жевательную резинку с различными вкусами по выгодным ценам.",
      uz: "Gumstar'dan turli xil ta'mlarga ega eng yaxshi saqichlarni sotib oling va eksport qiling. Eksport qilish uchun mos saqichlar va sifatli mahsulotlar.",
    },
    keywords: {
      en: [
        "chewing gum sotib olish",
        "export saqich",
        "yaxshi saqich",
        "Gumstar saqichlari",
        "sag'ich eksporti",
      ],
      ru: [
        "жевательная резинка купить",
        "экспорт жевательной резинки",
        "лучшая жевательная резинка",
        "жевательные резинки Gumstar",
        "экспорт жевательных резинок",
      ],
      uz: [
        "saqich sotib olish",
        "sag'ich eksporti",
        "Gumstar saqichlari",
        "chewing gum eksporti",
        "eng yaxshi saqich",
      ],
    },
    url: "/list/chewing-gum",
    uz: {
      title: "Yuqori sifatli saqich sotib olish va eksport qilish | Gumstar",
      description:
        "Gumstar'dan turli xil ta'mlarga ega eng yaxshi saqichlarni sotib oling va eksport qiling. Eksport qilish uchun mos saqichlar va sifatli mahsulotlar.",
      keywords: [
        "saqich sotib olish",
        "sag'ich eksporti",
        "Gumstar saqichlari",
        "chewing gum eksporti",
        "eng yaxshi saqich",
      ],
      url: "/uz/list/chewing-gum",
    },
  },
  flavoredGums: {
    title: {
      en: "Ta'mli saqich sotuv va eksport | Gumstar",
      ru: "Продажа и экспорт жевательной резинки с ароматами | Gumstar",
      uz: "Ta'mli saqich sotuv va eksport | Gumstar",
    },
    description: {
      en: "Gumstar'dan turli ta'mlarga ega saqichlar sotib oling va eksport qiling. Yangi ta'mlar bilan saqichni kashf eting va dunyoga eksport qiling.",
      ru: "Купите и экспортируйте жевательную резинку с различными вкусами от Gumstar. Откройте для себя новые ароматы и экспортируйте в мир.",
      uz: "Gumstar'dan yangi va xilma-xil ta'mlarga ega saqichlarni sotib oling va eksport qiling. Eksport uchun yuqori sifatli saqichlarni tanlang.",
    },
    keywords: {
      en: [
        "flavored chewing gum",
        "ta'mli saqich",
        "sag'ich eksporti",
        "Gumstar saqichlari",
        "saqich sotib olish",
      ],
      ru: [
        "жевательная резинка с ароматом",
        "жевательная резинка",
        "экспорт жевательной резинки с ароматом",
        "Gumstar жевательные резинки",
      ],
      uz: [
        "ta'mli saqich sotib olish",
        "sag'ich eksporti",
        "Gumstar ta'mli saqichlari",
        "chewing gum eksporti",
        "eng yaxshi ta'mli saqich",
      ],
    },
    url: "/list/flavored-gum",
    uz: {
      title: "Ta'mli saqich sotuv va eksport | Gumstar",
      description:
        "Gumstar'dan yangi va xilma-xil ta'mlarga ega saqichlarni sotib oling va eksport qiling. Eksport uchun yuqori sifatli saqichlarni tanlang.",
      keywords: [
        "ta'mli saqich sotib olish",
        "sag'ich eksporti",
        "Gumstar ta'mli saqichlari",
        "chewing gum eksporti",
        "eng yaxshi ta'mli saqich",
      ],
      url: "/uz/list/flavored-gum",
    },
  },
};

// Dynamic metadata generator
function generateMetadata(
  productKey: string,
  locale: "en" | "ru" | "uz" = "en"
): Metadata {
  const product = productMetadata[productKey];
  if (!product) {
    return {
      title: locale === "uz" ? "Gumstar | Saqichlar" : locale === "ru" ? "Gumstar | Жевательные резинки" : "Gumstar | Chewing Gums",
      description:
        locale === "uz"
          ? "Gumstar'dan saqichlar va eksport mahsulotlarini ko'rib chiqing."
          : locale === "ru"
          ? "Посмотрите жевательные резинки и экспортные продукты от Gumstar."
          : "Gumstar'dan turli saqichlar va eksport qilish xizmatlarini toping.",
      keywords:
        locale === "uz"
          ? "saqich, saqich eksporti, ta'mli saqich, Gumstar saqichlari"
          : locale === "ru"
          ? "жевательные резинки, экспорт жевательных резинок, Gumstar жевательные резинки"
          : "chewing gums, gum export, flavored chewing gum, Gumstar gums",
    };
  }
  const localized = product.title[locale] ? product : product;
  return {
    title: localized.title[locale],
    description: localized.description[locale],
    keywords: localized.keywords[locale].join(", "),
    openGraph: {
      title: localized.title[locale],
      description: localized.description[locale],
      url: localized.url,
    },
  };
}

export const metadata: Metadata = generateMetadata("chewingGums");

// Product Layout Component
const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ProductLayout;


