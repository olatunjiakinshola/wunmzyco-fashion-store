import { useState, lazy, Suspense, useMemo } from 'react'
import styled from 'styled-components'
import { ShoppingCart } from 'lucide-react'

const ProductsSection = lazy(() => import('./components/ProductsSection'))
const CartDrawer = lazy(() => import('./components/CartDrawer'))
const CheckoutModal = lazy(() => import('./components/CheckoutModal'))

const products = [ /* ... same product data as before ... */ ]

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

  @media (max-width: 480px) {
    font-size: 22px;
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 28px;
  font-weight: 500;

  @media (max-width: 768px) {
    gap: 20px;
    font-size: 0.95rem;
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

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

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
            <div style={{ width: '32px', height: '32px', background: 'black', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>L</div>
            LUXE
          </Logo>

          <NavLinks>
            <button onClick={() => setActiveCategory('all')} style={{ color: activeCategory === 'all' ? 'black' : '#666', fontWeight: activeCategory === 'all' ? '600' : '500' }}>All</button>
            <button onClick={() => setActiveCategory('clothing')} style={{ color: activeCategory === 'clothing' ? 'black' : '#666', fontWeight: activeCategory === 'clothing' ? '600' : '500' }}>Clothing</button>
            <button onClick={() => setActiveCategory('bags')} style={{ color: activeCategory === 'bags' ? 'black' : '#666', fontWeight: activeCategory === 'bags' ? '600' : '500' }}>Bags</button>
          </NavLinks>

          <button onClick={() => setIsCartOpen(true)} style={{ position: 'relative', background: 'none', border: 'none' }}>
            <ShoppingCart size={26} />
            {cart.length > 0 && (
              <span style={{
                position: 'absolute', top: '-6px', right: '-6px', background: 'black', color: 'white',
                fontSize: '12px', width: '20px', height: '20px', borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center'
              }}>
                {cart.length}
              </span>
            )}
          </button>
        </NavContent>
      </Navbar>

      <Hero>
        <div>
          <p style={{ textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px', fontSize: '0.95rem' }}>NEW SEASON 2026</p>
          <HeroTitle>Timeless.<br />Effortless.<br />LUXE.</HeroTitle>
          <p style={{ fontSize: '1.2rem', maxWidth: '460px', margin: '0 auto', color: '#ccc' }}>
            Premium fashion for the modern minimalist.
          </p>
        </div>
      </Hero>

      <ProductsWrapper>
        <SectionHeader>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '700' }}>Our Collection</h2>
          <p>{filteredProducts.length} products</p>
        </SectionHeader>

        <Suspense fallback={<p>Loading...</p>}>
          <ProductsSection 
            products={filteredProducts}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        </Suspense>
      </ProductsWrapper>

      <footer style={{ background: '#111', color: '#aaa', textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ color: 'white', marginBottom: '8px' }}>LUXE</h2>
        <p>© 2026 Portfolio Demo</p>
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