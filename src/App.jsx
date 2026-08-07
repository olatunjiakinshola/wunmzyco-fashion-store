import { useState, lazy, Suspense, useMemo, useEffect, useRef } from "react";
import styled from "styled-components";
import { ShoppingCart, Search, Menu, X, Heart, ArrowUp } from "lucide-react";
import products from "./data/products";
import useCart from "./hooks/useCart";
import useWishlist from "./hooks/useWishlist";
import ProductSkeleton from "./components/ui/ProductSkeleton";
import EmptyState from "./components/ui/EmptyState";

const ProductsSection = lazy(() => import("./components/ProductsSection"));
const CartDrawer = lazy(() => import("./components/CartDrawer"));
const CheckoutModal = lazy(() => import("./components/CheckoutModal"));
const ProductModal = lazy(() => import("./components/ProductModal"));
const WishlistDrawer = lazy(() => import("./components/WishlistDrawer"));
const Toast = lazy(() => import("./components/Toast"));

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
  padding: 80px 24px 120px;
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
  padding: 60px 20px 100px;
  @media (max-width: 768px) {
    padding: 40px 16px 110px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

const SortSelect = styled.select`
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: white;
  font-size: 0.95rem;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #000;
  }
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

const ScrollTopButton = styled.button`
  position: fixed;
  right: 25px;
  bottom: 100px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: #111;
  color: white;
  display: ${(props) => (props.$show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 900;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    bottom: 90px;
    right: 18px;
  }
`;

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [whatsappPos, setWhatsappPos] = useState({ x: null, y: null });
  const [visibleCount, setVisibleCount] = useState(12);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const rafId = useRef(null);

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, closing: false }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, closing: true } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, closing: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  };

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart(showToast);

  const { wishlist, wishlistItems, toggleWishlist } = useWishlist(showToast);

  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, searchTerm, sortBy]);

  useEffect(() => {
    setIsProductsLoading(true);
    const timer = setTimeout(() => setIsProductsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeCategory, searchTerm, sortBy]);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const anyOverlayOpen =
    isCartOpen ||
    isCheckoutOpen ||
    isModalOpen ||
    isWishlistOpen ||
    isMobileMenuOpen;

  useEffect(() => {
    document.body.style.overflow = anyOverlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [anyOverlayOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== "Escape") return;

      if (isCheckoutOpen) setIsCheckoutOpen(false);
      else if (isModalOpen) {
        setIsModalOpen(false);
        setSelectedProduct(null);
      } else if (isCartOpen) setIsCartOpen(false);
      else if (isWishlistOpen) setIsWishlistOpen(false);
      else if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isCheckoutOpen,
    isModalOpen,
    isCartOpen,
    isWishlistOpen,
    isMobileMenuOpen,
  ]);

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
          product.color.toLowerCase().includes(term)
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, searchTerm, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

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

      const btn = buttonRef.current;
      if (btn) {
        btn.style.transition = "transform 0.15s ease";
        const finalX = parseFloat(btn.style.left) || 0;
        const finalY = parseFloat(btn.style.top) || 0;
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
              aria-label="Search products"
            />
          </SearchContainer>

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

          <Hamburger
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </Hamburger>

          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label="Open wishlist"
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

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
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
          <div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: "700", marginBottom: 6 }}>
              Our Collection
            </h2>
            <p style={{ color: "#666" }}>{filteredProducts.length} products</p>
          </div>

          <SortSelect
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </SortSelect>
        </SectionHeader>

        <Suspense fallback={<ProductSkeleton count={8} />}>
          {isProductsLoading ? (
            <ProductSkeleton count={8} />
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              title="No products found"
              text="Try another category or search term."
              actionLabel="View all products"
              onAction={() => {
                setActiveCategory("all");
                setSearchTerm("");
                setSortBy("default");
              }}
            />
          ) : (
            <>
              <ProductsSection
                products={visibleProducts}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlist={wishlist}
                onOpenModal={openProductModal}
              />

              {visibleCount < filteredProducts.length && (
                <div style={{ textAlign: "center", marginTop: "40px" }}>
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    style={{
                      background: "black",
                      color: "white",
                      border: "none",
                      padding: "14px 28px",
                      borderRadius: "50px",
                      fontSize: "1rem",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Load More Products
                  </button>
                </div>
              )}
            </>
          )}
        </Suspense>
      </ProductsWrapper>

      <section
        style={{
          background: "white",
          padding: "50px 20px",
          borderTop: "1px solid #eee",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            textAlign: "center",
          }}
        >
          <div>
            <h3 style={{ marginBottom: "8px", fontSize: "1.1rem" }}>
              🚚 Fast Delivery
            </h3>
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              Delivery available across Nigeria
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: "8px", fontSize: "1.1rem" }}>
              🔒 Secure Payment
            </h3>
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              Pay safely with Paystack or order via WhatsApp
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: "8px", fontSize: "1.1rem" }}>
              💬 Easy Support
            </h3>
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              Chat with us instantly on WhatsApp
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: "8px", fontSize: "1.1rem" }}>
              ✨ Quality Fashion
            </h3>
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              Affordable and stylish pieces for everyday wear
            </p>
          </div>
        </div>
      </section>

      <footer
        style={{
          background: "#111",
          color: "#aaa",
          textAlign: "center",
          padding: "60px 20px 100px",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "12px" }}>WUNMZYCo</h2>
        <p style={{ marginBottom: "20px" }}>
          Premium affordable fashion for everyday elegance.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" style={{ color: "#aaa", textDecoration: "none" }}>
            Facebook
          </a>
          <a href="https://tiktok.com/@yourpage" target="_blank" rel="noopener noreferrer" style={{ color: "#aaa", textDecoration: "none" }}>
            TikTok
          </a>
          <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" style={{ color: "#aaa", textDecoration: "none" }}>
            Instagram
          </a>
          <a href="https://wa.me/2348060230990" target="_blank" rel="noopener noreferrer" style={{ color: "#aaa", textDecoration: "none" }}>
            WhatsApp
          </a>
        </div>
        <p style={{ fontSize: "0.9rem" }}>
          © 2026 WunmzyCo. All rights reserved.
        </p>
      </footer>

      <BottomNav>
        <NavItem
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Go to shop"
        >
          <Search size={24} />
          Shop
        </NavItem>
        <NavItem onClick={() => setIsWishlistOpen(true)} aria-label="Open wishlist">
          <Heart size={24} fill={wishlist.length > 0 ? "#ef4444" : "none"} />
          Wishlist
        </NavItem>
        <NavItem onClick={() => setIsCartOpen(true)} aria-label="Open cart">
          <ShoppingCart size={24} />
          Cart
        </NavItem>
      </BottomNav>

      <ScrollTopButton
        $show={showScrollTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </ScrollTopButton>

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
          showToast={showToast}
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

      <WhatsAppButton
        ref={buttonRef}
        href="https://wa.me/2348060230990"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
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