import { useState, lazy, Suspense, useMemo, useEffect } from "react";
import styled from "styled-components";
import { ShoppingCart, Search, Menu, X } from "lucide-react";

const ProductsSection = lazy(() => import("./components/ProductsSection"));
const CartDrawer = lazy(() => import("./components/CartDrawer"));
const CheckoutModal = lazy(() => import("./components/CheckoutModal"));

// === 20 PRODUCTS ===
const products = [
  { id: 1, name: "Black Oversized Hoodie", price: 75, category: "joggers", image: "https://picsum.photos/id/1015/600/600", color: "Black" },
  { id: 2, name: "Slim Fit Denim Jeans", price: 95, category: "joggers", image: "https://picsum.photos/id/1060/600/600", color: "Blue" },
  { id: 3, name: "Brown Leather Crossbody Bag", price: 145, category: "palazzo", image: "https://picsum.photos/id/201/600/600", color: "Brown" },
  { id: 4, name: "White Minimal Sneakers", price: 85, category: "shoes", image: "https://picsum.photos/id/21/600/600", color: "White" },
  { id: 5, name: "Canvas Utility Tote Bag", price: 55, category: "palazzo", image: "https://picsum.photos/id/133/600/600", color: "Beige" },
  { id: 6, name: "Beige Cashmere Sweater", price: 120, category: "tops", image: "https://picsum.photos/id/106/600/600", color: "Beige" },
  { id: 7, name: "Navy Blue Palazzo Pants", price: 65, category: "palazzo", image: "https://picsum.photos/id/1074/600/600", color: "Navy" },
  { id: 8, name: "White Crop Top", price: 45, category: "tops", image: "https://picsum.photos/id/64/600/600", color: "White" },
  { id: 9, name: "Grey Joggers Pants", price: 70, category: "joggers", image: "https://picsum.photos/id/201/600/600", color: "Grey" },
  { id: 10, name: "Black Leather Sneakers", price: 110, category: "shoes", image: "https://picsum.photos/id/180/600/600", color: "Black" },
  { id: 11, name: "Pink Wide Leg Palazzo", price: 80, category: "palazzo", image: "https://picsum.photos/id/1011/600/600", color: "Pink" },
  { id: 12, name: "Red Off-Shoulder Top", price: 55, category: "tops", image: "https://picsum.photos/id/1005/600/600", color: "Red" },
  { id: 13, name: "Black Cargo Joggers", price: 85, category: "joggers", image: "https://picsum.photos/id/1027/600/600", color: "Black" },
  { id: 14, name: "Brown Chelsea Boots", price: 130, category: "shoes", image: "https://picsum.photos/id/669/600/600", color: "Brown" },
  { id: 15, name: "Cream Silk Top", price: 60, category: "tops", image: "https://picsum.photos/id/201/600/600", color: "Cream" },
  { id: 16, name: "Green Palazzo Set", price: 95, category: "palazzo", image: "https://picsum.photos/id/133/600/600", color: "Green" },
  { id: 17, name: "White Running Sneakers", price: 75, category: "shoes", image: "https://picsum.photos/id/21/600/600", color: "White" },
  { id: 18, name: "Mustard Yellow Top", price: 50, category: "tops", image: "https://picsum.photos/id/106/600/600", color: "Mustard" },
  { id: 19, name: "Blue Denim Joggers", price: 78, category: "joggers", image: "https://picsum.photos/id/1060/600/600", color: "Blue" },
  { id: 20, name: "Tan Leather Tote Bag", price: 135, category: "palazzo", image: "https://picsum.photos/id/201/600/600", color: "Tan" },
];

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
    box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
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

const MobileMenu = styled.div`
  display: ${props => props.open ? 'flex' : 'none'};
  flex-direction: column;
  gap: 15px;
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  background: white;
  padding: 20px;
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
  z-index: 60;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.button`
  background: none;
  border: none;
  font-size: 1.05rem;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 50px;
  transition: all 0.3s ease;
  color: ${(props) => (props.active ? "#000" : "#666")};
  font-weight: ${(props) => (props.active ? "600" : "500")};
  position: relative;

  &:hover {
    color: #000;
    background-color: #f1f1f1;
    transform: translateY(-2px);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: ${(props) => (props.active ? "60%" : "0")};
    height: 3px;
    background: black;
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  &:hover::after {
    width: 60%;
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

// Floating WhatsApp Button
const WhatsAppButton = styled.a`
  position: fixed;
  bottom: 25px;
  right: 25px;
  background: #25D366;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  z-index: 1000;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.5);
  }

  @media (max-width: 480px) {
    width: 55px;
    height: 55px;
    bottom: 20px;
    right: 20px;
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);   // Hamburger State
  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  const filteredProducts = useMemo(() => {
    let result = activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

    if (searchTerm.trim() !== "") {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.color.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [activeCategory, searchTerm]);

  const addToCart = (product) => setCart((prev) => [...prev, product]);
  const removeFromCart = (index) =>
    setCart((prev) => prev.filter((_, i) => i !== index));
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

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

          {/* Desktop Menu */}
          <NavLinks>
            <NavLink active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>All</NavLink>
            <NavLink active={activeCategory === "palazzo"} onClick={() => setActiveCategory("palazzo")}>Palazzo</NavLink>
            <NavLink active={activeCategory === "tops"} onClick={() => setActiveCategory("tops")}>Tops</NavLink>
            <NavLink active={activeCategory === "joggers"} onClick={() => setActiveCategory("joggers")}>Joggers</NavLink>
            <NavLink active={activeCategory === "shoes"} onClick={() => setActiveCategory("shoes")}>Shoes</NavLink>
          </NavLinks>

          {/* Hamburger Button */}
          <Hamburger onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </Hamburger>

          <button
            onClick={() => setIsCartOpen(true)}
            style={{ position: "relative", background: "none", border: "none", cursor: "pointer" }}
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

        {/* Mobile Menu */}
        <MobileMenu open={isMobileMenuOpen}>
          <NavLink active={activeCategory === "all"} onClick={() => { setActiveCategory("all"); setIsMobileMenuOpen(false); }}>All</NavLink>
          <NavLink active={activeCategory === "palazzo"} onClick={() => { setActiveCategory("palazzo"); setIsMobileMenuOpen(false); }}>Palazzo</NavLink>
          <NavLink active={activeCategory === "tops"} onClick={() => { setActiveCategory("tops"); setIsMobileMenuOpen(false); }}>Tops</NavLink>
          <NavLink active={activeCategory === "joggers"} onClick={() => { setActiveCategory("joggers"); setIsMobileMenuOpen(false); }}>Joggers</NavLink>
          <NavLink active={activeCategory === "shoes"} onClick={() => { setActiveCategory("shoes"); setIsMobileMenuOpen(false); }}>Shoes</NavLink>
        </MobileMenu>
      </Navbar>

      <Hero>
        <div>
          <p style={{ textTransform: "uppercase", letterSpacing: "3px", marginBottom: "12px" }}>NEW SEASON 2026</p>
          <HeroTitle>Timeless.<br />Effortless.<br />WunmzyCo.</HeroTitle>
        </div>
      </Hero>

      <ProductsWrapper>
        <SectionHeader>
          <h2 style={{ fontSize: "2.4rem", fontWeight: "700" }}>Our Collection</h2>
          <p>{filteredProducts.length} products</p>
        </SectionHeader>

        <Suspense fallback={<p>Loading products...</p>}>
          <ProductsSection
            products={filteredProducts}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        </Suspense>
      </ProductsWrapper>

      <footer style={{ background: "#111", color: "#aaa", textAlign: "center", padding: "60px 20px" }}>
        <h2 style={{ color: "white", marginBottom: "8px" }}>WUNMZYCo</h2>
        <p>© 2026 WunmzyCo. All rights reserved.</p>
      </footer>

      <Suspense fallback={null}>
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          removeFromCart={removeFromCart}
          totalPrice={totalPrice}
          onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          totalPrice={totalPrice}
          cart={cart}
        />
      </Suspense>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton
        href="https://wa.me/2348060230990"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.485-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.917-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.569-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </WhatsAppButton>
    </Container>
  );
}

export default App;