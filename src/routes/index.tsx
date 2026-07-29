import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/store/Header";
import { Hero } from "@/components/store/Hero";
import { TrustBand } from "@/components/store/TrustBand";
import { CollectionGrid } from "@/components/store/CollectionGrid";
import { Editorial } from "@/components/store/Editorial";
import { ProductDetail } from "@/components/store/ProductDetail";
import { CartDrawer } from "@/components/store/CartDrawer";
import { EmailBar, FloatingWhatsApp } from "@/components/store/Floating";
import { Footer } from "@/components/store/Footer";

const title = "Mehr — Quiet Luxury Shopify Theme for Pakistani Womenswear";
const description =
  "A premium Shopify theme concept for Pakistani women's fashion: editorial hero, hover-swap collection grid, inch-based size chart, COD trust badges and WhatsApp support.";

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
        <CollectionGrid onAdd={add} />
        <Editorial />
        <ProductDetail onAdd={add} />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} count={count} onClose={() => setCartOpen(false)} />
      <FloatingWhatsApp />
      <EmailBar />
    </div>
  );
}
