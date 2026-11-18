import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

function CatalogPage({ products, onAddToCart }) {
  // regular js comment
  const genres = ["All", "Jazz", "Electronic", "Rock", "Classical"];
  const [selectedGenre, setSelectedGenre] = useState("All");

  //    put a safety check - what happens if data is bad or missing
  const validProducts = products || [];

  const filteredProducts =
    selectedGenre === "All"
      ? validProducts
      : validProducts.filter((p) => p.genre === selectedGenre);

  return (
    <div className="catalog-container">
      <header className="catalog-hero">
        <h1>Handcrafted Functional Stoneware</h1>
        <p>
          Sustainable ceramics shaped by hand for intentional daily rituals.
        </p>
      </header>
      <div className="filter-bar">
        {genres.map((gen) => (
          <button
            key={gen}
            className={`filter-pill${selectedGenre === gen ? " active" : ""}`}
            onClick={() => setSelectedGenre(gen)}
          >
            {gen}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
