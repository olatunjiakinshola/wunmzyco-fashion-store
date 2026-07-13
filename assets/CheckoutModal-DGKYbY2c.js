import{a as e,c as t,n,o as r,s as i,t as a}from"./index-gG7mlA69.js";var o=e(`message-circle`,[[`path`,{d:`M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719`,key:`1sd12s`}]]),s=t(i(),1),c=a(),l=r.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`,u=r.div`
  background: white;
  width: 100%;
  max-width: 480px;
  border-radius: 20px;
  padding: 32px;
  max-height: 90vh;
  overflow-y: auto;
`,d=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px
`,f=r.button`
  width: 100%;
  background: #25D366;
  color: white;
  border: none;
  padding: 18px 24px;
  font-size: 1.15rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
  &:hover {
    background: #20ba5c;
  }
`,p=r.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin: 20px 0;
`,m=(0,s.memo)(({isOpen:e,onClose:t,totalPrice:r,cart:i})=>{if(!e)return null;let a=()=>{let e=`*New Order from WunmzyCo Website*

`;return i.forEach((t,n)=>{let r=t.selectedSize?` (Size: ${t.selectedSize})`:``;e+=`${n+1}. ${t.name}${r} - *₦${t.price.toLocaleString()}*\n`}),e+=`\n*Total Amount: ₦${r.toLocaleString()}*\n\n`,e+=`Please confirm my order. Thank you! 🙏`,encodeURIComponent(e)};return(0,c.jsx)(l,{children:(0,c.jsxs)(u,{children:[(0,c.jsxs)(d,{children:[(0,c.jsx)(`h2`,{style:{fontSize:`1.8rem`,fontWeight:`700`},children:`Complete Your Order`}),(0,c.jsx)(`button`,{onClick:t,children:(0,c.jsx)(n,{size:28})})]}),(0,c.jsx)(`p`,{style:{color:`#555`,marginBottom:`20px`},children:`Send your order details directly to the seller via WhatsApp`}),(0,c.jsxs)(p,{children:[(0,c.jsxs)(`h4`,{style:{marginBottom:`16px`},children:[`Order Summary (`,i.length,` items)`]}),i.map((e,t)=>(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,padding:`10px 0`,borderBottom:t===i.length-1?`none`:`1px solid #ddd`},children:[(0,c.jsxs)(`span`,{children:[e.name,e.selectedSize&&(0,c.jsxs)(`span`,{style:{color:`#666`},children:[` (Size: `,e.selectedSize,`)`]})]}),(0,c.jsxs)(`span`,{style:{fontWeight:`600`},children:[`₦`,e.price.toLocaleString()]})]},t)),(0,c.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,marginTop:`20px`,fontSize:`1.4rem`,fontWeight:`700`},children:[(0,c.jsx)(`span`,{children:`Total`}),(0,c.jsxs)(`span`,{children:[`₦`,r.toLocaleString()]})]})]}),(0,c.jsxs)(f,{onClick:()=>{let e=`https://wa.me/+2348060230990?text=${a()}`;window.open(e,`_blank`),t()},children:[(0,c.jsx)(o,{size:24}),`Send Order via WhatsApp`]}),(0,c.jsx)(`p`,{style:{textAlign:`center`,marginTop:`20px`,fontSize:`0.9rem`,color:`#666`},children:`You will be redirected to WhatsApp to chat with the seller`})]})})});export{m as default};