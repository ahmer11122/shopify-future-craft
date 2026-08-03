import p1a from "@/assets/p1a.jpg";
import p1b from "@/assets/p1b.jpg";
import p2a from "@/assets/p2a.jpg";
import p2b from "@/assets/p2b.jpg";
import p3a from "@/assets/p3a.jpg";
import p3b from "@/assets/p3b.jpg";
import p4a from "@/assets/p4a.jpg";
import p4b from "@/assets/p4b.jpg";
import look1 from "@/assets/look1.jpg";
import look2 from "@/assets/look2.jpg";
import look3 from "@/assets/look3.jpg";
import look4 from "@/assets/look4.jpg";
import editorial from "@/assets/editorial.jpg";
import cat1 from "@/assets/cat1.jpg";
import cat2 from "@/assets/cat2.jpg";
import cat3 from "@/assets/cat3.jpg";
import cat4 from "@/assets/cat4.jpg";

import d1 from "@/assets/banners/desktop_1.webp";
import m1 from "@/assets/banners/mobile_1.webp";
import d2 from "@/assets/banners/desktop_2.webp";
import m2 from "@/assets/banners/mobile_2.webp";
import d3 from "@/assets/banners/desktop_3.webp";
import m3 from "@/assets/banners/mobile_3.webp";
import d4 from "@/assets/banners/desktop_4.webp";
import m4 from "@/assets/banners/mobile_4.webp";

export type Category = "Lawn" | "Formal" | "Stitched" | "Unstitched";

export type Product = {
  id: string;
  name: string;
  fabric: string;
  price: number;
  compareAt?: number;
  tag?: string;
  front: string;
  back: string;
  gallery: string[];
  category: Category;
  colors: { name: string; hex: string; soldOut?: boolean }[];
  sizes: string[];
  /** Sizes shown but marked unavailable rather than hidden. */
  soldOutSizes?: string[];
  rating: number;
  reviews: number;
  description: string;
  details: string[];
  new?: boolean;
  stock: number;

};

export const products: Product[] = [
  {
    id: "noor",
    name: "Noor",
    fabric: "Unstitched · 3 Piece Lawn",
    price: 6450,
    tag: "True to Size",
    front: p1a,
    back: p1b,
    gallery: [p1a, p1b, editorial, look1],
    category: "Unstitched",
    colors: [
      { name: "Sage", hex: "#9aa886" },
      { name: "Ivory", hex: "#efe7d8" },
    ],
    sizes: ["XS", "S", "M", "L"],
    soldOutSizes: ["XS"],
    rating: 4.8,
    reviews: 214,
    new: true,
    stock: 12,
    description:
      "A three piece unstitched lawn in a soft sage, printed on 120 thread count cambric with a self-embroidered front panel. The dupatta is full width chiffon, finished by hand.",
    details: [
      "Shirt 3.0 m printed lawn · Dupatta 2.5 m chiffon · Trouser 2.5 m cambric",
      "Colours photographed in daylight, unedited",
      "Dry clean recommended for the first wash",
    ],
  },
  {
    id: "gulnar",
    name: "Gulnar",
    fabric: "Stitched · Formal Chiffon",
    price: 18900,
    compareAt: 24500,
    tag: "Bestseller",
    front: p2a,
    back: p2b,
    gallery: [p2a, p2b, look2, editorial],
    category: "Formal",
    colors: [
      { name: "Maroon", hex: "#6d1f2c" },
      { name: "Onyx", hex: "#1c1c1c", soldOut: true },
    ],
    sizes: ["S", "M", "L", "XL"],
    soldOutSizes: ["XL"],
    rating: 4.9,
    reviews: 388,
    stock: 5,
    description:
      "Pure chiffon shirt with hand-worked gold zari on the panel and sleeves, paired with a raw silk trouser and a scalloped organza dupatta. Cut close through the bust and released at the hip.",
    details: [
      "Hand embroidery · 46 hours per shirt",
      "Fully lined shirt with raw silk trouser",
      "Model is 5'7\" and wears a size S",
    ],
  },
  {
    id: "saher",
    name: "Saher",
    fabric: "Stitched · Printed Lawn",
    price: 5200,
    tag: "New In",
    front: p3a,
    back: p3b,
    gallery: [p3a, p3b, look3, cat3],
    category: "Stitched",
    colors: [
      { name: "Sky", hex: "#a9c4d8" },
      { name: "Blush", hex: "#e3c3c0" },
    ],
    sizes: ["XS", "S", "M"],
    rating: 4.7,
    reviews: 96,
    new: true,
    stock: 22,
    description:
      "An everyday printed lawn kurta with a relaxed A-line fall, side slits and a plain cambric trouser. Made for Karachi summers.",
    details: ["Ready to wear · Machine wash cold", "Side pockets", "Trouser included"],
  },
  {
    id: "shab",
    name: "Shab",
    fabric: "Unstitched · Embroidered",
    price: 12400,
    compareAt: 15500,
    front: p4a,
    back: p4b,
    gallery: [p4a, p4b, cat1, look4],
    category: "Unstitched",
    colors: [
      { name: "Onyx", hex: "#1c1c1c" },
      { name: "Gold", hex: "#c5a059", soldOut: true },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 152,
    stock: 8,
    description:
      "Black embroidered three piece with antique gold thread across the neckline and daaman, cut to be stitched your own way.",
    details: ["Embroidered front, sleeves and daaman", "Organza dupatta", "Unstitched"],
  },
  {
    id: "meher",
    name: "Meher",
    fabric: "Stitched · Chikankari Lawn",
    price: 8900,
    tag: "Low Stock",
    front: look1,
    back: p1b,
    gallery: [look1, p1b, editorial, cat3],
    category: "Lawn",
    colors: [{ name: "Sage", hex: "#9aa886" }],
    sizes: ["S", "M", "L"],
    soldOutSizes: ["L"],
    rating: 4.9,
    reviews: 74,
    new: true,
    stock: 3,
    description:
      "White-on-sage chikankari, hand-worked in Lucknow stitch on fine lawn. Light enough for a long day, formal enough for a nikkah lunch.",
    details: ["Hand chikankari", "Lined shirt", "Cotton trouser included"],
  },
  {
    id: "rang",
    name: "Rang",
    fabric: "Stitched · Zari Formal",
    price: 22500,
    compareAt: 27000,
    tag: "Editor's Pick",
    front: look2,
    back: p2b,
    gallery: [look2, p2b, cat2, editorial],
    category: "Formal",
    colors: [
      { name: "Crimson", hex: "#9d2235" },
      { name: "Gold", hex: "#c5a059" },
    ],
    sizes: ["M", "L", "XL"],
    soldOutSizes: ["M"],
    rating: 5,
    reviews: 41,
    stock: 4,
    description:
      "A crimson zari formal for the shaadi season — heavy on the daaman, quiet everywhere else.",
    details: ["Zari and sequin work", "Raw silk lining", "Made to order in 7 days"],
  },
  {
    id: "sehr",
    name: "Sehr",
    fabric: "Stitched · Ivory Lawn",
    price: 6900,
    front: look3,
    back: p3b,
    gallery: [look3, p3b, cat4, look1],
    category: "Lawn",
    colors: [{ name: "Ivory", hex: "#efe7d8" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 121,
    stock: 30,
    description:
      "The ivory base every wardrobe needs — plain lawn, pintucked yoke, and a dupatta you can dye later.",
    details: ["Pintucked yoke", "Ready to wear", "Full width dupatta"],
  },
  {
    id: "raat",
    name: "Raat",
    fabric: "Stitched · Embroidered Formal",
    price: 16800,
    tag: "Back In Stock",
    front: look4,
    back: p4b,
    gallery: [look4, p4b, cat2, editorial],
    category: "Formal",
    colors: [{ name: "Onyx", hex: "#1c1c1c" }],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviews: 205,
    stock: 9,
    description:
      "Midnight black with tonal thread work — the dinner suit of the collection.",
    details: ["Tonal embroidery", "Straight cut", "Organza dupatta"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export type Collection = {
  handle: string;
  title: string;
  blurb: string;
  image: string;
  match: (p: Product) => boolean;
};

export const collections: Collection[] = [
  {
    handle: "new-arrivals",
    title: "New Arrivals",
    blurb: "This week's drop — lawn, chikankari and everyday stitched pieces.",
    image: cat3,
    match: (p) => !!p.new,
  },
  {
    handle: "unstitched",
    title: "Unstitched",
    blurb: "Three piece suits, cut and stitched your own way.",
    image: cat1,
    match: (p) => p.category === "Unstitched",
  },
  {
    handle: "stitched",
    title: "Stitched",
    blurb: "Ready to wear, measured in inches, dispatched within 24 hours.",
    image: cat3,
    match: (p) => p.category === "Stitched",
  },
  {
    handle: "lawn",
    title: "Lawn",
    blurb: "Fine cambric and cotton lawn for the long Pakistani summer.",
    image: cat4,
    match: (p) => p.category === "Lawn",
  },
  {
    handle: "formal",
    title: "Formals",
    blurb: "Chiffon, zari and hand embroidery for the shaadi season.",
    image: cat2,
    match: (p) => p.category === "Formal",
  },
  {
    handle: "chikankari",
    title: "Chikankari",
    blurb: "Hand-worked Lucknow stitch on fine lawn and cotton net.",
    image: cat3,
    match: (p) => /chikankari/i.test(p.fabric) || /chikankari/i.test(p.description),
  },
  {
    handle: "wedding",
    title: "Wedding & Shaadi",
    blurb: "Zari, chiffon and hand embroidery for the whole function season.",
    image: cat2,
    match: (p) => p.category === "Formal",
  },
  {
    handle: "everyday",
    title: "Everyday Edit",
    blurb: "Light lawn and stitched kurtas under Rs. 10,000.",
    image: cat4,
    match: (p) => p.price < 10000,
  },
  {
    handle: "sale",
    title: "Sale",
    blurb: "Final reductions on last-season formals and unstitched.",
    image: cat2,
    match: (p) => !!p.compareAt,
  },
];

export const getCollection = (handle: string) =>
  collections.find((c) => c.handle === handle);

export const productsIn = (c: Collection) => products.filter(c.match);

export const categories = ["All", "Lawn", "Stitched", "Unstitched", "Formal"] as const;
export const allSizes = ["XS", "S", "M", "L", "XL"];
export const allColors = [
  { name: "Ivory", hex: "#efe7d8" },
  { name: "Sage", hex: "#9aa886" },
  { name: "Maroon", hex: "#6d1f2c" },
  { name: "Onyx", hex: "#1c1c1c" },
  { name: "Sky", hex: "#a9c4d8" },
  { name: "Gold", hex: "#c5a059" },
  { name: "Blush", hex: "#e3c3c0" },
  { name: "Crimson", hex: "#9d2235" },
];

const pk = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });
export const formatPKR = (value: number) => `Rs. ${pk.format(value)}`;

export const sizeChart = [
  { size: "XS", chest: "34", waist: "30", hip: "36", length: "40" },
  { size: "S", chest: "36", waist: "32", hip: "38", length: "40.5" },
  { size: "M", chest: "38", waist: "34", hip: "40", length: "41" },
  { size: "L", chest: "40", waist: "36", hip: "42", length: "41.5" },
  { size: "XL", chest: "42", waist: "38", hip: "44", length: "42" },
];

export const heroSlides = [
  {
    desktopSrc: d1,
    mobileSrc: m1,
    desktopAlign: "left",
    headline: "Elegance Redefined",
    subheadline: "Discover Our Exquisite Formal Collection",
    cta: "Shop Formal Wear",
    link: "formal"
  },
  {
    desktopSrc: d2,
    mobileSrc: m2,
    desktopAlign: "right",
    headline: "Summer Breeze Collection",
    subheadline: "Lightweight & Luxurious Lawn Prints",
    cta: "Shop Lawn Collection",
    link: "lawn"
  },
  {
    desktopSrc: d3,
    mobileSrc: m3,
    desktopAlign: "left",
    headline: "Craft Your Style",
    subheadline: "Premium Unstitched Fabrics Await",
    cta: "Discover Unstitched",
    link: "unstitched"
  },
  {
    desktopSrc: d4,
    mobileSrc: m4,
    desktopAlign: "left",
    headline: "Effortless Chic",
    subheadline: "Ready-to-Wear for the Modern Woman",
    cta: "Shop Pret Collection",
    link: "stitched"
  }
];

/** Labels stocked in the Mehr multi-brand edit — rendered as typographic marks. */
export const brands = [
  { name: "Zara Shahjahan", note: "Luxe Lawn", since: "2012" },
  { name: "Sana Safinaz", note: "Prêt", since: "1989" },
  { name: "Elan", note: "Couture", since: "2010" },
  { name: "Khaadi", note: "Everyday", since: "1998" },
  { name: "Maria B.", note: "Formals", since: "1999" },
  { name: "Nishat Linen", note: "Unstitched", since: "1951" },
  { name: "Cross Stitch", note: "Lawn", since: "2013" },
  { name: "Gul Ahmed", note: "Heritage", since: "1953" },
];
