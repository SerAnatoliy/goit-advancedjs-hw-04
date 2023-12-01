import{a as S,i as u,S as q}from"./assets/vendor-f67ecabd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();const P="41007167-88dba9d0c39a2133a3a0b3dca",_="https://pixabay.com/api/",x=40,A=S.create({baseURL:_,params:{key:P,image_type:"photo",orientation:"horizontal",safesearch:!0}}),C=async(e,r=1,i=20)=>{const s=await A.get("",{params:{q:e,page:r,per_page:i}}),{hits:t,totalHits:o}=s.data;return{list:t,total:o}};u.settings({timeout:3e3,position:"center",maxWidth:"400px",titleSize:"16px",messageSize:"14px"});const b=e=>{u.warning({title:"Attention!",message:e})},$=e=>{u.error({title:"An error have ocrred!",message:e})},k=e=>{u.success({title:"Success!",message:e})},c={emptylist:e=>{b(e||"We could not found any images matching your search request")},endCollection:e=>{b(e||"That is all for now. You have reached the end of the result list")},fetchError:e=>{$(e||"Error have occured. Please try again later")},foundTotal:e=>{k(e||`We have found ${total} images`)}};function M(e,{initialPage:r,initialQuery:i,initialList:s,limit:t,loader:o,smoothScroll:n,loadMore:h}){let l=r||1,d=i||"",f=s||[],p=null;m();async function m(){if(d)try{o&&o.show(),h.hide();const a=await C(d,l,t);console.log("data",a),f.push(...a.list),p=a.total;const g=t*l>=p,y=a.list.length===0;y?c.emptylist():g?c.endCollection():l===1&&c.foundTotal(p),e(f),g||h.show(),n&&l!==1&&y&&n()}catch(a){console.log("error",a),c.fetchError()}finally{o&&o.hide()}}return{getPage(){return l},increasePage(){l+=1},resetPage(){l=1},setQuery(a){this.resetPage(),this.clearList(),d=a,m()},clearList(){f=[]}}}function T(e){return e.map(z).join("")}function z({largeImageURL:e,tags:r,likes:i,views:s,comments:t,downloads:o,webformatURL:n}){return`
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
</div>`}const B=document.querySelector(".search"),v=document.querySelector(".gallery"),w=document.querySelector(".load-more"),H=document.querySelector(".loader"),R=new q(".gallery",{showCounter:!1}),E=M(G,{limit:x,loader:L(H),smoothScroll:I,loadMore:L(w)});B.addEventListener("submit",e=>{e.preventDefault();const r=e.target.elements.searchQuery.value.trim();E.setQuery(r)});w.addEventListener("click",()=>{E.increasePage()});function G(e){const r=T(e);v.innerHTML="",v.insertAdjacentHTML("beforeend",r),R.refresh()}function I(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2.3,behavior:"smooth"})}function L(e){return{show(){e.classList.add("visible")},hide(){e.classList.remove("visible")}}}
//# sourceMappingURL=commonHelpers.js.map
