import{c as e,n as t,o as n,s as r,t as i}from"./index-2ZIWPLld.js";var a=e(r(),1),o=i(),s=n.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
`,c=n.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 420px;
  height: 100vh;
  background: white;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
  z-index: 101;
  display: flex;
  flex-direction: column;
`,l=n.div`
  padding: 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,u=n.button`
  background: none;
  border: none;
  cursor: pointer;
`,d=n.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`,f=n.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eee;
`,p=n.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
`,m=(0,a.memo)(({isOpen:e,onClose:n,wishlistItems:r,addToCart:i,toggleWishlist:a,removeFromWishlist:m})=>e?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s,{onClick:n}),(0,o.jsxs)(c,{children:[(0,o.jsxs)(l,{children:[(0,o.jsxs)(`h2`,{children:[`My Wishlist (`,r.length,`)`]}),(0,o.jsx)(u,{onClick:n,children:(0,o.jsx)(t,{size:28})})]}),(0,o.jsx)(d,{children:r.length===0?(0,o.jsx)(`p`,{style:{textAlign:`center`,marginTop:`80px`,color:`#888`},children:`Your wishlist is empty`}):r.map(e=>(0,o.jsxs)(f,{children:[(0,o.jsx)(p,{src:e.image,alt:e.name}),(0,o.jsxs)(`div`,{style:{flex:1},children:[(0,o.jsx)(`h4`,{children:e.name}),(0,o.jsx)(`p`,{style:{color:`#666`,margin:`4px 0`},children:e.color}),(0,o.jsxs)(`p`,{style:{fontWeight:`bold`},children:[`₦`,e.price.toLocaleString()]}),(0,o.jsxs)(`div`,{style:{marginTop:`12px`,display:`flex`,gap:`12px`},children:[(0,o.jsx)(`button`,{onClick:()=>i(e),style:{background:`black`,color:`white`,padding:`8px 16px`,borderRadius:`8px`,border:`none`,cursor:`pointer`},children:`Add to Cart`}),(0,o.jsx)(`button`,{onClick:()=>a(e.id),style:{color:`#ef4444`,border:`none`,background:`none`,cursor:`pointer`},children:`Remove`})]})]})]},e.id))})]})]}):null);export{m as default};