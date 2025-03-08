import { Metadata } from "next";

// Define product-specific metadata for Gumstar (Chewing Gums)
const productMetadata = {
  chewingGums: {
    title: "Yuqori sifatli saqich sotib olish va eksport qilish | Gumstar",
    description:
      "Gumstar'dan eng yaxshi saqichlarni sotib oling. Turli xil ta'mlarga ega yuqori sifatli saqichlarni arzon narxlarda eksport qilamiz.",
    keywords: [
      "chewing gum sotib olish",
      "export saqich",
      "yaxshi saqich",
      "Gumstar saqichlari",
      "sag'ich eksporti",
    ],
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
    title: "Ta'mli saqich sotuv va eksport | Gumstar",
    description:
      "Gumstar'dan turli ta'mlarga ega saqichlar sotib oling va eksport qiling. Yangi ta'mlar bilan saqichni kashf eting va dunyoga eksport qiling.",
    keywords: [
      "flavored chewing gum",
      "ta'mli saqich",
      "sag'ich eksporti",
      "Gumstar saqichlari",
      "saqich sotib olish",
    ],
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
function generateMetadata(productKey: string, locale: "en" | "ru" | "uz" = "en"): Metadata {
  const product = productMetadata[productKey];
  if (!product) {
    return {
      title: locale === "uz" ? "Gumstar | Saqichlar" : "Gumstar | Chewing Gums",
      description:
        locale === "uz"
          ? "Gumstar'dan saqichlar va eksport mahsulotlarini ko'rib chiqing."
          : "Gumstar'dan turli saqichlar va eksport qilish xizmatlarini toping.",
      keywords:
        locale === "uz"
          ? "saqich, saqich eksporti, ta'mli saqich, Gumstar saqichlari"
          : "chewing gums, gum export, flavored chewing gum, Gumstar gums",
    };
  }
  const localized = locale === "uz" ? product.uz : product;
  return {
    title: localized.title,
    description: localized.description,
    keywords: localized.keywords.join(", "),
    openGraph: {
      title: localized.title,
      description: localized.description,
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

