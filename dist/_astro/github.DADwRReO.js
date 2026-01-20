import{r as u}from"./index.CVf8TyFT.js";var p={exports:{}},i={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v=u,h=Symbol.for("react.element"),w=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,k=v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,b={key:!0,ref:!0,__self:!0,__source:!0};function l(t,e,s){var r,o={},n=null,a=null;s!==void 0&&(n=""+s),e.key!==void 0&&(n=""+e.key),e.ref!==void 0&&(a=e.ref);for(r in e)x.call(e,r)&&!b.hasOwnProperty(r)&&(o[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)o[r]===void 0&&(o[r]=e[r]);return{$$typeof:h,type:t,key:n,ref:a,props:o,_owner:k.current}}i.Fragment=w;i.jsx=l;i.jsxs=l;p.exports=i;var O=p.exports;/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var E={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),j=(t,e)=>{const s=u.forwardRef(({color:r="currentColor",size:o=24,strokeWidth:n=2,absoluteStrokeWidth:a,className:f="",children:c,...m},d)=>u.createElement("svg",{ref:d,...E,width:o,height:o,stroke:r,strokeWidth:a?Number(n)*24/Number(o):n,className:["lucide",`lucide-${R(t)}`,f].join(" "),...m},[...e.map(([_,y])=>u.createElement(_,y)),...Array.isArray(c)?c:[c]]));return s.displayName=`${t}`,s};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=j("Github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]);export{g as G,j as c,O as j};
