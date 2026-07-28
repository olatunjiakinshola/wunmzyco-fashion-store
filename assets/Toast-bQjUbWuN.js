import{a as e,c as t,l as n,n as r,o as i,s as a,t as o}from"./index-BWzmPpH0.js";var s=e(`circle-check-big`,[[`path`,{d:`M21.801 10A10 10 0 1 1 17 3.335`,key:`yps3ct`}],[`path`,{d:`m9 11 3 3L22 4`,key:`1pflzl`}]]),c=n(t(),1),l=o(),u=i`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`,d=i`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`,f=a.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,p=a.div`
  background: #111;
  color: white;
  padding: 14px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 280px;
  max-width: 360px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  animation: ${e=>e.$closing?d:u} 0.3s ease forwards;
`,m=a.span`
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
`,h=a.button`
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  display: flex;
  padding: 4px;

  &:hover {
    color: white;
  }
`,g=(0,c.memo)(({toasts:e,removeToast:t})=>(0,l.jsx)(f,{children:e.map(e=>(0,l.jsxs)(p,{$closing:e.closing,children:[(0,l.jsx)(s,{size:20,color:`#4ade80`}),(0,l.jsx)(m,{children:e.message}),(0,l.jsx)(h,{onClick:()=>t(e.id),children:(0,l.jsx)(r,{size:18})})]},e.id))}));export{g as default};