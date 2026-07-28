import{a as e,c as t,i as n,l as r,n as i,r as a,s as o,t as s}from"./index-BWzmPpH0.js";var c=e(`minus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}]]),l=e(`plus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]),u=e(`zoom-in`,[[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}],[`line`,{x1:`21`,x2:`16.65`,y1:`21`,y2:`16.65`,key:`13gj7c`}],[`line`,{x1:`11`,x2:`11`,y1:`8`,y2:`14`,key:`1vmskp`}],[`line`,{x1:`8`,x2:`14`,y1:`11`,y2:`11`,key:`durymu`}]]),d=r(t(),1),f=s(),p=o.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
`,m=o.div`
  background: white;
  width: 100%;
  max-width: 900px;
  border-radius: 20px;
  max-height: 95vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`,h=o.div`
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
`,g=o.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
`,_=o.div`
  padding: 0 24px 32px;
`,v=o.div`
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
`,y=o.img`
  max-width: 100%;
  max-height: 420px;
  object-fit: contain;
  border-radius: 12px;
`,b=o.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  background: rgba(0,0,0,0.3);
  border-radius: 16px;

  ${v}:hover & {
    opacity: 1;
  }
`,x=o.div`
  background: white;
  color: black;
  padding: 8px 16px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
`,S=o.div``,C=o.h2`
  font-size: 1.85rem;
  font-weight: 700;
  margin-bottom: 8px;
`,w=o.p`
  font-size: 2.1rem;
  font-weight: 700;
  color: #000;
  margin: 12px 0 20px;
`,T=o.p`
  color: #555;
  line-height: 1.7;
  margin-bottom: 24px;
  font-size: 1.05rem;
`,E=o.div`
  margin: 24px 0;
`,D=o.p`
  font-weight: 600;
  margin-bottom: 12px;
`,O=o.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`,k=o.button`
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
`,A=o.div`
  margin: 24px 0;
`,j=o.p`
  font-weight: 600;
  margin-bottom: 12px;
`,M=o.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,N=o.button`
  width: 40px;
  height: 40px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #000;
    background: #f5f5f5;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,P=o.span`
  font-size: 1.2rem;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
`,F=o.button`
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
`,I=(0,d.memo)(({isOpen:e,onClose:t,product:r,addToCart:o,toggleWishlist:s,wishlist:I})=>{let[L,R]=(0,d.useState)(null),[z,B]=(0,d.useState)(1),[V,H]=(0,d.useState)(!1);if((0,d.useEffect)(()=>{e&&r&&(R(null),B(1))},[e,r]),!e||!r)return null;let U=I.includes(r.id);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(p,{onClick:t,children:(0,f.jsxs)(m,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(h,{children:[(0,f.jsx)(`h3`,{children:`Product Details`}),(0,f.jsx)(g,{onClick:t,children:(0,f.jsx)(i,{size:28})})]}),(0,f.jsxs)(_,{children:[(0,f.jsxs)(v,{onClick:()=>H(!0),children:[(0,f.jsx)(y,{src:r.image,alt:r.name}),(0,f.jsx)(b,{children:(0,f.jsxs)(x,{children:[(0,f.jsx)(u,{size:20}),`View Full Image`]})})]}),(0,f.jsxs)(S,{children:[(0,f.jsx)(C,{children:r.name}),(0,f.jsx)(`p`,{style:{color:`#666`,marginBottom:`8px`},children:r.color}),(0,f.jsxs)(w,{children:[`₦`,r.price.toLocaleString()]}),r.description?(0,f.jsx)(T,{children:r.description}):(0,f.jsx)(T,{children:`No description available for this product.`}),r.sizes&&r.sizes.length>0&&(0,f.jsxs)(E,{children:[(0,f.jsx)(D,{children:`Select Size`}),(0,f.jsx)(O,{children:r.sizes.map(e=>(0,f.jsx)(k,{className:L===e?`selected`:``,onClick:()=>R(e),children:e},e))})]}),(0,f.jsxs)(A,{children:[(0,f.jsx)(j,{children:`Quantity`}),(0,f.jsxs)(M,{children:[(0,f.jsx)(N,{onClick:()=>{B(e=>Math.max(e-1,1))},disabled:z<=1,children:(0,f.jsx)(c,{size:18})}),(0,f.jsx)(P,{children:z}),(0,f.jsx)(N,{onClick:()=>{B(e=>Math.min(e+1,10))},disabled:z>=10,children:(0,f.jsx)(l,{size:18})})]})]}),(0,f.jsxs)(F,{onClick:()=>{let e=L||r.sizes&&r.sizes[0]||`M`;for(let t=0;t<z;t++)o(r,e)},children:[(0,f.jsx)(a,{size:20}),`Add to Cart `,z>1?`(${z})`:``]}),(0,f.jsxs)(`button`,{onClick:()=>s(r.id),style:{width:`100%`,padding:`14px`,marginTop:`12px`,background:`none`,border:`2px solid #ddd`,borderRadius:`12px`,cursor:`pointer`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`8px`,fontSize:`1rem`},children:[(0,f.jsx)(n,{size:20,fill:U?`#ef4444`:`none`,color:U?`#ef4444`:`#333`}),U?`Remove from Wishlist`:`Add to Wishlist`]})]})]})]})}),V&&(0,f.jsxs)(`div`,{style:{position:`fixed`,inset:0,background:`rgba(0,0,0,0.95)`,zIndex:300,display:`flex`,alignItems:`center`,justifyContent:`center`,padding:`20px`},onClick:()=>H(!1),children:[(0,f.jsx)(`img`,{src:r.image,alt:r.name,style:{maxWidth:`100%`,maxHeight:`100%`,objectFit:`contain`}}),(0,f.jsx)(`button`,{onClick:()=>H(!1),style:{position:`absolute`,top:`30px`,right:`30px`,background:`white`,border:`none`,padding:`12px`,borderRadius:`50%`,cursor:`pointer`},children:(0,f.jsx)(i,{size:28})})]})]})});export{I as default};