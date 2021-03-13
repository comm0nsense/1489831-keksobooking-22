(()=>{"use strict";const e=document.querySelector(".ad-form"),t=e.querySelector("#address"),o=e.querySelector(".ad-form-header"),r=e.querySelectorAll(".ad-form__element"),a=e.querySelector(".ad-form__reset");t.readOnly=!0;const l=new Map([["palace","Дворец"],["flat","Квартира"],["house","Дом"],["bungalow","Бунгало"]]),n=document.querySelector("#card").content.querySelector(".popup"),s="any",i={low:{MIN:0,MAX:1e4},middle:{MIN:1e4,MAX:5e4},high:{MIN:5e4,MAX:999999}},c=document.querySelector(".map__filters"),d=c.querySelectorAll(".map__filter"),u=c.querySelector(".map__features"),p=c.querySelector("#housing-type"),y=c.querySelector("#housing-price"),m=c.querySelector("#housing-rooms"),f=c.querySelector("#housing-guests"),g={X:35.6804,Y:139.759},v={X:g.X.toFixed(5),Y:g.Y.toFixed(5)},h=L.map("map-canvas"),S=L.icon({iconUrl:"img/main-pin.svg",iconSize:[52,52],iconAnchor:[26,52]}),q=()=>(h.on("load",(()=>{e.classList.remove("ad-form--disabled"),o.disabled=!1,r.forEach((e=>e.disabled=!1)),t.value=`${v.X}, ${v.Y}`})).setView({lat:v.X,lng:v.Y},10),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(h),h),E=L.marker({lat:v.X,lng:v.Y},{draggable:!0,icon:S}).addTo(h);E.on("move",(e=>{const o=e.target.getLatLng().lat.toFixed(5),r=e.target.getLatLng().lng.toFixed(5);t.value=`${o}, ${r}`}));const b=L.icon({iconUrl:"img/pin.svg",iconSize:[52,52],iconAnchor:[26,52]}),x=[],w=e=>{e.forEach((e=>{(e=>{const t=L.marker({lat:e.location.lat,lng:e.location.lng},{icon:b});t.addTo(h).bindPopup((e=>{const t=n.cloneNode(!0);t.querySelector(".popup__title").textContent=e.offer.title,t.querySelector(".popup__text--address").textContent=e.offer.address,t.querySelector(".popup__text--price").textContent=`${e.offer.price} ₽/ночь`,t.querySelector(".popup__type").textContent=l.get(e.offer.type),t.querySelector(".popup__text--capacity").textContent=`${e.offer.rooms} комнаты для ${e.offer.guests} гостей`,t.querySelector(".popup__text--time").textContent=`Заезд после ${e.offer.checkin}, выезд до ${e.offer.checkout}`;const o=t.querySelector(".popup__features");o.innerHTML="";const r=e.offer.features;0===r.length&&o.remove(),r.forEach((e=>{const t=document.createElement("li");t.classList.add("popup__feature"),t.classList.add(`popup__feature--${e}`),o.appendChild(t)})),t.querySelector(".popup__description").textContent=e.offer.description;const a=t.querySelector(".popup__photos"),s=a.querySelector(".popup__photo"),i=e.offer.photos;return s.remove(),0===i.length&&a.remove(),i.forEach((e=>{const t=s.cloneNode(!1);t.src=e,a.appendChild(t)})),t.querySelector(".popup__avatar").src=e.author.avatar,t})(e),{keepInView:!0}),x.push(t)})(e)}))};let C=[];const k=e=>{C=e.slice(0,10),w(C),(e=>{let t=p.value,o=y.value,r=m.value,a=f.value,l=[];const n=e=>t===s||e.offer.type===t,d=e=>r===s||e.offer.rooms===+r,g=e=>a===s||e.offer.guests===+a,v=e=>o===s||i[o].MIN<=e.offer.price&&i[o].MAX>=e.offer.price,h=e=>{for(let t=0;t<=l.length-1;t++)if(!e.offer.features.includes(l[t]))return!1;return!0};c.addEventListener("change",_.debounce((s=>{s.target.id===p.id?t=s.target.value:s.target.id===y.id?o=s.target.value:s.target.id===m.id?r=s.target.value:s.target.id===f.id?a=s.target.value:s.target.id==="filter-"+s.target.value&&(l=Array.from(u.querySelectorAll("input:checked")).map((e=>e.value)));const i=e.filter(n).filter(d).filter(g).filter(v).filter(h).slice(0,10);x.forEach((e=>{e.remove()})),w(i)}),500))})(e)},V={palace:1e4,flat:1e3,house:5e3,bungalow:0},$="100",A=e.querySelector("#title"),X=e.querySelector("#room_number"),M=e.querySelector("#capacity"),Y=e.querySelector("#price"),j=e.querySelector("#type"),I=e.querySelector("#timein"),N=e.querySelector("#timeout"),z=(e,t)=>{e===$&&"0"!==t?M.setCustomValidity("Не для гостей"):"0"===t&&e!==$?M.setCustomValidity("100 комнат"):e<t?M.setCustomValidity(`Гостей (${t}) больше чем свободных комнат (${e})`):M.setCustomValidity(""),M.reportValidity()},F=M.querySelectorAll("option"),T=X.querySelectorAll("option"),D=e=>{let t=0;return e.forEach((e=>{e.selected&&(t=e.value)})),t},O=["Escape","Esc"],R=document.querySelector("main"),U=document.querySelector("#success").content.querySelector(".success"),P=document.querySelector("#error").content.querySelector(".error"),W=U.cloneNode(!0);W.style.zIndex="1000";const H=P.cloneNode(!0);H.style.zIndex="1000";const B=e=>{const t=e=>{e.key===(O[0]||O[1])&&o()},o=()=>{e.remove(),e.removeEventListener("click",o),document.removeEventListener("keydown",t)};R.append(e),e.addEventListener("click",o),document.addEventListener("keydown",t)},G=["gif","jpg","jpeg","png"],J=document.querySelector(".ad-form__field input[type=file]"),K=document.querySelector(".ad-form-header__preview img"),Q=document.querySelector(".ad-form__upload input[type=file]"),Z=document.querySelector(".ad-form__photo"),ee=document.createElement("img");ee.style.display="flex",ee.style.maxWidth="100%",ee.style.height="auto",Z.append(ee);const te=(e,t,o)=>{e.addEventListener("change",(r=>{const a=r.target.files[0],l=a.name.toLowerCase(),n=o.some((e=>l.endsWith(e)));if(n){e.setCustomValidity("");const o=new FileReader;o.addEventListener("load",(()=>{t.src=o.result})),o.readAsDataURL(a)}else n||e.setCustomValidity("Можно загружать изображения в следующих форматах: *.gif, *.jpg, *.jpeg, *.png");e.reportValidity()}))},oe=()=>{q().setView({lat:v.X,lng:v.Y},10),e.reset(),t.value=`${v.X}, ${v.Y}`,c.reset(),E.setLatLng([v.X,v.Y]),(()=>{const e=j.value,t=V[e];Y.placeholder=`${t}`})(),w(C),K.src="img/muffin-grey.svg",ee.removeAttribute("src")};a.addEventListener("click",(e=>{e.preventDefault(),oe()})),e.classList.add("ad-form--disabled"),o.disabled=!0,r.forEach((e=>e.disabled=!0)),c.classList.add("map__filters--disabled"),d.forEach((e=>e.disabled=!0)),u.disabled=!0,q(),A.addEventListener("input",(()=>{const e=A.value.length;e<30?A.setCustomValidity("Заголовок должен состоять минимум из 30 символов"):e>=100?A.setCustomValidity("Заголовок не должен превышать 100 символов"):A.setCustomValidity(""),A.reportValidity()})),Y.addEventListener("input",(()=>{const e=Y.value;e<V[j.value]?Y.setCustomValidity(`Стоимость не должна быть ниже ${V[j.value]}`):e>1e6?Y.setCustomValidity("Стоиомость не должна превышать 1000000"):Y.setCustomValidity(""),Y.reportValidity()})),M.addEventListener("input",(e=>{const t=e.target.value,o=D(T);z(o,t)})),X.addEventListener("input",(e=>{const t=e.target.value,o=D(F);z(t,o)})),e.addEventListener("input",(()=>{Y.placeholder=V[j.value],Y.min=V[j.value]})),e.addEventListener("input",(e=>{const t=e.target.value;switch(e.target){case I:N.value=t;break;case N:I.value=t}})),(async e=>{const t=await fetch("https://22.javascript.pages.academy/keksobooking/data");if(t.ok)return await t.json();throw new Error("Не удается зарузить данные. Перезагрузите страницу.")})().then((e=>{c.classList.remove("map__filters--disabled"),d.forEach((e=>e.disabled=!1)),u.disabled=!1,k(e)})).catch((e=>(e=>{const t=document.createElement("div");t.style.zIndex=100,t.style.position="absolute",t.style.left=0,t.style.top=0,t.style.right=0,t.style.padding="10px 3px",t.style.fontSize="30px",t.style.textAlign="center",t.style.backgroundColor="red",t.textContent=e,document.body.append(t),setTimeout((()=>{t.remove()}),5e3)})(e.message))),e.addEventListener("submit",(e=>{e.preventDefault(),(async(e,t)=>{if(!(await fetch("https://22.javascript.pages.academy/keksobooking",{method:"POST",body:t})).ok)throw new Error("Rejected: Не удалось отправить данные")})(0,new FormData(e.target)).then((()=>{B(W),oe()})).catch((()=>{B(H)}))})),te(J,K,G),te(Q,ee,G)})();
//# sourceMappingURL=main.bundle.js.map