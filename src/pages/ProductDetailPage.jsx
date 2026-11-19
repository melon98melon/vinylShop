import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetailPage = ({ products, onAddToCart }) => {
  const { albumId } = useParams();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === albumId);

  if (!product) {
    return (
      <div className="detail-error">
        <h2>Product Not Found</h2>
        <Link className="btn btn-secondary" to="/">
          Return To Main Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <nav className="breadcrumb">
        <Link to="/">Catalog</Link> &gt; <span>{product.title}</span>
      </nav>

      <div className="detail-grid">
        <img src={product.image} alt={product.title} className="detail-img" />

        <section className="detail-info">
          <span className="product-category">{product.genre}</span>
          <h1 className="detail-title">{product.title}</h1>
          <p>{product.artist}</p>
          <p className="detail-price">$ {product.price.toFixed(2)}</p>
          <div className="stock-tag">
            {product.stock > 0
              ? `✓ In Stock (${product.stock} units available)`
              : "Out of Stock"}
          </div>

          <div className="detail-actions">
            <div className="qty-input-group">
              <label htmlFor="detail-qty">Quantity: </label>
              <input
                type="number"
                id="detail-qty"
                min="1"
                max={product.stock}
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, parseInt(e.target.value, 10) || 1))
                }
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => onAddToCart(product, qty)}
            >
              Add {qty} to cart
            </button>
          </div>
          <div className="specs-container">
            <h3 className="specs-title">Specs</h3>
            <ul className="specs">
              {product.specs && (
                <>
                  <li key={product.specs.catalogNumber}>
                    Catalog Number: {product.specs.catalogNumber}
                  </li>
                  <li key={product.specs.weight}>
                    Weight: {product.specs.weight}
                  </li>
                  <li key={product.specs.speed}>
                    Speed: {product.specs.speed}
                  </li>
                  <li key={product.specs.label}>
                    Label: {product.specs.label}
                  </li>
                </>
              )}
            </ul>
          </div>
        </section>
      </div>
      <hr />
      <section className="adittional-def-container">
        <h2 className="info-title">{product.title}</h2>
        <p className="detail-desc">{product.description}</p>
        <div className="track-list">
          <h3>Track List</h3>
          <hr />
          <ul>
            {product.tracklist?.map((track, index) => (
              <li key={index}>⁘ {track}</li>
            ))}
          </ul>
        </div>
        <div className="cta-detail-grid">
          <button
            className="btn btn-primary"
            onClick={() =>
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              })
            }
          >
            Back to Top
          </button>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
