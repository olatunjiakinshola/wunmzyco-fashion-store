import{c as e,i as t,l as n,r,s as i,t as a}from"./index-BqxRPJqv.js";var o=n(e(),1),s=a(),c=i.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 35px rgba(0,0,0,0.12);
  }
`,l=i.div`
  position: relative;
  height: 320px;
  overflow: hidden;
  cursor: pointer;
  @media (max-width: 480px) {
    height: 280px;
  }
`,u=i.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  ${c}:hover & {
    transform: scale(1.1);
  }
`,d=i.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 3;
`,f=i.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 2;
  ${c}:hover & {
    opacity: 1;
  }
`,p=i.button`
  background: white;
  color: black;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  z-index: 3;
`,m=i.div`
  padding: 20px;
`,h=i.h3`
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 4px;
`,g=i.p`
  font-size: 1.4rem;
  font-weight: 700;
`,_=(0,o.memo)(({product:e,addToCart:n,toggleWishlist:i,wishlist:a,onOpenModal:o})=>(0,s.jsxs)(c,{children:[(0,s.jsxs)(l,{onClick:t=>{t.stopPropagation(),o(e)},children:[(0,s.jsx)(u,{src:e.image,alt:e.name}),(0,s.jsx)(d,{onClick:t=>{t.stopPropagation(),i(e.id)},children:(0,s.jsx)(t,{size:20,fill:a.includes(e.id)?`#ef4444`:`none`,color:a.includes(e.id)?`#ef4444`:`#333`})}),(0,s.jsx)(f,{children:(0,s.jsxs)(p,{onClick:t=>{t.stopPropagation(),n(e)},children:[(0,s.jsx)(r,{size:18}),`Add to Cart`]})})]}),(0,s.jsxs)(m,{children:[(0,s.jsx)(h,{children:e.name}),(0,s.jsx)(`p`,{style:{color:`#666`,marginBottom:`8px`},children:e.color}),(0,s.jsxs)(g,{children:[`₦`,e.price.toLocaleString()]})]})]})),v=i.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
`,y=(0,o.memo)(({products:e,addToCart:t,toggleWishlist:n,wishlist:r,onOpenModal:i})=>(0,s.jsx)(v,{children:e.map(e=>(0,s.jsx)(_,{product:e,addToCart:t,toggleWishlist:n,wishlist:r,onOpenModal:i},e.id))}));export{y as default};