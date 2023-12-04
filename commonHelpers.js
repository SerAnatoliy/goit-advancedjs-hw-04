import{a as E,i as u,S as P}from"./assets/vendor-aa7a424a.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();const q="40477492-fb7a942987769cd06fc4fed72",_="https://pixabay.com/api/",k=40,x=E.create({baseURL:_,params:{key:q,image_type:"photo",orientation:"horizontal",safesearch:!0}}),C=async(e,r=1,i=20)=>{const s=await x.get("",{params:{q:e,page:r,per_page:i}}),{hits:t,totalHits:o}=s.data;return{list:t,total:o}};u.settings({timeout:4e3,position:"topRight",maxWidth:"400px",titleSize:"16px",messageSize:"16px"});const b=e=>{u.warning({title:"Attention!",message:e})},$=e=>{u.error({title:"Error!",message:e})},A=e=>{u.success({title:"Success!",message:e})},c={emptyList:e=>{b(e||"We have not found any images matching your request. Please try again.")},endCollection:e=>{b(e||"That is all for now. Would you like to search more?")},fetchError:e=>{$(e||"Sorry. Something went wrong.")},foundTotal:e=>{A(`Hooray! We found ${e} images.`)}};function H(e,{initialPage:r,initialQuery:i,initialList:s,limit:t,loader:o,smoothScroll:n,loadMore:m}){let a=r||1,d=i||"",f=s||[],p=null;async function h(){if(d)try{o&&o.show(),m.hide();const l=await C(d,a,t);f.push(...l.list),p=l.total;const g=t*a>=p,y=l.list.length===0;y?c.emptyList():g?c.endCollection():a===1&&c.foundTotal(p),e(f),g||m.show(),n&&a!==1&&!y&&n()}catch(l){console.log("err",l),c.fetchError()}finally{o&&o.hide()}}return{getPage(){return a},increasePage(){a+=1,h()},resetPage(){a=1},setQuery(l){this.resetPage(),this.clearList(),d=l,h()},clearList(){f=[]}}}function M(e){return e.map(R).join("")}function R({largeImageURL:e,tags:r,likes:i,views:s,comments:t,downloads:o,webformatURL:n}){return`
          <div class="photo-card">
            <a class="photo-card__link" href="${e}">
                <img class="photo-card__img" src="${n}" alt="${r}" loading="lazy" />
            </a>    
            <div class="info">
                <p class="info-item">
                    <b>Likes</b><span>${i}</span>
                </p>
                <p class="info-item">
                    <b>Views</b><span>${s}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b><span>${t}</span>
                </p>
                <p class="info-item">
                    <b>Downloads</b><span>${o}</span>
                </p>
            </div>
        </div>`}const T=document.querySelector(".search"),L=document.querySelector(".gallery"),v=document.querySelector(".load-more"),z=document.querySelector(".loader"),B=new P(".gallery a",{showCounter:!1}),S=H(G,{limit:k,loader:w(z),smoothScroll:I,loadMore:w(v)});T.addEventListener("submit",e=>{e.preventDefault();const r=e.target.elements.searchQuery.value.trim();S.setQuery(r)});v.addEventListener("click",()=>{S.increasePage()});function G(e){const r=M(e);L.innerHTML="",L.insertAdjacentHTML("beforeend",r),B.refresh()}function I(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2.3,behavior:"smooth"})}function w(e){return{show(){e.classList.add("visible")},hide(){e.classList.remove("visible")}}}
//# sourceMappingURL=commonHelpers.js.map
