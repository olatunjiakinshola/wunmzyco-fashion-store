import{a as e,c as t,n,o as r,s as i,t as a}from"./index-WArhPWB7.js";var o=e(`trash-2`,[[`path`,{d:`M10 11v6`,key:`nco0om`}],[`path`,{d:`M14 11v6`,key:`outv1u`}],[`path`,{d:`M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6`,key:`miytrc`}],[`path`,{d:`M3 6h18`,key:`d0wm0j`}],[`path`,{d:`M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2`,key:`e791ji`}]]),s=t(i(),1),c=a(),l=r.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
`,u=r.div`
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
`,d=r.div`
  padding: 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,f=r.button`
  background: none;
  border: none;
  cursor: pointer;
`,p=r.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`,m=r.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eee;
`,h=r.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
`,g=r.div`
  flex: 1;
`,_=r.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`,v=r.div`
  padding: 24px;
  border-top: 1px solid #eee;
  background: white;
`,y=(0,s.memo)(({isOpen:e,onClose:t,cart:r,removeFromCart:i,increaseQuantity:a,decreaseQuantity:s,totalPrice:y,onCheckout:b})=>e?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l,{onClick:t}),(0,c.jsxs)(u,{children:[(0,c.jsxs)(d,{children:[(0,c.jsxs)(`h2`,{children:[`Your Cart (`,r.length,`)`]}),(0,c.jsx)(f,{onClick:t,children:(0,c.jsx)(n,{size:28})})]}),(0,c.jsx)(p,{children:r.length===0?(0,c.jsx)(`p`,{style:{textAlign:`center`,marginTop:`80px`,color:`#888`},children:`Your cart is empty`}):r.map(e=>(0,c.jsxs)(m,{children:[(0,c.jsx)(h,{src:e.image,alt:e.name}),(0,c.jsxs)(g,{children:[(0,c.jsx)(`h4`,{children:e.name}),e.selectedSize&&(0,c.jsxs)(`p`,{children:[`Size: `,e.selectedSize]}),(0,c.jsxs)(`p`,{style:{fontWeight:`bold`,margin:`8px 0`},children:[`₦`,(e.price*e.quantity).toLocaleString()]}),(0,c.jsxs)(_,{children:[(0,c.jsx)(`button`,{onClick:()=>s(e.cartKey),style:{width:`32px`,height:`32px`},children:`-`}),(0,c.jsx)(`span`,{style:{minWidth:`30px`,textAlign:`center`},children:e.quantity}),(0,c.jsx)(`button`,{onClick:()=>a(e.cartKey),style:{width:`32px`,height:`32px`},children:`+`}),(0,c.jsx)(`button`,{onClick:()=>i(e.cartKey),style:{marginLeft:`auto`,color:`#ef4444`,background:`none`,border:`none`},children:(0,c.jsx)(o,{size:20})})]})]})]},e.cartKey))}),r.length>0&&(0,c.jsxs)(v,{children:[(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,fontSize:`1.3rem`,fontWeight:`700`,marginBottom:`20px`},children:[(0,c.jsx)(`span`,{children:`Total`}),(0,c.jsxs)(`span`,{children:[`₦`,y.toLocaleString()]})]}),(0,c.jsx)(`button`,{onClick:b,style:{width:`100%`,padding:`18px`,background:`black`,color:`white`,border:`none`,borderRadius:`12px`,fontSize:`1.1rem`,fontWeight:`600`,cursor:`pointer`},children:`Proceed to Checkout`})]})]})]}):null);export{y as default};