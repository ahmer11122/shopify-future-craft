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

export type Product = {
  id: string;
  name: string;
  fabric: string;
  price: number;
  compareAt?: number;
  tag?: string;
  front: string;
  back: string;
  category: "Lawn" | "Formal" | "Stitched" | "Unstitched";
  colors: { name: string; hex: string }[];
  sizes: string[];
  rating: number;
  reviews: number;
};

export const products: Product[] = [
  {
    id: "sage-noor",
    name: "Noor",
    fabric: "Unstitched · 3 Piece Lawn",
    price: 6450,
    tag: "True to Size",
    front: p1a,
    back: p1b,
    category: "Unstitched",
    colors: [
      { name: "Sage", hex: "#9aa886" },
      { name: "Ivory", hex: "#efe7d8" },
    ],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.8,
    reviews: 214,
  },
  {
    id: "maroon-gulnar",
    name: "Gulnar",
    fabric: "Stitched · Formal Chiffon",
    price: 18900,
    compareAt: 24500,
    tag: "Bestseller",
    front: p2a,
    back: p2b,
    category: "Formal",
    colors: [
      { name: "Maroon", hex: "#6d1f2c" },
      { name: "Onyx", hex: "#1c1c1c" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 388,
  },
  {
    id: "blue-saher",
    name: "Saher",
    fabric: "Stitched · Printed Lawn",
    price: 5200,
    tag: "New In",
    front: p3a,
    back: p3b,
    category: "Stitched",
    colors: [
      { name: "Sky", hex: "#a9c4d8" },
      { name: "Blush", hex: "#e3c3c0" },
    ],
    sizes: ["XS", "S", "M"],
    rating: 4.7,
    reviews: 96,
  },
  {
    id: "black-shab",
    name: "Shab",
    fabric: "Unstitched · Embroidered",
    price: 12400,
    compareAt: 15500,
    front: p4a,
    back: p4b,
    category: "Unstitched",
    colors: [
      { name: "Onyx", hex: "#1c1c1c" },
      { name: "Gold", hex: "#c5a059" },
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 152,
  },
  {
    id: "sage-meher",
    name: "Meher",
    fabric: "Stitched · Chikankari Lawn",
    price: 8900,
    tag: "Low Stock",
    front: look1,
    back: p1b,
    category: "Lawn",
    colors: [{ name: "Sage", hex: "#9aa886" }],
    sizes: ["S", "M", "L"],
    rating: 4.9,
    reviews: 74,
  },
  {
    id: "zari-rang",
    name: "Rang",
    fabric: "Stitched · Zari Formal",
    price: 22500,
    compareAt: 27000,
    tag: "Editor's Pick",
    front: look2,
    back: p2b,
    category: "Formal",
    colors: [
      { name: "Crimson", hex: "#9d2235" },
      { name: "Gold", hex: "#c5a059" },
    ],
    sizes: ["M", "L", "XL"],
    rating: 5,
    reviews: 41,
  },
  {
    id: "ivory-sehr",
    name: "Sehr",
    fabric: "Stitched · Ivory Lawn",
    price: 6900,
    front: look3,
    back: p3b,
    category: "Lawn",
    colors: [{ name: "Ivory", hex: "#efe7d8" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 121,
  },
  {
    id: "onyx-raat",
    name: "Raat",
    fabric: "Stitched · Embroidered Formal",
    price: 16800,
    tag: "Back In Stock",
    front: look4,
    back: p4b,
    category: "Formal",
    colors: [{ name: "Onyx", hex: "#1c1c1c" }],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviews: 205,
  },
];

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

export const formatPKR = (value: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);

export const sizeChart = [
  { size: "XS", chest: "34", waist: "30", hip: "36", length: "40" },
  { size: "S", chest: "36", waist: "32", hip: "38", length: "40.5" },
  { size: "M", chest: "38", waist: "34", hip: "40", length: "41" },
  { size: "L", chest: "40", waist: "36", hip: "42", length: "41.5" },
  { size: "XL", chest: "42", waist: "38", hip: "44", length: "42" },
];
