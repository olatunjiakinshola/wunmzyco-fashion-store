# WunmzyCo Fashion Store

A modern, mobile-first e-commerce web app for **WunmzyCo**, a Nigerian fashion brand selling affordable clothing, footwear, and accessories.

Built with **React + Vite**, styled with **styled-components**, and deployed on **Netlify**.

🔗 **Live Demo:** [majestic-pegasus-996c32.netlify.app]  
📦 **Repository:** [https://github.com/olatunjiakinshola/wunmzyco-fashion-store]

---

## ✨ Features

- Product catalog with multiple categories
- Search and category filtering
- Product detail modal with size & quantity selection
- Shopping cart with size-based item separation (`id + size`)
- Wishlist with localStorage persistence
- WhatsApp checkout with customer + delivery details
- Paystack payment integration (Card, Bank Transfer, USSD)
- Server-side payment verification via Netlify Functions
- Mobile bottom navigation
- Responsive hamburger menu
- Draggable WhatsApp floating button
- Toast notifications
- Skeleton loading states
- Empty states for products, cart, and wishlist
- Load More products for better performance
- Out-of-stock handling
- Escape-to-close for modals/drawers
- Body scroll lock when overlays are open
- Trust badges and social links in footer

---

## 🛍️ Categories

- All
- Tops
- Gowns
- Skirts
- Bubu
- Baggy Tops
- Two Piece
- Slippers
- Shoes
- Joggers
- Palazzos
- Under ₦5k

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI library |
| Vite | Build tool / bundler |
| styled-components | Component styling |
| Lucide React | Icons |
| Paystack Inline JS | Online payments |
| Netlify | Hosting |
| Netlify Functions | Payment verification backend |
| localStorage | Cart & wishlist persistence |

---

## 📁 Project Structure

```text
wunmzyco-fashion-store/
├── public/
├── src/
│   ├── assets/
│   │   └── products/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── ProductSkeleton.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── CheckoutModal.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   ├── ProductsSection.jsx
│   │   ├── Toast.jsx
│   │   └── WishlistDrawer.jsx
│   ├── data/
│   │   └── products.js
│   ├── hooks/
│   │   ├── useCart.js
│   │   └── useWishlist.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── netlify/
│   └── functions/
│       └── verify-payment.js
├── index.html
├── package.json
└── vite.config.js