# Vinyl Shop

A responsive vinyl record storefront built with React and Vite. Browse a curated catalog, filter albums by genre, view product details, manage a shopping cart, and complete a checkout form.

## Features

- Album catalog with genre filters
- Product detail pages with descriptions and track lists
- Configurable product quantity on detail pages
- Slide-out shopping cart
- Cart quantity controls and item removal
- Checkout form with shipping and payment validation
- 6% estimated tax calculation
- Order confirmation screen
- Empty-cart handling

## Tech Stack

- React 19
- React Router DOM 7
- Vite 8
- JavaScript (ES modules)
- CSS
- ESLint

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/melon98melon/vinylShop.git
```

2. Install project dependencies:

```bash
npm install
```

3. Install React Router:

```bash
npm install react-router-dom
```

### Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually <http://localhost:5173>.

## Routes

| Path                  | Page                                             |
| --------------------- | ------------------------------------------------ |
| `/`                   | Album catalog and genre filters                  |
| `/product/:productId` | Album detail, quantity selection, and track list |
| `/checkout`           | Order summary and checkout form                  |

## Project Structure

```text
src/
├── App.jsx                    # Routes and shared cart state
├── main.jsx                   # React entry point and router setup
├── styles.css                 # Application styles
├── components/
│   ├── NavBar.jsx             # Navigation and cart badge
│   ├── ProductCard.jsx        # Catalog product card
│   └── CartDrawer.jsx         # Slide-out cart interface
├── data/
│   └── albums.js              # Album catalog data
└── pages/
    ├── CatalogPage.jsx        # Catalog and genre filtering
    ├── ProductDetailPage.jsx  # Product information and track list
    └── CheckoutPage.jsx       # Checkout validation and confirmation
```

## Component Hierarchy

```text
App
├── File: src/App.jsx
├── Owned state
│   ├── cart [Array]: products and quantities
│   └── isCartOpen [Boolean]: controls whether the cart drawer is visible
├── Routes
│   ├── /: CatalogPage
│   ├── /product/:productId: ProductDetailPage
│   └── /checkout: CheckoutPage
├── Callbacks
│   ├── handleAddToCart [Function]: (product [Object], quantity [Number])
│   ├── handleUpdateQuantity [Function]: (productId [String], delta [Number])
│   ├── handleRemoveFromCart [Function]: (productId [String])
│   └── handleClearCart [Function]: no arguments
├── NavBar
│   ├── File: src/components/NavBar.jsx
│   ├── Owned state: none
│   └── Props
│       ├── cartCount [Number]: number of items in the cart
│       └── onOpenCart [Function]: opens the cart drawer
├── CatalogPage
│   ├── File: src/pages/CatalogPage.jsx
│   ├── Route: /
│   ├── Owned state
│   │   └── selectedGenre [String]: active catalog genre filter
│   ├── Props
│   │     ├── products [Array]: album catalog data
│   │     └── onAddToCart [Function]: callback passed to ProductCard
│   │     └── Callback path: CatalogPage -> ProductCard -> onAddToCart
│   ├── ProductCard
│   │   ├── File: src/components/ProductCard.jsx
│   │   ├── Owned state: none
│   │   └── Props
│   │       ├── album [Object]: album data for the card
│   │       └── onAddToCart [Function]: adds the product to the cart
├── ProductDetailPage
│   ├── File: src/pages/ProductDetailPage.jsx
│   ├── Route: /product/:productId
│   ├── Owned state
│   │   └── qty [Number]: selected product quantity
│   └── Props
│       ├── products [Array]: album catalog data
│       └── onAddToCart [Function]: adds the selected quantity to the cart
│       └── Callback path: ProductDetailPage -> onAddToCart(product, qty)
├── CheckoutPage
│   ├── File: src/pages/CheckoutPage.jsx
│   ├── Route: /checkout
│   ├── Owned state
│   │   ├── isSubmitted [Boolean]: controls the order confirmation
│   │   ├── errors [Array]: checkout validation messages
│   │   └── formData [Object]: shipping and payment form fields
│   └── Props
│       ├── cart [Array]: products and quantities in the order
│       └── onClearCart [Function]: clears the cart after a valid submission
└── CartDrawer
    ├── File: src/components/CartDrawer.jsx
    ├── Owned state: none
    └── Props
        ├── cart [Array]: products and quantities in the cart
        ├── isOpen [Boolean]: controls whether the drawer is rendered
        ├── onClose [Function]: closes the cart drawer
        ├── onUpdateQuantity [Function]: changes an item's quantity
        └── onRemove [Function]: removes an item from the cart
```

## State and Data Flow

`App.jsx` owns the shared cart and drawer state. It passes add, update, remove, and clear operations to the relevant pages and components through props.

- Adding a product to the cart opens the cart drawer.
- If the product is already in the cart, the quantity is increased.
- Decreasing an item's quantity removes it when it reaches zero.
- Checkout uses the current cart to calculate subtotal, 6% estimated tax, and total.
- Completing checkout clears the cart and displays an order confirmation.
- Album data is currently stored locally in `src/data/albums.js`;

## Checkout Validation

The checkout form validates:

- Full name and cardholder name
- Email address
- Shipping address
- Five-digit US ZIP code
- 13–19 digit card number
- Card expiration date
- 3–4 digit security code

Card and payment information is used only in the browser for demonstration and is not sent to a server or stored.
