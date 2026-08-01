import { useState, lazy, Suspense, useMemo, useEffect, useRef } from "react";
import styled from "styled-components";
import { ShoppingCart, Search, Menu, X, Heart } from "lucide-react";
import products from "./data/products";

const ProductsSection = lazy(() => import("./components/ProductsSection"));
const CartDrawer = lazy(() => import("./components/CartDrawer"));
const CheckoutModal = lazy(() => import("./components/CheckoutModal"));
const ProductModal = lazy(() => import("./components/ProductModal"));
const WishlistDrawer = lazy(() => import("./components/WishlistDrawer"));
const Toast = lazy(() => import("./components/Toast"));

// === STYLED COMPONENTS ===
const Container = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Navbar = styled.nav`
  position: sticky;
  top: 0;
  background: white;
  border-bottom: 1px solid #eee;
  z-index: 50;
  padding: 1rem 0;
`;

const NavContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -1px;
`;

const BrandDot = styled.div`
  width: 32px;
  height: 32px;
  background: black;
  border-radius: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 500px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px 12px 50px;
  border: 1px solid #ddd;
  border-radius: 50px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
  &:focus {
    border-color: #000;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 65;
  opacity: ${(props) => (props.open ? 1 : 0)};
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  transition: all 0.3s ease;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 320px;
  height: 100vh;
  background: white;
  transform: translateX(${(props) => (props.open ? "0" : "100%")});
  transition: transform 0.3s ease;
  z-index: 70;
  padding: 80px 24px 30px;
  box-shadow: -4px 0 25px rgba(0, 0, 0, 0.12);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 12px;
  font-weight: 500;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 50px;
  transition: all 0.3s ease;
  color: ${(props) => (props.$active ? "#000" : "#666")};
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  position: relative;
  &:hover {
    color: #000;
    background-color: #f1f1f1;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: ${(props) => (props.$active ? "60%" : "0")};
    height: 3px;
    background: black;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
`;

const Hero = styled.section`
  background: black;
  color: white;
  padding: 140px 20px 100px;
  text-align: center;
  @media (max-width: 768px) {
    padding: 100px 16px 80px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const ProductsWrapper = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 20px;
  @media (max-width: 768px) {
    padding: 40px 16px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 12px;
`;

const BottomNav = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #eee;
  z-index: 90;
  padding: 8px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

const NavItem = styled.button`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 4px 8px;

  &:active {
    color: #000;
  }
`;

const WhatsAppButton = styled.a`
  position: fixed;
  background: #25d366;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.45);
  z-index: 1000;
  cursor: grab;
  user-select: none;
  touch-action: none;
  text-decoration: none;
  will-change: transform, left, top;

  &:active {
    cursor: grabbing;
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    width: 55px;
    height: 55px;
  }
`;

// === MAIN APP ===
function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [whatsappPos, setWhatsappPos] = useState({ x: null, y: null });

  // Performance refs for drag
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const rafId = useRef(null);

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") {
      if (activeCategory === "under5k") {
        result = result.filter((p) => p.price < 5000);
      } else {
        result = result.filter((p) => p.category === activeCategory);
      }
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.color.toLowerCase().includes(term),
      );
    }

    return result;
  }, [activeCategory, searchTerm]);

  // Toast helpers
  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, closing: false }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, closing: true } : t)),
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, closing: true } : t)),
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  };

  // Cart functions
  const addToCart = (product, selectedSize = null) => {
    const size =
      selectedSize || product.selectedSize || product.sizes?.[0] || "M";
    const cartKey = `${product.id}-${size}`;

    setCart((prev) => {
      const existingItem = prev.find((item) => item.cartKey === cartKey);
      if (existingItem) {
        return prev.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          ...product,
          selectedSize: size,
          cartKey,
          quantity: 1,
        },
      ];
    });

    showToast(`${product.name} (Size: ${size}) added to cart`);
  };

  const increaseQuantity = (cartKey) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (cartKey) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (cartKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const clearCart = () => {
    setCart([]);
    showToast("Cart cleared successfully");
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const isAlready = prev.includes(id);
      const product = products.find((p) => p.id === id);

      if (isAlready) {
        showToast(`${product?.name || "Item"} removed from wishlist`);
        return prev.filter((item) => item !== id);
      } else {
        showToast(`${product?.name || "Item"} added to wishlist`);
        return [...prev, id];
      }
    });
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const wishlistItems = products.filter((product) =>
    wishlist.includes(product.id),
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const categories = [
    { key: "all", label: "All" },
    { key: "tops", label: "Tops" },
    { key: "gowns", label: "Gowns" },
    { key: "skirts", label: "Skirts" },
    { key: "bubu", label: "Bubu" },
    { key: "baggy", label: "Baggy Tops" },
    { key: "twopiece", label: "Two Piece" },
    { key: "slippers", label: "Slippers" },
    { key: "shoes", label: "Shoes" },
    { key: "joggers", label: "Joggers" },
    { key: "palazzos", label: "Palazzos" },
    { key: "under5k", label: "Under ₦5k" },
  ];

  // High-performance drag logic
  const handleDragStart = (e) => {
    e.preventDefault();
    isDragging.current = true;

    const isTouch = e.type.includes("touch");
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    dragOffset.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };

    // Disable transition while dragging
    button.style.transition = "none";

    const handleMove = (moveEvent) => {
      if (!isDragging.current) return;

      const moveIsTouch = moveEvent.type.includes("touch");
      const moveX = moveIsTouch
        ? moveEvent.touches[0].clientX
        : moveEvent.clientX;
      const moveY = moveIsTouch
        ? moveEvent.touches[0].clientY
        : moveEvent.clientY;

      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const newX = moveX - dragOffset.current.x;
        const newY = moveY - dragOffset.current.y;

        const maxX = window.innerWidth - button.offsetWidth;
        const maxY = window.innerHeight - button.offsetHeight;

        const clampedX = Math.max(0, Math.min(newX, maxX));
        const clampedY = Math.max(0, Math.min(newY, maxY));

        // Direct DOM update (no React re-render during drag)
        button.style.left = `${clampedX}px`;
        button.style.top = `${clampedY}px`;
        button.style.right = "auto";
        button.style.bottom = "auto";
      });
    };

    const handleEnd = () => {
      isDragging.current = false;

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }

      const button = buttonRef.current;
      if (button) {
        button.style.transition = "transform 0.15s ease";

        const finalX = parseFloat(button.style.left) || 0;
        const finalY = parseFloat(button.style.top) || 0;

        setWhatsappPos({ x: finalX, y: finalY });
      }

      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("touchend", handleEnd);
  };

  return (
    <Container>
      <Navbar>
        <NavContent>
          <Logo>
            <BrandDot>W</BrandDot>
            WunmzyCo
          </Logo>

          <SearchContainer>
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          {/* Desktop Categories */}
          <NavLinks>
            {categories.map((cat) => (
              <NavLink
                key={cat.key}
                $active={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </NavLink>
            ))}
          </NavLinks>

          <Hamburger onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </Hamburger>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            style={{
              position: "relative",
              background: "none",
              border: "none",
              cursor: "pointer",
              marginRight: "12px",
            }}
          >
            <Heart
              size={26}
              fill={wishlist.length > 0 ? "#ef4444" : "none"}
              color={wishlist.length > 0 ? "#ef4444" : "#333"}
            />
            {wishlist.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "red",
                  color: "white",
                  fontSize: "10px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: "relative",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <ShoppingCart size={26} />
            {cart.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "black",
                  color: "white",
                  fontSize: "12px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cart.length}
              </span>
            )}
          </button>
        </NavContent>
      </Navbar>

      {/* Mobile Overlay + Menu */}
      <MobileOverlay
        open={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <MobileMenu open={isMobileMenuOpen}>
        <h3
          style={{
            marginBottom: "24px",
            fontSize: "1.4rem",
            fontWeight: "700",
            color: "#111",
          }}
        >
          Categories
        </h3>

        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              setIsMobileMenuOpen(false);
            }}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "14px 16px",
              borderRadius: "10px",
              border: "none",
              background: activeCategory === cat.key ? "#111" : "transparent",
              color: activeCategory === cat.key ? "white" : "#333",
              fontSize: "1.05rem",
              fontWeight: activeCategory === cat.key ? "600" : "500",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {cat.label}
          </button>
        ))}
      </MobileMenu>

      <Hero>
        <div>
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "3px",
              marginBottom: "12px",
            }}
          >
            NEW SEASON 2026
          </p>
          <HeroTitle>
            BE BOLD.
            <br />
            BE CONFIDENT.
            <br />
            BE YOU.
          </HeroTitle>
        </div>
      </Hero>

      <ProductsWrapper>
        <SectionHeader>
          <h2 style={{ fontSize: "2.4rem", fontWeight: "700" }}>
            Our Collection
          </h2>
          <p>{filteredProducts.length} products</p>
        </SectionHeader>

        <Suspense fallback={<p>Loading products...</p>}>
          <ProductsSection
            products={filteredProducts}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            onOpenModal={openProductModal}
          />
        </Suspense>
      </ProductsWrapper>

      <footer
        style={{
          background: "#111",
          color: "#aaa",
          textAlign: "center",
          padding: "60px 20px 40px",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "12px" }}>WUNMZYCo</h2>
        <p style={{ marginBottom: "20px" }}>
          Premium affordable fashion for everyday elegance.
        </p>

        {/* Social Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#aaa",
              textDecoration: "none",
              fontSize: "0.95rem",
            }}
          >
            Facebook
          </a>
          <a
            href="https://tiktok.com/@yourpage"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#aaa",
              textDecoration: "none",
              fontSize: "0.95rem",
            }}
          >
            TikTok
          </a>
          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#aaa",
              textDecoration: "none",
              fontSize: "0.95rem",
            }}
          >
            Instagram
          </a>
          <a
            href="https://wa.me/2348060230990"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#aaa",
              textDecoration: "none",
              fontSize: "0.95rem",
            }}
          >
            WhatsApp
          </a>
        </div>

        <p style={{ fontSize: "0.9rem" }}>
          © 2026 WunmzyCo. All rights reserved.
        </p>
      </footer>
      {/* Bottom Navigation (Mobile) */}
      <BottomNav>
        <NavItem
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Search size={24} />
          Shop
        </NavItem>
        <NavItem onClick={() => setIsWishlistOpen(true)}>
          <Heart size={24} fill={wishlist.length > 0 ? "#ef4444" : "none"} />
          Wishlist
        </NavItem>
        <NavItem onClick={() => setIsCartOpen(true)}>
          <ShoppingCart size={24} />
          Cart
        </NavItem>
      </BottomNav>

      <Suspense fallback={null}>
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          totalPrice={totalPrice}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
          clearCart={clearCart}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          totalPrice={totalPrice}
          cart={cart}
          clearCart={clearCart}
        />

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />

        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistItems={wishlistItems}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
        />

        <Toast toasts={toasts} removeToast={removeToast} />
      </Suspense>

      {/* High-performance Draggable WhatsApp Button */}
      <WhatsAppButton
        ref={buttonRef}
        href="https://wa.me/2348060230990"
        target="_blank"
        rel="noopener noreferrer"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{
          left: whatsappPos.x !== null ? `${whatsappPos.x}px` : "auto",
          top: whatsappPos.y !== null ? `${whatsappPos.y}px` : "auto",
          right: whatsappPos.x !== null ? "auto" : "25px",
          bottom: whatsappPos.y !== null ? "auto" : "25px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.485-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.917-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.569-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        </svg>
      </WhatsAppButton>
    </Container>
  );
}

export default App;
