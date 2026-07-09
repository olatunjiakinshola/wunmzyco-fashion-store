import { useState, lazy, Suspense, useMemo } from 'react'
import styled from 'styled-components'
import { ShoppingCart } from 'lucide-react'

const ProductsSection = lazy(() => import('./components/ProductsSection'))
const CartDrawer = lazy(() => import('./components/CartDrawer'))
const CheckoutModal = lazy(() => import('./components/CheckoutModal'))

// === YOUR PRODUCTS ===
const products = [
  {
    id: 1,
    name: "Black Oversized Hoodie",
    price: 75,
    category: "clothing",
    image: "https://picsum.photos/id/1015/600/600",
    color: "Black"
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    price: 95,
    category: "clothing",
    image: "https://picsum.photos/id/1060/600/600",
    color: "Blue"
  },
  {
    id: 3,
    name: "Brown Leather Crossbody Bag",
    price: 145,
    category: "bags",
    image: "https://picsum.photos/id/201/600/600",
    color: "Brown"
  },
  {
    id: 4,
    name: "White Minimal Sneakers",
    price: 85,
    category: "clothing",
    image: "https://picsum.photos/id/21/600/600",
    color: "White"
  },
  {
    id: 5,
    name: "Canvas Utility Tote Bag",
    price: 55,
    category: "bags",
    image: "https://picsum.photos/id/133/600/600",
    color: "Beige"
  },
  {
    id: 6,
    name: "Beige Cashmere Sweater",
    price: 120,
    category: "clothing",
    image: "https://picsum.photos/id/106/600/600",
    color: "Beige"
  },
]

// === STYLED COMPONENTS ===
const Container = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`

const Navbar = styled.nav`
  position: sticky;
  top: 0;
  background: white;
  border-bottom: 1px solid #eee;
  z-index: 50;
  padding: 1rem 0;
`

const NavContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -1px;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`

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
`

const NavLinks = styled.div`
  display: flex;
  gap: 28px;
  font-weight: 500;

  @media (max-width: 768px) {
    gap: 20px;
  }
`

const NavLink = styled.button`
  background: none;
  border: none;
  font-size: 1.05rem;
  cursor: pointer;
  padding: 8px 18px;
  border-radius: 50px;
  transition: all 0.3s ease;
  color: ${props => props.active ? '#000' : '#666'};
  font-weight: ${props => props.active ? '600' : '500'};
  position: relative;

  &:hover {
    color: #000;
    background-color: #f1f1f1;
    transform: translateY(-2px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.active ? '60%' : '0'};
    height: 3px;
    background: black;
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  &:hover::after {
    width: 60%;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 6px 14px;
  }
`

const Hero = styled.section`
  background: black;
  color: white;
  padding: 140px 20px 100px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 100px 16px 80px;
  }
`

const HeroTitle = styled.h1`
  font-size: 4rem;
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`

const ProductsWrapper = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 16px;
  }
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 12px;
`

// === MAIN APP ===
function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [wishlist, setWishlist] = useState([])

  const filteredProducts = useMemo(() => {
    return activeCategory === 'all' 
      ? products 
      : products.filter(p => p.category === activeCategory)
  }, [activeCategory])

  const addToCart = (product) => setCart(prev => [...prev, product])
  const removeFromCart = (index) => setCart(prev => prev.filter((_, i) => i !== index))
  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  }
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <Container>
      <Navbar>
        <NavContent>
          <Logo>
            <BrandDot>W</BrandDot>
            WunmzyCo
          </Logo>

          <NavLinks>
            <NavLink 
              active={activeCategory === 'all'} 
              onClick={() => setActiveCategory('all')}
            >
              All
            </NavLink>
            <NavLink 
              active={activeCategory === 'clothing'} 
              onClick={() => setActiveCategory('clothing')}
            >
              Clothing
            </NavLink>
            <NavLink 
              active={activeCategory === 'bags'} 
              onClick={() => setActiveCategory('bags')}
            >
              Bags
            </NavLink>
          </NavLinks>

          <button 
            onClick={() => setIsCartOpen(true)} 
            style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <ShoppingCart size={26} />
            {cart.length > 0 && (
              <span style={{
                position: 'absolute', top: '-6px', right: '-6px',
                background: 'black', color: 'white', fontSize: '12px',
                width: '20px', height: '20px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {cart.length}
              </span>
            )}
          </button>
        </NavContent>
      </Navbar>

      <Hero>
        <div>
          <p style={{ textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>NEW SEASON 2026</p>
          <HeroTitle>Timeless.<br />Effortless.<br />WunmzyCo.</HeroTitle>
        </div>
      </Hero>

      <ProductsWrapper>
        <SectionHeader>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '700' }}>Our Collection</h2>
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

      <footer style={{ background: '#111', color: '#aaa', textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ color: 'white', marginBottom: '8px' }}>WUNMZYCo</h2>
        <p>© 2026 WunmzyCo. All rights reserved.</p>
      </footer>

      <Suspense fallback={null}>
        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          removeFromCart={removeFromCart}
          totalPrice={totalPrice}
          onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true) }}
        />

        <CheckoutModal 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          totalPrice={totalPrice}
          cart={cart}
        />
      </Suspense>
    </Container>
  )
}

export default App