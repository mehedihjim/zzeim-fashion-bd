export type Gender = "ladies" | "gentlemen";

export type Product = {
  slug: string;
  name: string;
  price: number;
  gender: Gender | "unisex";
  category: string;
  colors: string[]; // css colors for swatches
  image?: string; // card image, e.g. "/products/silk-slip-dress.jpg"
  gallery?: string[]; // detail page images (falls back to `image`)
  description?: string;
  details?: string[]; // fabric, fit, care...
  sizes?: string[]; // falls back to a default range per gender
  isNew?: boolean;
};

// Order = "Featured" order. Later items = older.
const items: Product[] = [
  {
    slug: "silk-slip-dress",
    name: "Silk Slip Dress",
    price: 240,
    gender: "ladies",
    category: "Dresses",
    colors: ["#5b1a2b", "#111"],
    isNew: true,
  },
  {
    slug: "wool-overcoat",
    name: "Wool Overcoat",
    price: 420,
    gender: "gentlemen",
    category: "Outerwear",
    colors: ["#2b2b2b", "#8a7a66"],
    isNew: true,
  },
  {
    slug: "pleated-trouser",
    name: "Pleated Trouser",
    price: 165,
    gender: "ladies",
    category: "Trousers",
    colors: ["#111", "#c9b8a6"],
  },
  {
    slug: "oxford-shirt",
    name: "Oxford Shirt",
    price: 110,
    gender: "gentlemen",
    category: "Shirts",
    colors: ["#f2f2f2", "#9db4c8"],
  },
  {
    slug: "boxy-tee",
    name: "Boxy Tee",
    price: 60,
    gender: "unisex",
    category: "Tops",
    colors: ["#111", "#f2f2f2", "#5b1a2b"],
  },
  {
    slug: "tailored-blazer",
    name: "Tailored Blazer",
    price: 320,
    gender: "ladies",
    category: "Outerwear",
    colors: ["#111", "#5b1a2b"],
  },
  {
    slug: "straight-denim",
    name: "Straight Denim",
    price: 130,
    gender: "gentlemen",
    category: "Trousers",
    colors: ["#2d3a4f", "#111"],
  },
  {
    slug: "satin-blouse",
    name: "Satin Blouse",
    price: 150,
    gender: "ladies",
    category: "Tops",
    colors: ["#e8d9d0", "#111"],
  },
  {
    slug: "knit-polo",
    name: "Knit Polo",
    price: 120,
    gender: "gentlemen",
    category: "Tops",
    colors: ["#111", "#8a7a66"],
  },
  {
    slug: "midi-wrap-dress",
    name: "Midi Wrap Dress",
    price: 210,
    gender: "ladies",
    category: "Dresses",
    colors: ["#111", "#5b1a2b"],
  },
  {
    slug: "utility-jacket",
    name: "Utility Jacket",
    price: 260,
    gender: "gentlemen",
    category: "Outerwear",
    colors: ["#4a4d3a", "#111"],
  },
  {
    slug: "ribbed-knit-sweater",
    name: "Ribbed Knit Sweater",
    price: 140,
    gender: "unisex",
    category: "Knitwear",
    colors: ["#f2f2f2", "#111"],
  },
];

const demo = (seed: string) => `https://picsum.photos/seed/${seed}/900/1200`; // 3:4, same seed = same image

export const products: Product[] = items.map((p) => ({
  ...p,
  image: p.image ?? demo(p.slug),
  gallery: p.gallery ?? [
    demo(p.slug),
    demo(`${p.slug}-2`),
    demo(`${p.slug}-3`),
  ],
}));
