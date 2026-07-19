import{a as e,c as t,i as n,n as r,o as i,r as a,s as o,t as s}from"./index-WArhPWB7.js";var c=e(`zoom-in`,[[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}],[`line`,{x1:`21`,x2:`16.65`,y1:`21`,y2:`16.65`,key:`13gj7c`}],[`line`,{x1:`11`,x2:`11`,y1:`8`,y2:`14`,key:`1vmskp`}],[`line`,{x1:`8`,x2:`14`,y1:`11`,y2:`11`,key:`durymu`}]]),l=t(o(),1),u=s(),d=i.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
`,f=i.div`
  background: white;
  width: 100%;
  max-width: 900px;
  border-radius: 20px;
  max-height: 95vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`,p=i.div`
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
`,m=i.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
`,h=i.div`
  padding: 0 24px 32px;
`,g=i.div`
  width: 100%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  border-radius: 16px;
  margin-bottom: 24px;
  position: relative;
  cursor: pointer;
`,_=i.img`
  max-width: 100%;
  max-height: 420px;
  object-fit: contain;
  border-radius: 12px;
`,v=i.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  background: rgba(0,0,0,0.3);
  border-radius: 16px;

  ${g}:hover & {
    opacity: 1;
  }
`,y=i.div`
  background: white;
  color: black;
  padding: 8px 16px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
`,b=i.div``,x=i.h2`
  font-size: 1.85rem;
  font-weight: 700;
  margin-bottom: 8px;
`,S=i.p`
  font-size: 2.1rem;
  font-weight: 700;
  color: #000;
  margin: 12px 0 20px;
`,C=i.p`
  color: #555;
  line-height: 1.7;
  margin-bottom: 24px;
  font-size: 1.05rem;
`,w=i.div`
  margin: 24px 0;
`,T=i.p`
  font-weight: 600;
  margin-bottom: 12px;
`,E=i.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`,D=i.button`
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
`,O=i.button`
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
`,k=(0,l.memo)(({isOpen:e,onClose:t,product:i,addToCart:o,toggleWishlist:s,wishlist:k})=>{let[A,j]=(0,l.useState)(null),[M,N]=(0,l.useState)(!1);if(!e||!i)return null;let P=k.includes(i.id),F=()=>{o({...i,selectedSize:A||i.sizes&&i.sizes[0]||`M`},A)},I=()=>{N(!0)},L=()=>{N(!1)};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(d,{onClick:t,children:(0,u.jsxs)(f,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(p,{children:[(0,u.jsx)(`h3`,{children:`Product Details`}),(0,u.jsx)(m,{onClick:t,children:(0,u.jsx)(r,{size:28})})]}),(0,u.jsxs)(h,{children:[(0,u.jsxs)(g,{onClick:I,children:[(0,u.jsx)(_,{src:i.image,alt:i.name}),(0,u.jsx)(v,{children:(0,u.jsxs)(y,{children:[(0,u.jsx)(c,{size:20}),`View Full Image`]})})]}),(0,u.jsxs)(b,{children:[(0,u.jsx)(x,{children:i.name}),(0,u.jsx)(`p`,{style:{color:`#666`,marginBottom:`8px`},children:i.color}),(0,u.jsxs)(S,{children:[`₦`,i.price.toLocaleString()]}),i.description?(0,u.jsx)(C,{children:i.description}):(0,u.jsx)(C,{children:`No description available for this product.`}),i.sizes&&i.sizes.length>0&&(0,u.jsxs)(w,{children:[(0,u.jsx)(T,{children:`Select Size`}),(0,u.jsx)(E,{children:i.sizes.map(e=>(0,u.jsx)(D,{className:A===e?`selected`:``,onClick:()=>j(e),children:e},e))})]}),(0,u.jsxs)(O,{onClick:F,children:[(0,u.jsx)(a,{size:20}),`Add to Cart`]}),(0,u.jsxs)(`button`,{onClick:()=>s(i.id),style:{width:`100%`,padding:`14px`,marginTop:`12px`,background:`none`,border:`2px solid #ddd`,borderRadius:`12px`,cursor:`pointer`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`8px`,fontSize:`1rem`},children:[(0,u.jsx)(n,{size:20,fill:P?`#ef4444`:`none`,color:P?`#ef4444`:`#333`}),P?`Remove from Wishlist`:`Add to Wishlist`]})]})]})]})}),M&&(0,u.jsxs)(`div`,{style:{position:`fixed`,inset:0,background:`rgba(0,0,0,0.95)`,zIndex:300,display:`flex`,alignItems:`center`,justifyContent:`center`,padding:`20px`},onClick:L,children:[(0,u.jsx)(`img`,{src:i.image,alt:i.name,style:{maxWidth:`100%`,maxHeight:`100%`,objectFit:`contain`}}),(0,u.jsx)(`button`,{onClick:L,style:{position:`absolute`,top:`30px`,right:`30px`,background:`white`,border:`none`,padding:`12px`,borderRadius:`50%`,cursor:`pointer`},children:(0,u.jsx)(r,{size:28})})]})]})});export{k as default};