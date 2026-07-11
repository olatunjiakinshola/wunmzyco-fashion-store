import{t as e}from"./heart-Bf7xtI5G.js";import{a as t,o as n,r,s as i,t as a}from"./index-BtwhFf3n.js";var o=i(n(),1),s=a(),c=t.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 35px rgba(0,0,0,0.12);
  }
`,l=t.div`
  position: relative;
  height: 320px;
  overflow: hidden;
  cursor: pointer;
  @media (max-width: 480px) {
    height: 280px;
  }
`,u=t.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  ${c}:hover & {
    transform: scale(1.1);
  }
`,d=t.button`
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
`,f=t.div`
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
`,p=t.button`
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
`,m=t.div`
  padding: 20px;
`,h=t.h3`
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 4px;
`,g=t.p`
  font-size: 1.4rem;
  font-weight: 700;
`,_=(0,o.memo)(({product:t,addToCart:n,toggleWishlist:i,wishlist:a,onOpenModal:o})=>(0,s.jsxs)(c,{children:[(0,s.jsxs)(l,{onClick:e=>{e.stopPropagation(),o(t)},children:[(0,s.jsx)(u,{src:t.image,alt:t.name}),(0,s.jsx)(d,{onClick:e=>{e.stopPropagation(),i(t.id)},children:(0,s.jsx)(e,{size:20,fill:a.includes(t.id)?`#ef4444`:`none`,color:a.includes(t.id)?`#ef4444`:`#333`})}),(0,s.jsx)(f,{children:(0,s.jsxs)(p,{onClick:e=>{e.stopPropagation(),n(t)},children:[(0,s.jsx)(r,{size:18}),`Add to Cart`]})})]}),(0,s.jsxs)(m,{children:[(0,s.jsx)(h,{children:t.name}),(0,s.jsx)(`p`,{style:{color:`#666`,marginBottom:`8px`},children:t.color}),(0,s.jsxs)(g,{children:[`₦`,t.price.toLocaleString()]})]})]})),v=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
`,y=(0,o.memo)(({products:e,addToCart:t,toggleWishlist:n,wishlist:r,onOpenModal:i})=>(0,s.jsx)(v,{children:e.map(e=>(0,s.jsx)(_,{product:e,addToCart:t,toggleWishlist:n,wishlist:r,onOpenModal:i},e.id))}));export{y as default};