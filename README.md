# WunmzyCo Fashion Store

A modern, mobile-friendly e-commerce website for **WunmzyCo**, a Nigerian fashion brand selling affordable clothing, footwear, and accessories.

Built with **React + Vite**, styled with **styled-components**, and deployed on **Netlify**.

---

## ✨ Features

- Product catalog with multiple categories
- Search and category filtering
- Product detail modal with size & quantity selection
- Shopping cart with size-based item separation
- Wishlist with localStorage persistence
- WhatsApp checkout
- Paystack payment integration (Card, Bank Transfer, USSD)
- Mobile bottom navigation
- Responsive hamburger menu
- Draggable WhatsApp floating button
- Toast notifications
- Load More products for better performance
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
| Vite | Build tool |
| styled-components | Styling |
| Lucide React | Icons |
| Paystack | Online payments |
| Netlify | Hosting + serverless functions |
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
│   │   ├── CartDrawer.jsx
│   │   ├── CheckoutModal.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   ├── ProductsSection.jsx
│   │   ├── Toast.jsx
│   │   └── WishlistDrawer.jsx
│   ├── data/
│   │   └── products.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── netlify/
│   └── functions/
│       └── verify-payment.js
├── .env
├── index.html
├── package.json
└── vite.config.js
