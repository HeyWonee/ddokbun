if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>c(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>d[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/T0LNt76PWpoY6HF_e7tqU/_buildManifest.js",revision:"75376ae0d7a8d64d1091e6375feb93eb"},{url:"/_next/static/T0LNt76PWpoY6HF_e7tqU/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1123-f1e4ca7636caf49a.js",revision:"f1e4ca7636caf49a"},{url:"/_next/static/chunks/1585.4b7c01ebec467968.js",revision:"4b7c01ebec467968"},{url:"/_next/static/chunks/2138-5e23b4efec692927.js",revision:"5e23b4efec692927"},{url:"/_next/static/chunks/2489-493fd8a52f68976f.js",revision:"493fd8a52f68976f"},{url:"/_next/static/chunks/2577-5a62dc114cef3d22.js",revision:"5a62dc114cef3d22"},{url:"/_next/static/chunks/2741.734764f66d43e501.js",revision:"734764f66d43e501"},{url:"/_next/static/chunks/3253-130b570825dae01f.js",revision:"130b570825dae01f"},{url:"/_next/static/chunks/3fff1979-bb37b24d4da1c9a4.js",revision:"bb37b24d4da1c9a4"},{url:"/_next/static/chunks/4544-0e9a735ab5f6b402.js",revision:"0e9a735ab5f6b402"},{url:"/_next/static/chunks/6517.e53744ba1ede2830.js",revision:"e53744ba1ede2830"},{url:"/_next/static/chunks/6530.389343858d5c2084.js",revision:"389343858d5c2084"},{url:"/_next/static/chunks/6859-7e65d17cd508ae1b.js",revision:"7e65d17cd508ae1b"},{url:"/_next/static/chunks/8023-32fa7e1e3e23c144.js",revision:"32fa7e1e3e23c144"},{url:"/_next/static/chunks/8589-d407ce90e6ff34d1.js",revision:"d407ce90e6ff34d1"},{url:"/_next/static/chunks/8811-4d3ecfe2f8c0180a.js",revision:"4d3ecfe2f8c0180a"},{url:"/_next/static/chunks/9086-8f9022132472dbe6.js",revision:"8f9022132472dbe6"},{url:"/_next/static/chunks/9376-4a290e32985485a8.js",revision:"4a290e32985485a8"},{url:"/_next/static/chunks/9651.f273097d59decf3d.js",revision:"f273097d59decf3d"},{url:"/_next/static/chunks/c16184b3-263df4c7a149b624.js",revision:"263df4c7a149b624"},{url:"/_next/static/chunks/fb7d5399-3fe2fdd15208259d.js",revision:"3fe2fdd15208259d"},{url:"/_next/static/chunks/framework-d51ece3d757c7ed2.js",revision:"d51ece3d757c7ed2"},{url:"/_next/static/chunks/main-7635c2bc71cd2946.js",revision:"7635c2bc71cd2946"},{url:"/_next/static/chunks/pages/404-53be0f953725cc76.js",revision:"53be0f953725cc76"},{url:"/_next/static/chunks/pages/_app-42712ec5943cb40e.js",revision:"42712ec5943cb40e"},{url:"/_next/static/chunks/pages/_error-da349fa2dbc03188.js",revision:"da349fa2dbc03188"},{url:"/_next/static/chunks/pages/admin-2d6ec95c5ae852be.js",revision:"2d6ec95c5ae852be"},{url:"/_next/static/chunks/pages/admin/commerce-6b7a6f55aeac6946.js",revision:"6b7a6f55aeac6946"},{url:"/_next/static/chunks/pages/admin/product-354ab84baef1f787.js",revision:"354ab84baef1f787"},{url:"/_next/static/chunks/pages/admin/product/register-bbc75b35688ba8d3.js",revision:"bbc75b35688ba8d3"},{url:"/_next/static/chunks/pages/admin/user-ad7cb30d653df838.js",revision:"ad7cb30d653df838"},{url:"/_next/static/chunks/pages/commerce-9effabd8fe0de377.js",revision:"9effabd8fe0de377"},{url:"/_next/static/chunks/pages/commerce/cart-64aa400d90de6aa8.js",revision:"64aa400d90de6aa8"},{url:"/_next/static/chunks/pages/commerce/list/%5Bparams%5D-601b766cbd814a6e.js",revision:"601b766cbd814a6e"},{url:"/_next/static/chunks/pages/commerce/order/cancled-1f5d32f5a1284500.js",revision:"1f5d32f5a1284500"},{url:"/_next/static/chunks/pages/commerce/order/complete-9a2c30108bd2a2c1.js",revision:"9a2c30108bd2a2c1"},{url:"/_next/static/chunks/pages/commerce/order/order-form-2d0937f1761c02a5.js",revision:"2d0937f1761c02a5"},{url:"/_next/static/chunks/pages/commerce/product/%5Bproductid%5D-c095562fc9c64194.js",revision:"c095562fc9c64194"},{url:"/_next/static/chunks/pages/commerce/product/pot-27797c817ae6c43f.js",revision:"27797c817ae6c43f"},{url:"/_next/static/chunks/pages/commerce/survey-35148f09f77cc845.js",revision:"35148f09f77cc845"},{url:"/_next/static/chunks/pages/index-5d1636bf8883c717.js",revision:"5d1636bf8883c717"},{url:"/_next/static/chunks/pages/login/google-a9e3c500ec1f1b66.js",revision:"a9e3c500ec1f1b66"},{url:"/_next/static/chunks/pages/login/kakao-b103c7312e387c23.js",revision:"b103c7312e387c23"},{url:"/_next/static/chunks/pages/manage/%5Buserseq%5D-b74a9e866455e17b.js",revision:"b74a9e866455e17b"},{url:"/_next/static/chunks/pages/manage/add-8e1a5572a6a1d534.js",revision:"8e1a5572a6a1d534"},{url:"/_next/static/chunks/pages/manage/add/search-9179e7fd686f6629.js",revision:"9179e7fd686f6629"},{url:"/_next/static/chunks/pages/manage/myplant/%5Bpotseq%5D-316a3d4b15a7037d.js",revision:"316a3d4b15a7037d"},{url:"/_next/static/chunks/pages/mypage/%5Buserseq%5D-a26324aeb21bea90.js",revision:"a26324aeb21bea90"},{url:"/_next/static/chunks/pages/offline-dcb482e5a4abf67b.js",revision:"dcb482e5a4abf67b"},{url:"/_next/static/chunks/pages/search-3011917cbf3467fc.js",revision:"3011917cbf3467fc"},{url:"/_next/static/chunks/pages/search/camera-32b98d4be7b7b308.js",revision:"32b98d4be7b7b308"},{url:"/_next/static/chunks/pages/temp-3c5e719de6bc6f6a.js",revision:"3c5e719de6bc6f6a"},{url:"/_next/static/chunks/pages/test-59cfc02d0b25fc29.js",revision:"59cfc02d0b25fc29"},{url:"/_next/static/chunks/pages/welcome-d96da598cc17cdfb.js",revision:"d96da598cc17cdfb"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-edf41f7978349214.js",revision:"edf41f7978349214"},{url:"/_next/static/css/32eb0c3831ca83d9.css",revision:"32eb0c3831ca83d9"},{url:"/_next/static/css/f1d5a30b5a4d1378.css",revision:"f1d5a30b5a4d1378"},{url:"/_next/static/css/f8aee2f66a30e49b.css",revision:"f8aee2f66a30e49b"},{url:"/_next/static/media/KOTRA_SONGEULSSI.4a55bbc0.ttf",revision:"4a55bbc0"},{url:"/_next/static/media/air-banner.027471a2.jpg",revision:"841bcceddb711af5c04692e3ae8a13ec"},{url:"/_next/static/media/banner-02.dc7c3c50.png",revision:"78fca2471b2a2af746b0ed950d766f61"},{url:"/_next/static/media/calander.bde8ef0c.png",revision:"91ed21e692edb0e38ef3792cd4895d7f"},{url:"/_next/static/media/googleLogin.81810f80.png",revision:"cf0304e47a43639a964b4c4fb559fd2f"},{url:"/_next/static/media/home-banner.9cde7496.jpg",revision:"8c7bb823d300f9c04f0db6ae05500367"},{url:"/_next/static/media/kakaoLogin.0e0e069d.png",revision:"b2df8abced56e0bbd49f7878a411e9c0"},{url:"/_next/static/media/light.e2bbb4ad.png",revision:"810770ba685da0c25de9eb9ebb1c82d1"},{url:"/_next/static/media/mainImg.63ffc221.jpg",revision:"c4dac5fccec3d69162c2798d903db90b"},{url:"/_next/static/media/main_banner.24f45c23.jpg",revision:"090613c5fe7d2634068be2a6e2df231d"},{url:"/_next/static/media/manage01.51adffa9.png",revision:"49d93f0ab1d755c7bc894fb3da140447"},{url:"/_next/static/media/pet-banner.f409132f.jpg",revision:"0b7c3511b449bbf32944af5c9295fc94"},{url:"/_next/static/media/plant1.70242e1d.jpg",revision:"05cc8d10cdad9eb7cfac2595c25f82c3"},{url:"/_next/static/media/pot.b708bcd0.jpg",revision:"de97de039b5315936e6423acc4c2fe96"},{url:"/_next/static/media/soilhumidity.b45f23fe.png",revision:"9cfe8d5b9fc89967b53301c8e1ef5811"},{url:"/_next/static/media/starter-banner.7431928f.jpg",revision:"20d314a251d2c25787024a5535dccc0f"},{url:"/_next/static/media/sun.4e6b6580.png",revision:"b09ad3828efa3033850fe095405d664f"},{url:"/_next/static/media/survey-banner.0b108b2c.jpg",revision:"8f81af6d52be95699e60b082a5dc65ea"},{url:"/_next/static/media/tempSmartPot02.c3b9d3f8.jpg",revision:"52fb162c9a66c5ce5d9b41b079186354"},{url:"/_next/static/media/thermometer.e0749f15.png",revision:"1e36bea472646ece5671d10587e411d4"},{url:"/_next/static/media/water.919afd67.png",revision:"e8f991092cee686d269d760ba2a2b8ed"},{url:"/_next/static/media/waterbottle.25e4f84f.png",revision:"ac3e76d2d1b091c6836e569618726972"},{url:"/_next/static/media/watering-can.42aba5d3.png",revision:"2301fa745a8b28f2164bf06d3c3b9f02"},{url:"/_next/static/media/김포평화B.a2badafc.ttf",revision:"a2badafc"},{url:"/background.hdr",revision:"7ff4d46b6876cf990c60865900dd9437"},{url:"/color.jpg",revision:"5f0cf4defd6f6a3ece641281f631a499"},{url:"/disp.png",revision:"6982709bfd213dd370329dac67f22598"},{url:"/favicon.ico",revision:"9f656ee89db90bea3c81fee0e6902da7"},{url:"/firebase-messaging-sw.js",revision:"27e117f287f638d143921caf4b9dd80e"},{url:"/icon.png",revision:"2a13a7a6acd7e37856c423254beebef8"},{url:"/icons/icon-128x128.png",revision:"096e74c01fe0f495d6bda7d2d7542183"},{url:"/icons/icon-144x144.png",revision:"821e9213687b679f1f24b1d0f8025ff7"},{url:"/icons/icon-152x152.png",revision:"29741634752b5c7cd053cd25fe6088c9"},{url:"/icons/icon-192x192.png",revision:"3034c3944deb8205427304f51430c8ed"},{url:"/icons/icon-384x384.png",revision:"0b16376d1cfd03727465eee7fdeb9f86"},{url:"/icons/icon-48x48.png",revision:"2a13a7a6acd7e37856c423254beebef8"},{url:"/icons/icon-512x512.png",revision:"0fc31447997f8807ba4f2f0fa9e9b259"},{url:"/icons/icon-72x72.png",revision:"8e013b6e7a57f5b4e28232397c6b82b6"},{url:"/icons/icon-96x96.png",revision:"c1f21b829b154ca1a554150c13c455cc"},{url:"/manifest.json",revision:"45d6bd97adb5325fe973bb0dee629b97"},{url:"/models/model.glb",revision:"f7713f61c07f7142c4f9db4acc7c4ee0"},{url:"/normal.jpg",revision:"0357fa3ffc406161ec16ee9ca666df73"},{url:"/roughness.jpg",revision:"08f946ffbaeb16cf92bb7b1725b897fb"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
