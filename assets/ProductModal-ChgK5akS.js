import{t as e}from"./heart-Bf7xtI5G.js";import{a as t,n,o as r,r as i,s as a,t as o}from"./index-BtwhFf3n.js";var s=a(r(),1),c=o(),l=t.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
`,u=t.div`
  background: white;
  width: 100%;
  max-width: 900px;
  border-radius: 20px;
  overflow: hidden;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
`,d=t.div`
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,f=t.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
`,p=t.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`,m=t.div`
  flex: 1;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  min-height: 400px;
`,h=t.img`
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  cursor: zoom-in;
`,g=t.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`,_=t.h2`
  font-size: 1.85rem;
  font-weight: 700;
  margin-bottom: 8px;
`,v=t.p`
  font-size: 2.1rem;
  font-weight: 700;
  color: #000;
  margin: 16px 0;
`,y=t.p`
  color: #555;
  line-height: 1.7;
  margin-bottom: 24px;
  font-size: 1.05rem;
`,b=t.div`
  margin: 24px 0;
`,x=t.p`
  font-weight: 600;
  margin-bottom: 12px;
`,S=t.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`,C=t.button`
  padding: 10px 18px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border-color: #000;
  }
  &.selected {
    border-color: #000;
    background: #000;
    color: white;
  }
`,w=t.button`
  width: 100%;
  background: black;
  color: white;
  border: none;
  padding: 18px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
  &:hover {
    background: #222;
  }
`,T=(0,s.memo)(({isOpen:t,onClose:r,product:a,addToCart:o,toggleWishlist:T,wishlist:E})=>{let[D,O]=(0,s.useState)(null);if(!t||!a)return null;let k=E.includes(a.id);return(0,c.jsx)(l,{onClick:r,children:(0,c.jsxs)(u,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(d,{children:[(0,c.jsx)(`h3`,{children:`Product Details`}),(0,c.jsx)(f,{onClick:r,children:(0,c.jsx)(n,{size:28})})]}),(0,c.jsxs)(p,{children:[(0,c.jsx)(m,{children:(0,c.jsx)(h,{src:a.image,alt:a.name,onClick:()=>{window.open().document.write(`<img src="${a.image}" style="width:100%;height:auto;" />`)}})}),(0,c.jsxs)(g,{children:[(0,c.jsx)(_,{children:a.name}),(0,c.jsx)(`p`,{style:{color:`#666`,marginBottom:`8px`},children:a.color}),(0,c.jsxs)(v,{children:[`₦`,a.price.toLocaleString()]}),a.description?(0,c.jsx)(y,{children:a.description}):(0,c.jsx)(y,{children:`No description available for this product.`}),a.sizes&&a.sizes.length>0&&(0,c.jsxs)(b,{children:[(0,c.jsx)(x,{children:`Select Size`}),(0,c.jsx)(S,{children:a.sizes.map(e=>(0,c.jsx)(C,{className:D===e?`selected`:``,onClick:()=>O(e),children:e},e))})]}),(0,c.jsxs)(w,{onClick:()=>{o({...a,selectedSize:D||a.sizes&&a.sizes[0]||`M`})},children:[(0,c.jsx)(i,{size:20}),`Add to Cart`]}),(0,c.jsxs)(`button`,{onClick:()=>T(a.id),style:{width:`100%`,padding:`14px`,marginTop:`12px`,background:`none`,border:`2px solid #ddd`,borderRadius:`12px`,cursor:`pointer`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`8px`,fontSize:`1rem`},children:[(0,c.jsx)(e,{size:20,fill:k?`#ef4444`:`none`,color:k?`#ef4444`:`#333`}),k?`Remove from Wishlist`:`Add to Wishlist`]})]})]})]})})});export{T as default};