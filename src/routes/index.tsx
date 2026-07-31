import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/store/Header";
import { Hero } from "@/components/store/Hero";
import { TrustBand } from "@/components/store/TrustBand";
import { CategoryTiles } from "@/components/store/CategoryTiles";
import { CollectionGrid } from "@/components/store/CollectionGrid";
import { ImageRail, TestimonialRail, Community } from "@/components/store/Marquee";
import { Editorial } from "@/components/store/Editorial";
import { ProductDetail } from "@/components/store/ProductDetail";
import { Faq } from "@/components/store/Faq";
import { CartDrawer } from "@/components/store/CartDrawer";
import { EmailBar, FloatingWhatsApp } from "@/components/store/Floating";
import { Footer } from "@/components/store/Footer";
import { useReveal } from "@/hooks/useReveal";

const title = "Mehr — Quiet Luxury Shopify Theme for Pakistani Womenswear";
const description =
  "A premium 2026 Shopify theme concept for Pakistani women's fashion: glass navigation, live search, drifting lookbook rails, filterable collection grid, inch-based sizing, COD trust and WhatsApp ordering.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [cartOpen, setCartOpen] = useState(false);
  const [count, setCount] = useState(1);

  useReveal();

  const add = () => {
    setCount((c) => c + 1);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header cartCount={count} onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero />
        <TrustBand />
        <ImageRail />
        <CategoryTiles />
        <CollectionGrid onAdd={add} />
        <Editorial />
        <TestimonialRail />
        <ProductDetail onAdd={add} />
        <Community />
        <Faq />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} count={count} onClose={() => setCartOpen(false)} />
      <FloatingWhatsApp />
      <EmailBar />
    </div>
  );
}
