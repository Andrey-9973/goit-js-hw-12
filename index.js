import{a as f,S as g,i as l}from"./assets/vendor-Pp936Fs7.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&d(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();f.defaults.baseURL="https://pixabay.com/api/";const L="58355213-20d92452112ec05f5bea62a94";async function v(o,r){return(await f.get("",{params:{key:L,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}const p=document.querySelector(".gallery"),m=document.querySelector(".loader"),y=document.querySelector(".load-more"),w=new g(".gallery a",{captionsData:"alt",captionDelay:250});function b(o){const r=o.map(t=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${t.largeImageURL}">
            <img
              class="gallery-image"
              src="${t.webformatURL}"
              alt="${t.tags}"
            />
          </a>

          <div class="gallery-info">
            <div class="info-item">
              <p class="info-title">Likes</p>
              <p class="info-value">${t.likes}</p>
            </div>

            <div class="info-item">
              <p class="info-title">Views</p>
              <p class="info-value">${t.views}</p>
            </div>

            <div class="info-item">
              <p class="info-title">Comments</p>
              <p class="info-value">${t.comments}</p>
            </div>

            <div class="info-item">
              <p class="info-title">Downloads</p>
              <p class="info-value">${t.downloads}</p>
            </div>
          </div>
        </li>
      `).join("");p.insertAdjacentHTML("beforeend",r),w.refresh()}function S(){p.innerHTML=""}function q(){m.classList.remove("is-hidden")}function M(){m.classList.add("is-hidden")}function B(){y.classList.remove("is-hidden")}function $(){y.classList.add("is-hidden")}const i={createGallery:b,clearGallery:S,showLoader:q,hideLoader:M,showLoadMoreButton:B,hideLoadMoreButton:$},u=document.querySelector(".form"),P=document.querySelector(".load-more");let c="",a=1;async function h(o=!1){i.showLoader(),i.hideLoadMoreButton();try{const r=await v(c,a),t=r.hits;return t.length===0?(o||l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),!1):(i.createGallery(t),a*15<r.totalHits?i.showLoadMoreButton():(i.hideLoadMoreButton(),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),!0)}catch(r){return console.log(r),o&&a--,l.error({message:"Something went wrong. Please try again!",position:"topRight"}),!1}finally{i.hideLoader()}}function R(){const{height:o}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}u.addEventListener("submit",async o=>{o.preventDefault(),c=u.elements.input.value.trim(),a=1,c!==""&&(i.clearGallery(),await h())});P.addEventListener("click",async()=>{a++,await h(!0)&&R()});
//# sourceMappingURL=index.js.map
