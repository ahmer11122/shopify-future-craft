import p1a from "@/assets/p1a.jpg";
import p1b from "@/assets/p1b.jpg";
import p2a from "@/assets/p2a.jpg";
import p2b from "@/assets/p2b.jpg";
import p3a from "@/assets/p3a.jpg";
import p3b from "@/assets/p3b.jpg";
import p4a from "@/assets/p4a.jpg";
import p4b from "@/assets/p4b.jpg";

export type Product = {
  id: string;
  name: string;
  fabric: string;
  price: number;
  compareAt?: number;
  tag?: string;
  front: string;
  back: string;
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
  },
  {
    id: "blue-saher",
    name: "Saher",
    fabric: "Stitched · Printed Lawn",
    price: 5200,
    tag: "New In",
    front: p3a,
    back: p3b,
  },
  {
    id: "black-shab",
    name: "Shab",
    fabric: "Unstitched · Embroidered",
    price: 12400,
    compareAt: 15500,
    front: p4a,
    back: p4b,
  },
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
