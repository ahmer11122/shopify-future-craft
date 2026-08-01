import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { collections, getCollection, productsIn } from "@/components/store/data";
import { ProductGrid } from "@/components/store/ProductGrid";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/collections/$handle")({
  loader: ({ params }) => {
    const c = getCollection(params.handle);
    if (!c) throw notFound();
    return { title: c.title, blurb: c.blurb };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Collection not found — Mehr" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} — Mehr`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.blurb },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CollectionMissing,
  component: CollectionPage,
});

function CollectionMissing() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-48 text-center lg:px-10">
      <h1 className="type-h2">That collection has moved</h1>
      <Link to="/collections" className="btn-ghost mt-8">
        All collections
      </Link>
    </div>
  );
}

function CollectionPage() {
  const { handle } = Route.useParams();
  const collection = getCollection(handle)!;
  const items = productsIn(collection);
  useReveal();

  return (
    <div>
      <div className="relative h-[46vh] min-h-[300px] overflow-hidden bg-foreground">
        <img
          src={collection.image}
          alt={collection.title}
          width={1600}
          height={900}
          className="h-full w-full object-cover object-[50%_35%] opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 to-foreground/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-12 text-background lg:px-10">
          <nav className="num flex items-center gap-2 text-[0.62rem] tracking-[0.16em] uppercase text-background/60">
            <Link to="/" className="hover:text-background">
              Home
            </Link>
            <span>/</span>
            <Link to="/collections" className="hover:text-background">
              Collections
            </Link>
            <span>/</span>
            <span className="text-background">{collection.title}</span>
          </nav>
          <h1 className="type-display mt-5">{collection.title}</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-background/75">{collection.blurb}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
        <ProductGrid items={items} />

        <div className="mt-24 border-t border-border pt-12">
          <p className="eyebrow text-muted-foreground">Keep browsing</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {collections
              .filter((c) => c.handle !== handle)
              .map((c) => (
                <Link
                  key={c.handle}
                  to="/collections/$handle"
                  params={{ handle: c.handle }}
                  className="border border-border px-4 py-2.5 text-[0.65rem] tracking-[0.16em] uppercase transition-colors hover:border-foreground"
                >
                  {c.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
