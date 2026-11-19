import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ album, onAddToCart }) => {
  // sanity check: make sure that product to display is not broken
  if (!album) return null;

  return (
    <article className="product-card">
      <Link className="product-img-link" to={`/album/${album.id}`}>
        <img
          className="product-image"
          src={album.image}
          alt={album.name}
          loading="lazy"
        />
      </Link>
      <div className="product-body">
        <span className="product-category">{album.genre}</span>
        <h3 className="product-title">
          <Link to={`/album/${album.id}`}>{album.title}</Link>
        </h3>
        <p className="product-price">
          $
          {typeof album.price === "number"
            ? album.price.toFixed(2)
            : "Contact For Price"}
        </p>
        <button
          className="btn btn-secondary btn-block"
          type="button"
          onClick={() => onAddToCart(album)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
